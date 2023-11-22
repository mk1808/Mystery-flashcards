import FlashcardSet from "@/models/FlashcardSet";
import connectToDB from "@/utils/server/database";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    const id = params.id;
    console.log(id);
    await connectToDB();

    return NextResponse.json(id);
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    const id = params.id;
    console.log(id);
    await connectToDB();

    return NextResponse.json(id);
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    const id = params.id;
    await connectToDB();
    const existingSet = await FlashcardSet.findById(id);
    if (existingSet == null) {
        return new NextResponse('FlashcardSet does not exist!', { status: 409 });
    }

    const result = await FlashcardSet.deleteOne({ _id: id })
    return NextResponse.json(result);
}