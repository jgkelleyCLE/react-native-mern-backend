import mongoose from 'mongoose'


const SongSchema = new mongoose.Schema({
    title: { type: String, required: true },
    artist: { type: String, required: true },
    album: { type: String, required: true },
}, { timestamps: true })

const Song = mongoose.model("songs", SongSchema)

export default Song