import { connect } from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { token } = reqBody;
        console.log("Token received:", token);

        // Correcting property name from verifToken to verifyToken
        const user = await User.findOne({ verifyToken: token, verifyTokenExpiry: { $gt: Date.now() } });
        console.log("User found:", user);

        if (!user) {
            return NextResponse.json({ error: "Invalid Token" }, { status: 400 });
        }

        // Verify the user
        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;

        await user.save();

        return NextResponse.json({
            message: "Email is verified",
            success: true, 
        }, { status: 200 }); // Change to 200 for success

    } catch (error: any) {
        console.error("Error during email verification:", error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
