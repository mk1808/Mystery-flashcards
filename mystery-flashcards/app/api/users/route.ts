import User from "@/models/User";
import { getUser } from "@/utils/server/authUtils";
import connectToDB from "@/utils/server/database";
import { hashPassword } from "@/utils/server/encryptionUtils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    await connectToDB();
    return new NextResponse(JSON.stringify(await getUser(request)));
}

export async function PUT(request: NextRequest) {
    await connectToDB();
    const userForm = await request.json();
    const logged = await getUser(request);
    if (userForm.password && userForm.password !== userForm.confirmPassword) {
        return new NextResponse('Password do not match!', { status: 400 });
    }
    const existingUser = await User.findById(logged._id);
    if (existingUser == null) {
        return new NextResponse('User does not exist!', { status: 409 });
    }

    const updatedUser = {
        _id: existingUser._id,
        points: existingUser.points,
        rang: existingUser.rang,
        statistics: existingUser.statistics,
        mail: userForm.mail,
        name: userForm.name,
        password: await hashPassword(userForm.password)
    }
    const result = await User.findOneAndReplace({ _id: logged._id }, updatedUser, { new: true });

    return NextResponse.json(result);
}