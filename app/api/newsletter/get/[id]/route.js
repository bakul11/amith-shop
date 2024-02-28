import { connectDB } from "@/database/db";
import newsLetterDB from "@/model/newsletterModel";
import { NextResponse } from "next/server"

export const GET = async (req, res, { params }) => {
    try {
        await connectDB();
        const id = params.id;
        const data = await newsLetterDB.find({ id });
        console.log("data....", data);
        //success 
        return NextResponse.json(data)

    } catch (error) {
        return NextResponse.json({
            message: 'Email not found',
            error: error?.message
        })
    }
}