import User, { UserT } from "@/models/User";
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
        return new NextResponse(JSON.stringify({ message: 'Password do not match!' }), { status: 400 });
    }

    const newPassword = userForm.password ? await hashPassword(userForm.password) : logged.password;

    const updatedUser: UserT = {
        _id: logged._id,
        points: logged.points,
        rang: logged.rang,
        statistics: logged.statistics,
        mail: userForm.mail,
        name: userForm.name,
        avatar: userForm.avatar,
        password: newPassword
    }
    const result = await User.findOneAndReplace({ _id: logged._id }, updatedUser, { new: true });

    return NextResponse.json(result);
}