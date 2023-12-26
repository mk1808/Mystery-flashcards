import { FlashCardSetDto } from "@/dtos/FlashCardSetDto";
import { StatusType } from "@/enums/StatusOptions";
import TestResult from "@/models/TestResult";
import UserFlashcard from "@/models/UserFlashcard";
import { getUser } from "@/utils/server/authUtils";
import { NextRequest } from "next/server";

export async function updateUserFlashcard(request: NextRequest, flashCardSetDto: FlashCardSetDto) {
    try {
        const currentUser = await getUser(request);
        if (currentUser) {
            flashCardSetDto.userFlashcard = (await UserFlashcard.findOne({ flashcardSetId: flashCardSetDto?.flashcardSet?._id, userId: currentUser._id }))?.toObject();
            if (flashCardSetDto.userFlashcard) {
                flashCardSetDto.testResult = (await TestResult.findOne({ flashcardSetId: flashCardSetDto?.flashcardSet?._id, userId: currentUser._id }))?.toObject();
            }
        }
    } catch (e) { }
}

export async function updateStatistics(flashCardSetDto: FlashCardSetDto) {
    flashCardSetDto.statistics!.favorite = await UserFlashcard.countDocuments({ flashcardSetId: flashCardSetDto?.flashcardSet?._id, isFavorite: true })
    flashCardSetDto.statistics!.learning = await UserFlashcard.countDocuments({ type: StatusType.LEARNING })
}