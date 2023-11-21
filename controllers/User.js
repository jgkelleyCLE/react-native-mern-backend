import User from '../models/UserModel.js'
import { generateToken } from '../middleware/generateToken.js'
import bcrypt from 'bcrypt'


//REGISTER USER
export const registerUser = async(req, res) => {

    const { name, email, password } = req.body;

    //check if user exists
    const userExists = await User.findOne({ email })

    if(userExists){
        return res.status(400).json({ message: "A user with that email already exists" })
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    try {

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        })

        if(user){
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id)
            })
        }else {
            res.status(400).json({ message: "User could not be registered at this time" })
        }
        
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}

//LOGIN USER
export const loginUser = async(req, res) => {

    const { email, password } = req.body;

    try {
        
        //check if user exists
        const user = await User.findOne({ email })

        if(!user){
            return res.status(404).json({ message: "User not found" })
        }

        if(user && (await bcrypt.compare(password, user.password))){
            res.status(200).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id)
            })
        }else {
            res.status(400).json({ message: "Invalid username or password" })
        }


    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}


//GET USER
export const getUser = async(req, res) => {
    const id = req.params.id

    try {
        
        const user = await User.findById(id)
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt,
            token: user.token
        })
        // res.status(200).json(user)

    } catch (error) {
        res.status(400).json({ message: error.message })
    }

}