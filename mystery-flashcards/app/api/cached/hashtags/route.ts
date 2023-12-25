import FlashcardSet from "@/models/FlashcardSet";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const hashtags = await FlashcardSet.distinct("hashtags")
        return NextResponse.json(hashtags);
    } catch (e) { }
    return new NextResponse(JSON.stringify([]), { status: 401 });
}