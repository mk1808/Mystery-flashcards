
import User from "@/models/User";
import connectToDB from "@/utils/server/database";
import { NextRequest, NextResponse } from "next/server";
import { hashPassword } from '@/utils/encryptionUtils';

export async function POST(request: NextRequest) {
    await connectToDB();
    const registerForm: RegisterForm = await request.json();

    const userExists = await User.findOne({ login: registerForm.login });
    if (userExists) {
        return new Response('User already exists!', { status: 409 });
    }

    if (registerForm.password !== registerForm.confirmPassword) {
        return new Response('Password do not match!', { status: 400 });
    }

    const newUser = {
        email: registerForm.email,
        login: registerForm.login,
        password: await hashPassword(registerForm.password)
    }

    const user = await User.create(newUser);
    console.log(user)

    return new Response('User created!', { status: 201 });
}