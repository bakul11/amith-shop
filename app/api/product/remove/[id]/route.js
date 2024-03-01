import { connectDB } from "@/database/db"
import productDB from "@/model/productModel";
import { NextResponse } from "next/server"

export const GET = async (req, res, { params }) => {
    try {
        await connectDB();
        const id = req.params;
        const product = await productDB.findById(id);

        if (!product) {
            return NextResponse.json({
                message: 'Product not found !'
            })
        }

        const removeProduct = await productDB.findByIdAndDelete(id);

        //success
        return NextResponse.json({
            success: true,
            message: 'Product remove successfully done!',
            removeProduct
        })

    } catch (error) {
        return NextResponse.json({
            message: 'Product not found !',
            error: error?.message
        })
    }
}