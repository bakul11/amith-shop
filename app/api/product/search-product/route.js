import { connectDB } from "@/database/db"
import productDB from "@/model/productModel";
import { NextResponse } from "next/server"

export const GET = async (req, res) => {
    try {
        await connectDB();
        const url = new URL(req.url);
        const searchParams = new URLSearchParams(url.searchParams);
        const search = searchParams.get('search')
        const product = await productDB.find({ title: { $regex: search, $options: 'i' } });

        //success
        return NextResponse.json(product)

    } catch (error) {
        return NextResponse.json({
            message: 'Product not found!',
            error: error?.message
        })
    }
}