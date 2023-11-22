import User from "@/models/User";
import { getUser } from "@/utils/server/authUtils";
import connectToDB from "@/utils/server/database";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    await connectToDB();

    const id = params.id;
    const user = await User.findById(id);
    return new NextResponse(JSON.stringify(user));
}

