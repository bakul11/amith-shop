import { connectDB } from "@/database/db"
import productDB from "@/model/productModel";
import { NextResponse } from "next/server"

export const GET = async (req, res) => {
    try {
        await connectDB();
        const url = new URL(req.url);
        const searchParams = new URLSearchParams(url.searchParams);
        const page = searchParams.get('page') || 8;
        const limit = 1;


        const totalItems = await productDB.countDocuments();
        const totalPages = Math.ceil(totalItems / limit)
        const skip = ((page - 1) * limit);

        const product = await productDB.find().skip(skip).limit(page).exec();

        //success
        return NextResponse.json({ product, totalPages })

    } catch (error) {
        return NextResponse.json({
            message: 'Product not found',
            error: error?.message
        })
    }
}