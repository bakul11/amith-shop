import { connectDB } from "@/database/db";
import newsLetterDB from "@/model/newsletterModel";
import { NextResponse } from "next/server"

export const DELETE = async (req, { params }) => {
    try {
        await connectDB();
        const id = params.id;
        const item = await newsLetterDB.findById(id);
        if (!item) {
            return NextResponse.json({
                message: 'Items not found',
            })
        }
        const removeItem = await newsLetterDB.findByIdAndDelete(id);

        //success 
        return NextResponse.json({
            success: true,
            message: 'Items remove successfully done',
            removeItem
        })

    } catch (error) {
        return NextResponse.json({
            message: 'Items remove fail!',
            error: error?.message
        })
    }
}