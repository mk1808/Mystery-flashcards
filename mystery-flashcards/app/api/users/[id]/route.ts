import User, { UserT } from "@/models/User";
import connectToDB from "@/utils/server/database";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    await connectToDB();

    const id = params.id;
    const user: UserT | null = await User.findById(id);
    return NextResponse.json(user);
}

