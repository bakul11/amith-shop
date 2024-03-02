import { connectDB } from "@/database/db";
import newsLetterDB from "@/model/newsletterModel";
import { NextResponse } from "next/server"

export const GET = async (req, res) => {
    try {
        await connectDB();
        const data = await newsLetterDB.find();
        //success 
        return NextResponse.json(data)

    } catch (error) {
        return NextResponse.json({
            message: 'items not found',
            error: error?.message
        })
    }
}