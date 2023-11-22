
import User from "@/models/User";
import connectToDB from "@/utils/server/database";
import { NextRequest, NextResponse } from "next/server";
import { hashPassword } from '@/utils/server/encryptionUtils';

export async function POST(request: NextRequest) {
    await connectToDB();
    const registerForm: RegisterForm = await request.json();

    const existingUser = await User.findOne({ name: registerForm.name });
    if (existingUser) {
        return new NextResponse('User already exists!', { status: 409 });
    }

    if (registerForm.password !== registerForm.confirmPassword) {
        return new NextResponse('Password do not match!', { status: 400 });
    }

    const newUser = {
        mail: registerForm.mail,
        name: registerForm.name,
        password: await hashPassword(registerForm.password),
        points: 0,
        rang: 0
    }

    const user = await User.create(newUser);

    return new NextResponse('User created!', { status: 201 });
}