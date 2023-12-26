import FlashcardSet, { FlashcardSetT } from "@/models/FlashcardSet";
import { getUser } from "@/utils/server/authUtils";
import connectToDB from "@/utils/server/database";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
    await connectToDB();
    const newSet: FlashcardSetT = await request.json();

    await updateSet(newSet, request)

    const flashcardSet = await FlashcardSet.create(newSet);
    return NextResponse.json(flashcardSet)
}

async function updateSet(set: FlashcardSetT, request: NextRequest) {
    set.user = await getUser(request);
    set.creationDate = new Date();
}