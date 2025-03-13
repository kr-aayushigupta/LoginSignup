import bcrypt from 'bcryptjs';

import { NextResponse } from 'next/server';
import User from '@/models/user';
import connectToDatabase from '@/lib/mongodb';


export async function POST(request:Request){
    const {name,email,password,confirmpassword}=await request.json();

    const isValidEmail=(email:string)=>{
        const emailRegex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    if(!name || !email || !password || !confirmpassword){
        return NextResponse.json({message:"All fields are required"},{status:400})
    }
    if(!isValidEmail(email)){
        return NextResponse.json({message:"Invalid Email Format"},{status:400})
    }
    if(confirmpassword!== password){
        return NextResponse.json({message:"Password do not match"},{status:400})
    }
    if(password.length<6){
        return NextResponse.json({message:"Password must be of atleast 8 characters"},{status:400})
    }


    try{
        await connectToDatabase();
        const existingUser=await User.findOne({email});
        if(existingUser){
            return NextResponse.json({message:"User Already Exists "},{status:400})
        }

        const hashedPassword=await bcrypt.hash(password,10);

        const newUser=new User({
            email,
            name,
            password:hashedPassword,

        });
        await newUser.save();
        return NextResponse.json({message:"User created"},{status:201})

    }catch(error){
        return NextResponse.json({message:"Something went Wrong"},{status:500})

    }
}
