import { connectDB } from "@/database/db";
import authDB from "@/model/authModel";
import { NextResponse } from "next/server";

export const GET = async (req) => {
    try {
        await connectDB();
        const user = await authDB.find();
        //success 
        return NextResponse.json(user)


    } catch (error) {
        return NextResponse.json({
            message: 'user not found!',
            error: error?.message
        })
    }
}