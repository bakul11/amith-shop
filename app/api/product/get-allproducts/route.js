import { connectDB } from "@/database/db"
import productDB from "@/model/productModel";
import { NextResponse } from "next/server"

export const GET = async (req, res) => {
    try {
        await connectDB();
        const product = await productDB.find();

        //success
        return NextResponse.json(product)

    } catch (error) {
        return NextResponse.json({
            message: 'Product not found',
            error: error?.message
        })
    }
}