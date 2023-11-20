import connectToDB from "@/utils/server/database";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    await connectToDB();
    
    return NextResponse.json("user")
}

export async function PUT(request: NextRequest) {
    const body = await request.json();
    await connectToDB();

    return NextResponse.json(body);
}