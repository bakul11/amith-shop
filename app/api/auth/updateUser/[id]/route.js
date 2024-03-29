import { connectDB } from "@/database/db";
import authDB from "@/model/authModel";
import { NextResponse } from "next/server";

export const PUT = async (req, { params }) => {
    try {
        await connectDB();
        const body = await req.json();
        const id = params.id;
        const findUser = await authDB.findById(id);
        if (!findUser) {
            return NextResponse.json({
                message: 'user not found!'
            })
        }

        const updateUser = await authDB.findByIdAndUpdate(id, body, {
            new: true
        })

        //success
        return NextResponse.json({
            message: 'Profile update successfully done',
            success: true,
            updateUser
        })

    } catch (error) {
        return NextResponse.json({
            message: 'Profile update fail..',
            error: error?.message
        })
    }
}