
import User from "@/models/User";
import connectToDB from "@/utils/server/database";
import { NextRequest } from "next/server";
import { simpleMessageResponse } from "@/utils/server/responseFactories";
import { hashPassword } from "@/utils/server/encryptionUtils";
import { UserRanges } from "@/enums/UserRang";

export async function POST(request: NextRequest) {
    await connectToDB();
    const registerForm: RegisterForm = await request.json();

    if (checkPasswordDoNotMatch(registerForm)) {
        return simpleMessageResponse('common.passwordDoNotMatch', 400)
    } else if (await checkIfUserExists(registerForm)) {
        return simpleMessageResponse('common.userExists', 409)
    }

    await User.create(await createUser(registerForm));

    return simpleMessageResponse('common.userRegisteredSuccessfully', 201)
}

function checkPasswordDoNotMatch(registerForm: RegisterForm) {
    return registerForm.password !== registerForm.confirmPassword
}

async function checkIfUserExists(registerForm: RegisterForm) {
    return !!await User.findOne({ name: registerForm.name })
}

async function createUser(registerForm: RegisterForm) {
    return {
        mail: registerForm.mail,
        name: registerForm.name,
        password: await hashPassword(registerForm.password),
        points: 0,
        avatar: "",
        rang: UserRanges[0].id
    }
}