import { connect } from '@/dbConfig/dbConfig';
import { NextRequest, NextResponse } from 'next/server';

connect();

export async function GET(request: NextRequest) {
    try {
        // Create the response object
        const response = NextResponse.json({
            message: "Logout successfully",
            success: true,
        });
        
        // Set the token cookie to expire
        response.cookies.set('token', '', {
            httpOnly: true,
            expires: new Date(0), // Expire the cookie
        });
        
        return response; // Return the response

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
