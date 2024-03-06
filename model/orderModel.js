import mongoose from "mongoose"


const orderSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    userInfo: Object,
    cart: {
        type: Array
    },
    time: {
        type: String,
        default: new Date().toDateString()
    }
})
const orderDB = mongoose.models.ORDER || mongoose.model('ORDER', orderSchema);
export default orderDB;