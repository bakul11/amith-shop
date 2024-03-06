import { connectDB } from "@/database/db"
import orderDB from "@/model/orderModel"
import { NextResponse } from "next/server"

export const GET = async (req, { params }) => {
    try {
        await connectDB();
        const id = await params.id;
        console.log("id", id);
        const data = await orderDB.find({ userId: id });

        //success
        return NextResponse.json(data)

    } catch (error) {
        return NextResponse.json({
            message: 'Product not found',
            error: error?.message
        })
    }
}