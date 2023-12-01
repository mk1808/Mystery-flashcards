import TestResult from "@/models/TestResult";
import { getUser } from "@/utils/server/authUtils";
import connectToDB from "@/utils/server/database";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
    const id = params.id;
    const body = await request.json();
    console.log(body);
    await connectToDB();

    const user = await getUser(request);
    body.flashcardSetId = id;
    body.userId = user._id;
    const savedResult = await TestResult.create(body);
    return NextResponse.json(savedResult);
}

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    const id = params.id;
    await connectToDB();

    return NextResponse.json(id)
}
