import mongoose from 'mongoose'


const PlaylistSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    songs: [
        { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Song' 
        }
    ],
   
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true })


const Playlist = mongoose.model('playlists', PlaylistSchema)

export default Playlist