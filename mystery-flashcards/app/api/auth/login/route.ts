import connectToDB from "@/utils/server/database";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const body = await request.json();
    await connectToDB();

    return NextResponse.json(body)
}