
import User from "@/models/User";
import connectToDB from "@/utils/server/database";
import { NextRequest } from "next/server";
import { simpleMessageResponse } from "@/utils/server/responseFactories";
import { checkIfUserExists, checkPasswordDoNotMatch, createUser } from "./utils";

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