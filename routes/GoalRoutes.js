import express from 'express'
import { createGoal, deleteGoal, getGoal, getGoals } from '../controllers/Goal.js'
import { auth } from '../middleware/auth.js'

const router = express.Router()

//GET GOALS
router.get('/', auth, getGoals) 

//GET GOAL
router.get('/:id', getGoal)

//POST GOAL
router.post('/', auth, createGoal)

//DELETE GOAL
router.delete('/:id', auth, deleteGoal)

export default router