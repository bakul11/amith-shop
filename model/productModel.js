import mongoose from "mongoose"

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    newPrice: {
        type: Number,
        required: true
    },
    oldPrice: {
        type: Number,
        required: true
    },
    photo: {
        type: String,
        required: true
    }
})
const productDB = mongoose.models.PRODUCT || mongoose.model('PRODUCT', productSchema);
export default productDB;