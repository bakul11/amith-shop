import { connectDB } from "@/database/db";
import authDB from "@/model/authModel";
import { NextResponse } from "next/server";
const bcrypt = require('bcrypt');

export const POST = async (req) => {
    try {
        await connectDB();
        const { email, password, userName } = await req.json();
        const hashPassword = await bcrypt.hash(password, 5);

        const user = await authDB.create({
            userName,
            email,
            password: hashPassword
        });

        //success
        return NextResponse.json({
            message: 'Register is successfully done!',
            success: true,
            user
        })


    } catch (error) {
        return NextResponse.json({
            message: 'Register fail ! Please try again',
            error: error
        })
    }
}