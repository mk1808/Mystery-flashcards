import FlashcardSet from "@/models/FlashcardSet";
import UserFlashcard from "@/models/UserFlashcard";
import { getUser } from "@/utils/server/authUtils";
import connectToDB from "@/utils/server/database";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const requestBody = await request.json();
    await connectToDB();

    const currentUser = await getUser(request);
    const existingUserFlashcard = await UserFlashcard.findOne({ flashcardSetId: requestBody.flashcardSetId, userId: currentUser._id });

    if (existingUserFlashcard) {
        existingUserFlashcard.type = requestBody.type == "NONE" ? existingUserFlashcard.type : requestBody.type;
        existingUserFlashcard.isFavorite = requestBody.isFavorite;
        const updatedUserFlashCard = await UserFlashcard.findOneAndReplace({ _id: existingUserFlashcard._id }, existingUserFlashcard, { new: true });
        return new NextResponse(JSON.stringify(updatedUserFlashCard), { status: 200 });
    }

    const newUserFlashCard = {
        userId: currentUser._id,
        flashcardSetId: requestBody.flashcardSetId,
        learningHistory: [],
        type: requestBody.type,
        isFavorite: !!requestBody.isFavorite
    }
    const savedUserFlashcard = await UserFlashcard.create(newUserFlashCard);
    return new NextResponse(JSON.stringify(savedUserFlashcard), { status: 200 });
}