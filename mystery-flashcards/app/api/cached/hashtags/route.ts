import FlashcardSet from "@/models/FlashcardSet";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {

    const hashtags = await FlashcardSet.distinct("hashtags")

    return NextResponse.json(hashtags);
}