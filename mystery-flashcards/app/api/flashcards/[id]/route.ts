import { FlashCardSetDto } from "@/dtos/FlashCardSetDto";
import FlashcardSet, { FlashcardSetT } from "@/models/FlashcardSet";
import { getUser } from "@/utils/server/authUtils";
import connectToDB from "@/utils/server/database";
import { simpleMessageResponse } from "@/utils/server/responseFactories";
import { NextRequest, NextResponse } from "next/server";
import UserFlashcard from "@/models/UserFlashcard";
import TestResult from "@/models/TestResult";
import { StatusType } from "@/enums/StatusOptions";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    await connectToDB();
    const flashcardSetId = params.id,
        flashCardSetDto: FlashCardSetDto = { statistics: {} };

    flashCardSetDto.flashcardSet = (await FlashcardSet.findById(flashcardSetId))!;

    if (!flashCardSetDto.flashcardSet) {
        return simpleMessageResponse('Flashcard set not found!', 404)
    }

    await updateUserFlashcard(request, flashCardSetDto);
    await updateStatistics(flashCardSetDto);

    return new NextResponse(JSON.stringify(flashCardSetDto));
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    await connectToDB();
    const id = params.id,
        updatedFlashcardSet: FlashcardSetT = await request.json(),
        existingFlashcardSet = await FlashcardSet.findById(id),
        currentUser = await getUser(request),
        userIsAuthor = existingFlashcardSet.user._id.equals(currentUser._id)

    if (!userIsAuthor) {
        return simpleMessageResponse('Access denied!', 401)
    }

    updatedFlashcardSet._id = existingFlashcardSet._id
    updatedFlashcardSet.user = currentUser

    const result = await FlashcardSet.findOneAndReplace({ _id: id }, updatedFlashcardSet, { new: true });

    return new NextResponse(JSON.stringify(result), { status: 200 });
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    await connectToDB();
    const id = params.id,
        existingFlashcardSet = await FlashcardSet.findById(id),
        currentUser = await getUser(request),
        userIsAuthor = existingFlashcardSet.user._id.equals(currentUser._id);

    if (existingFlashcardSet == null) {
        return simpleMessageResponse('Flashcard set not found!', 404)
    } else if (!userIsAuthor) {
        return simpleMessageResponse('Access denied!', 401)
    }

    const result = await FlashcardSet.deleteOne({ _id: id })
    return NextResponse.json(result);
}

async function updateUserFlashcard(request: NextRequest, flashCardSetDto: FlashCardSetDto) {
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

async function updateStatistics(flashCardSetDto: FlashCardSetDto) {
    flashCardSetDto.statistics!.favorite = await UserFlashcard.countDocuments({ flashcardSetId: flashCardSetDto?.flashcardSet?._id, isFavorite: true })
    flashCardSetDto.statistics!.learning = await UserFlashcard.countDocuments({ type: StatusType.LEARNING })
}