import FlashcardSet from "@/models/FlashcardSet";
import { getUser } from "@/utils/server/authUtils";
import connectToDB from "@/utils/server/database";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
    const newSet = await request.json();
    await connectToDB();
    newSet.user = await getUser(request);
    newSet.creationDate = new Date();

    const flashcardSet = await FlashcardSet.create(newSet);

    return NextResponse.json(flashcardSet)
}