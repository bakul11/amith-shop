import { connectDB } from "@/database/db"
import productDB from "@/model/productModel";
import { NextResponse } from "next/server"

export const POST = async (req, res) => {
    try {
        await connectDB();
        const body = await req.json();
        const product = await productDB.create(body);

        //success
        return NextResponse.json({
            message: 'Product upload successfully!',
            success: true,
            product
        })

    } catch (error) {
        return NextResponse.json({
            message: 'Product upload fail, please try again!',
            error: error?.message
        })
    }
}