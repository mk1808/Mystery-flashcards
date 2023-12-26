import { UserT } from "@/models/User";
import UserFlashcard, { UserFlashcardT } from "@/models/UserFlashcard";
import { getUser } from "@/utils/server/authUtils";
import connectToDB from "@/utils/server/database";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    await connectToDB();

    const updatedUserFlashcard: UserFlashcardT = await request.json();
    const currentUser: UserT = await getUser(request);
    const existingUserFlashcard = await UserFlashcard.findOne({ flashcardSetId: updatedUserFlashcard.flashcardSetId, userId: currentUser._id });

    if (existingUserFlashcard) {
        return NextResponse.json(await updateExistingUserFlashcard(existingUserFlashcard, updatedUserFlashcard));
    }
    return NextResponse.json(await createNewUserFlashcard(updatedUserFlashcard, currentUser));
}

async function updateExistingUserFlashcard(existingUserFlashcard: UserFlashcardT, updatedUserFlashcard: UserFlashcardT) {
    existingUserFlashcard.type = updatedUserFlashcard.type === "NONE" ? existingUserFlashcard.type : updatedUserFlashcard.type;
    existingUserFlashcard.isFavorite = updatedUserFlashcard.isFavorite;
    return await UserFlashcard.findOneAndReplace({ _id: existingUserFlashcard._id }, existingUserFlashcard, { new: true });
}

async function createNewUserFlashcard(updatedUserFlashcard: UserFlashcardT, currentUser: UserT) {
    updatedUserFlashcard.userId = currentUser._id;
    updatedUserFlashcard.learningHistory = [];
    return await UserFlashcard.create(updatedUserFlashcard);
}