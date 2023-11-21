import connectToDB from "@/utils/server/database";
import { NextRequest, NextResponse } from "next/server";
import { hashPassword } from '@/utils/encryptionUtils';

export async function POST(request: NextRequest) {
    const registerForm: RegisterForm = await request.json();

    // Find existing user by registerForm.login
    // if exists, throw register error
    const userExists = false;
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

    //save newUser

    return new Response('User created!', { status: 201 });
}