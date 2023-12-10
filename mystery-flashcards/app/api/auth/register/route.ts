
import User from "@/models/User";
import connectToDB from "@/utils/server/database";
import { NextRequest, NextResponse } from "next/server";
import { hashPassword } from '@/utils/server/encryptionUtils';
import { UserRanges } from "@/enums/UserRang";

export async function POST(request: NextRequest) {
    await connectToDB();
    const registerForm: RegisterForm = await request.json();

    const existingUser = await User.findOne({ name: registerForm.name });
    if (existingUser) {
        return new NextResponse(JSON.stringify({ message: 'common.userExists' }), { status: 409 });
    }

    if (registerForm.password !== registerForm.confirmPassword) {
        return new NextResponse(JSON.stringify({ message: 'common.passwordDoNotMatch' }), { status: 400 });
    }

    const newUser = {
        mail: registerForm.mail,
        name: registerForm.name,
        password: await hashPassword(registerForm.password),
        points: 0,
        avatar:"",
        rang: UserRanges[0].id
    }

    const user = await User.create(newUser);

    return new NextResponse(JSON.stringify({ message: 'common.userRegisteredSuccessfully' }), { status: 201 });
}