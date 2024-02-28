import { connectDB } from "@/database/db";
import newsLetterDB from "@/model/newsletterModel";
import { NextResponse } from "next/server"

export const POST = async (req, res) => {
    try {
        await connectDB();
        const body = await req.json();
        const data = await newsLetterDB.create(body);
        //success 
        return NextResponse.json({
            success: true,
            message: 'Thank you for subscribing to our newsletter!',
            data
        })
    } catch (error) {
        return NextResponse.json({
            message2: 'Email subscribing fail,please try again',
            error: error?.message
        })
    }
}