import connectToDB from "@/utils/server/database";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
    const id = params.id;
    const body = await request.json();
    console.log(body);
    await connectToDB();

    return NextResponse.json(id);
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
    const id = params.id;
    const body = await request.json();
    console.log(body);
    await connectToDB();

    return NextResponse.json(id);
}