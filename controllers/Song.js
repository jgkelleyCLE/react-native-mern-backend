import Song from '../models/SongModel.js'

export const createSong = async(req, res) => {
    const { title, artist, album } = req.body

    try {
        
        const newSong = await Song.create({
            title,
            artist,
            album
        })
        res.status(201).json(newSong)

    } catch (error) {
        res.status(400).json({ message: error.message })
    }

}

export const getAllSongs = async(req, res) => {

    try {
        
        const allSongs = await Song.find()
        res.status(200).json(allSongs)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}

export const getSong = async(req, res) => {
    const id = req.params.id

    try {
        
        const song = await Song.findById(id)
        res.status(200).json(song)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}