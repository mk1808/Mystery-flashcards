import { NextRequest, NextResponse } from "next/server";
import { checkPasswordMatch } from '@/utils/encryptionUtils';
import { signToken } from '@/utils/jwtUtils';

export async function POST(request: NextRequest) {
    const loginForm: LoginForm = await request.json();

    // Find existing user by loginForm.login
    // if not exists, throw login error
    const existingUser = { id: "1", login: "login", password: "$2b$10$GbDHZZ/gqafT/llNQFWsX.E4EfKeG.RWkBxXSt1k4W7erU6v61TDK" }

    if (!existingUser || !checkPasswordMatch(loginForm.password, existingUser.password)) {
        return new Response('Invalid credentials!', { status: 401 });
    }

    const token = await signToken({ login: existingUser.login, id: existingUser.id });

    return new Response('Successful login!', {
        status: 200,
        headers: { 'Set-Cookie': `token=Bearer ${token}; Path=/` },
    });
}