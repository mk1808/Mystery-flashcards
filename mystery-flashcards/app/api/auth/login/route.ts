import { NextRequest, NextResponse } from "next/server";
import { checkPasswordMatch } from '@/utils/server/encryptionUtils';
import { signToken } from '@/utils/server/jwtUtils';
import User from "@/models/User";
import connectToDB from "@/utils/server/database";

export async function POST(request: NextRequest) {
    await connectToDB();
    const loginForm: LoginForm = await request.json();

    const existingUser = await User.findOne({ name: loginForm.name });

    if (!existingUser || ! await checkPasswordMatch(loginForm.password, existingUser.password)) {
        return new NextResponse('Invalid credentials!', { status: 401 });
    }

    const token = await signToken({ name: existingUser.name, id: existingUser.id });

    return new NextResponse('Successful login!', {
        status: 200,
        headers: { 'Set-Cookie': `token=Bearer ${token}; Path=/` },
    });
}