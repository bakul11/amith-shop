import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profile: {
        type: String,
        default: 'https://i.ibb.co/QYg7nZm/Screenshot-1.png'
    },
    address: {
        type: String
    },
    phone: {
        type: Number,
    },
    role: {
        type: String,
        default: 'user'
    }
})

const authDB = mongoose.models.AUTH || mongoose.model('AUTH', userSchema);
export default authDB;