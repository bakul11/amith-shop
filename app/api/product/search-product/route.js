import { connectDB } from "@/database/db"
import productDB from "@/model/productModel";
import { NextResponse } from "next/server"

export const GET = async (req, res) => {
    try {
        await connectDB();
        const searchParams = new searchParams(req.URL);
        const search = searchParams.get('search')

        const product = await productDB.find({ $regx: { title: search, Option: 'i' } });

        if (!product) {
            return NextResponse.json({
                message: 'Product not found!'
            })
        }

        //success
        return NextResponse.json(product)

    } catch (error) {
        return NextResponse.json({
            message: 'Product upload fail, please try again!',
            error: error?.message
        })
    }
}