import FlashcardSet from "@/models/FlashcardSet";
import connectToDB from "@/utils/server/database";
import { NextRequest, NextResponse } from "next/server";
import { getSearchParams, getUserFlashcards } from "./utils";

export async function GET(request: NextRequest) {
    await connectToDB();
    const searchParams = await getSearchParams(request);

    const result = (await FlashcardSet.find(searchParams)).map((flashcardSet => flashcardSet.toObject()));
    const filledResult = await getUserFlashcards(result, request);

    return NextResponse.json(filledResult)
}