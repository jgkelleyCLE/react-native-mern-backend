import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import userRoutes from './routes/UserRoutes.js'
import goalRoutes from './routes/GoalRoutes.js'

const app = express()

app.use(express.json({ limit: "10mb" }))
app.use(express.urlencoded({ extended: false }))
app.use(cors())

dotenv.config()

const port = process.env.PORT || 3001

//MONGOOSE
mongoose.connect(process.env.MONGO_URL)

let connectionObj = mongoose.connection

connectionObj.on('connected', ()=> {
    console.log('database connected')
})

connectionObj.on('error', ()=> {
    console.log('database ERROR')
})

//ROUTING
app.use('/api/users', userRoutes)
app.use('/api/goals', goalRoutes)

app.listen(port, ()=> {
    console.log(`server is running on port ${port}`)
})