import User, { UserT } from "@/models/User";
import { getUser } from "@/utils/server/authUtils";
import connectToDB from "@/utils/server/database";
import { hashPassword } from "@/utils/server/encryptionUtils";
import { simpleMessageResponse } from "@/utils/server/responseFactories";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    await connectToDB();
    return NextResponse.json(await getUser(request));
}

export async function PUT(request: NextRequest) {
    await connectToDB();
    const userForm = await request.json();
    const logged = await getUser(request);
    if (userForm.password && userForm.password !== userForm.confirmPassword) {
        return simpleMessageResponse('common.passwordDoNotMatch', 400)
    }

    const newPassword = userForm.password ? await hashPassword(userForm.password) : logged.password;

    logged.avatar = userForm.avatar;
    logged.password = newPassword;

    const result = await User.findOneAndReplace({ _id: logged._id }, logged, { new: true });

    return NextResponse.json(result);
}