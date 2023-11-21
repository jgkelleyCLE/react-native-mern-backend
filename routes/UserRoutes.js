import express from 'express'
import { getUser, loginUser, registerUser } from '../controllers/User.js'

const router = express.Router()


//REGISTER
router.post('/', registerUser)

//LOGIN
router.post('/login', loginUser)

//GET USER
router.get('/:id', getUser)

export default router