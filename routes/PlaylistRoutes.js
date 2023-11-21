import express from 'express'
import { addNewSong, addSongs, createPlaylist, deleteSong, getPlaylist, getUserPlaylists, updatePlaylist } from '../controllers/Playlist.js';
import { auth } from '../middleware/auth.js';

const router = express.Router()

//create playlist
router.post('/create', auth, createPlaylist)

//get USER playlists
router.get('/user/:id', auth, getUserPlaylists)

//get single playlist
router.get('/:id', getPlaylist)

//update playlist
router.put('/update/:id', auth, updatePlaylist)

//delete song
router.delete('/delete/:songId/:playlistId', auth, deleteSong)

//ADD SONGS
router.post('/:playlistId/add-songs', addSongs)

//ADD NEW SONG
router.put('/:playlistId/addsong/:songId', addNewSong)


export default router;