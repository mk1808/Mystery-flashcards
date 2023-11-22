import FlashcardSet from "@/models/FlashcardSet";
import { getUser } from "@/utils/server/authUtils";
import connectToDB from "@/utils/server/database";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    const id = params.id;
    await connectToDB();

    return new NextResponse(JSON.stringify(await FlashcardSet.findById(id)));
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    const id = params.id;
    const requestBody = await request.json();
    await connectToDB();

    const existingFlashcardSet = await FlashcardSet.findById(id);
    const currentUser = await getUser(request);
    const userIsAuthor = existingFlashcardSet.user._id.equals(currentUser._id)
    if (!userIsAuthor) {
        return new NextResponse('Access denied!', { status: 401 });
    }

    const updatedFlashCardSet = {
        _id: existingFlashcardSet._id,
        user: existingFlashcardSet.user,
        name: requestBody.name,
        level: requestBody.level,
        hashtags: requestBody.hashtags,
        flashcards: requestBody.flashcards,
        isPublic: requestBody.isPublic,
        lang1: requestBody.lang1,
        lang2: requestBody.lang2,
    }
    const result = await FlashcardSet.findOneAndReplace({ _id: id }, updatedFlashCardSet, { new: true });
    return new NextResponse(JSON.stringify(result), { status: 200 });
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