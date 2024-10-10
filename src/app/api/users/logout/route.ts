import {connect} from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import {NextRequest,NextResponse} from 'next/server'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

connect();

export async  function GET(request:NextResponse){
    try{
        const response = NextResponse.json({
            message:"Logout successfully",
            success:true,
        })
        response.cookies.set("token","",{
            httpOnly:true,
            expires:new Date(0)
        })
        return response;

    }catch(error:any){
        return NextResponse.json({error:error.message},{status:500})
    }
}