import { connectDB } from "@/database/db"
import orderDB from "@/model/orderModel"
import { NextResponse } from "next/server"

export const POST = async (req, res) => {
    try {
        await connectDB();
        const body = await req.json()
        console.log("body", body);
        const data = await orderDB.create(body);

        //success
        return NextResponse.json({
            message: 'Thanks you for purchages product!',
            success: true,
            data
        })

    } catch (error) {
        return NextResponse.json({
            message: 'Purchages fail please try again',
            error: error?.message
        })
    }
}