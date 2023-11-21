import express from 'express'
import { createSong, getAllSongs, getSong } from '../controllers/Song.js'

const router = express.Router()

//create song
router.post('/', createSong)

//get songs
router.get('/', getAllSongs)

//get song
router.get('/:id', getSong)

export default router