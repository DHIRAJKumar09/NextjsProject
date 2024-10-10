import {connect} from '@/dbConfig/dbConfig'
import User from '@/models/userModel';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';
import { NextRequest,NextResponse } from 'next/server';

connect();

export async function POST(request:NextRequest){
    try{
        const reqBody = await request.json();
        const{email,password} = reqBody;
        console.log(reqBody);

        const user = await User.findOne({email});

        if(!user){
            return NextResponse.json({message:"Emails Not found"},{status:400});
        }
        const decodedPassword = await bcrypt.compare(password,user.password);
        if(!decodedPassword){
            return NextResponse.json({message:"Passowrd doesn't match"},{status:500});
        }
        const tokenData = {
            id:user._id,
            username:user.username,
            email:user.email,
        }
        const token = await jwt.sign(tokenData,process.env.TOKEN_SECRET!,{expiresIn:'1h'});

         const response = NextResponse.json({
            message:"Logged In Success",
            success:true,
         })
         response.cookies.set("token",token,{
            httpOnly:true,
         })
         return response


    }catch(error:any){
        return NextResponse.json({error:error.message},{status:500})
    }
}