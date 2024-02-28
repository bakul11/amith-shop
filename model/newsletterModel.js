import mongoose from "mongoose"

const newsLetterSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    time: {
        type: String,
        default: new Date().toDateString()
    }
})
const newsLetterDB = mongoose.models.NEWSLETTER || mongoose.model('NEWSLETTER', newsLetterSchema);
export default newsLetterDB;