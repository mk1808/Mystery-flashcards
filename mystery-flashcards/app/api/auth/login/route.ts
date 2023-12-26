import { NextRequest } from "next/server";
import { checkPasswordMatch } from '@/utils/server/encryptionUtils';
import { signToken } from '@/utils/server/jwtUtils';
import User from "@/models/User";
import connectToDB from "@/utils/server/database";
import { simpleMessageResponse } from "@/utils/server/responseFactories";

export async function POST(request: NextRequest) {
    await connectToDB();
    const loginForm: LoginForm = await request.json();

    const existingUser = await User.findOne({ name: loginForm.name });
    if (!existingUser || ! await checkPasswordMatch(loginForm.password, existingUser.password)) {
        return simpleMessageResponse('common.invalidCredentials', 401)
    }

    const token = await signToken({ name: existingUser.name, id: existingUser.id });
    return simpleMessageResponse('common.successfulLogin', 200, { 'Set-Cookie': `token=Bearer ${token}; Path=/` })
}