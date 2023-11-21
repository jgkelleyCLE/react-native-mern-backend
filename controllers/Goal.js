import Goal from '../models/GoalModel.js'

//GET GOALS
export const getGoals = async(req, res) => {
    try {
        
        const goals = await Goal.find({ userId: req.user.id })
        res.status(200).json(goals)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

//POST GOAL
export const createGoal = async(req, res) => {

    const { text } = req.body

    try {
        
        const goal = await Goal.create({
            text,
            userId: req.user.id
        })
        res.status(201).json(goal)

    } catch (error) {
        res.status(400).json({ message: error.message })
    }

}

//DELETE GOAL
export const deleteGoal = async(req, res) => {
    
    const id = req.params.id

    try {
        
        const goal = await Goal.findByIdAndDelete(id)
        res.status(200).json(goal)

    } catch (error) {
        res.status(400).json({ message: error.message })
    }

}

//GET SINGLE GOAL
export const getGoal = async(req, res) => {

    const id = req.params.id

    try {
        
        const goal = await Goal.findById(id)
        res.status(200).json(goal)

    } catch (error) {
        res.status(400).json({ message: error.message })
    }

}