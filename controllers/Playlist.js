import Playlist from "../models/PlaylistModel.js";
import Song from '../models/SongModel.js'

export const getUserPlaylists = async(req, res) => {

    try {
        
        const userPlaylists = await Playlist.find({ userId: req.user.id })
        res.status(200).json(userPlaylists)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}

export const createPlaylist = async(req, res) => {

    const { title } = req.body

    try {
        
        const newPlaylist = await Playlist.create({
            title,
            userId: req.user.id
        })
        res.status(201).json(newPlaylist)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}


export const getPlaylist = async(req, res) => {
    const id = req.params.id

    try {
        
        const playlist = await Playlist.findById(id)
        res.status(200).json(playlist)

    } catch (error) {
        res.status(400).json({ message: error.message })
    }

}

export const updatePlaylist = async(req, res) => {

    const {id} = req.params
    try {
        
        const updatedPlaylist = await Playlist.findOneAndUpdate(
            { _id: req.params.id },
            
            { $push: {
                songs: {
                    title: req.body.title,
                    artist: req.body.artist,
                    album: req.body.album
                }
            }}
        )
        res.status(200).json(updatedPlaylist)

    } catch (error) {
        res.status(400).json({ message: error.message })
    }


}

export const addSongs = async(req, res) => {

    

    try {
        const {playlistId, songId} = req.params
        const { songs } = req.body

        const playlist = await Playlist.findById(playlistId)
        console.log(playlist)

        if(!playlist){
            return res.status(404).json({ message: "No playlist found" })
        }

        const song = await Song.findById(songId);
            if (!song) {
            return res.status(404).json({ error: 'Song not found' });
    }

        playlist.songs.push(song, { songs })

        await playlist.save()

        res.status(200).json(playlist)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}

//ADD SONG TO PLAYLIST
export const addNewSong = async(req, res) => {

    try {
        const { playlistId, songId } = req.params;
        const playlist = await Playlist.findByIdAndUpdate(
          playlistId,
          { $push: { songs: songId } },
          { new: true }
        );
        res.json(playlist);
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
      }

}

export const deleteSong = async(req, res) => {
    
    const id = req.params.id
    try {
        
        const updatedPlaylist = await Playlist.findByIdAndUpdate(
            // {"_id": req.params.id}
            id
        , 
            {
                $push: {
                    songs: {
                        title: req.body.title,
                        artist: req.body.artist,
                        album: req.body.album
                    }
                }
            }
        )
        res.status(200).json(updatedPlaylist)

    } catch (error) {
        res.status(400).json({ message: error.message })
    }

}
