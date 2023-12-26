import { getUser } from "@/utils/server/authUtils";
import connectToDB from "@/utils/server/database";
import { simpleMessageResponse } from "@/utils/server/responseFactories";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    await connectToDB();
    try {
        return new NextResponse(JSON.stringify(await getUser(request)));
    } catch (e) { }
    return simpleMessageResponse('User not logged', 401);
}
