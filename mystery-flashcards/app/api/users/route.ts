import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {

    return NextResponse.json("user")
}

export async function PUT(request: NextRequest) {
    
    const body = await request.json();
    return NextResponse.json(body);
}