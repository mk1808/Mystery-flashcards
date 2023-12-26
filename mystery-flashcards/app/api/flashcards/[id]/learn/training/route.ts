import { AnswerT } from "@/models/Answer";
import FlashcardSet, { FlashcardSetT } from "@/models/FlashcardSet";
import { getUser } from "@/utils/server/authUtils";
import connectToDB from "@/utils/server/database";
import { NextRequest, NextResponse } from "next/server";
import { getRandomizeStrategy, getUserFlashcard, mergeUserAnswers, saveUserFlashcard, updateUserFlashcardType, updateUserPoints } from "./utils";
import { simpleMessageResponse } from "@/utils/server/responseFactories";
import { TrainingResultDto } from "@/dtos/TrainingResultDto";

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
    await connectToDB();
    const flashcardSetId = params.id,
        lastAnswers: AnswerT[] = await request.json();

    const currentUser = await getUser(request),
        flashcardSet: FlashcardSetT = (await FlashcardSet.findById(flashcardSetId))?.toObject();

    if (!flashcardSet) {
        return simpleMessageResponse('Flash card set not found', 404)
    }
    await updateUserPoints(currentUser, lastAnswers);

    const userFlashcard = await getUserFlashcard(currentUser, flashcardSetId);
    updateUserFlashcardType(userFlashcard);
    mergeUserAnswers(userFlashcard, lastAnswers);
    await saveUserFlashcard(userFlashcard);

    const randomizeStrategy = getRandomizeStrategy(userFlashcard.learningHistory!)
    const nextRoundFlashcards = randomizeStrategy(flashcardSet.flashcards!, userFlashcard.learningHistory!);

    return NextResponse.json(nextRoundFlashcards);
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
    await connectToDB();
    const flashcardSetId = params.id;
    const lastAnswers: AnswerT[] = await request.json();

    const currentUser = await getUser(request),
        flashcardSet: FlashcardSetT = (await FlashcardSet.findById(flashcardSetId))?.toObject()

    if (!flashcardSet) {
        return simpleMessageResponse('Flash card set not found', 404)
    }
    const newPoints = await updateUserPoints(currentUser, lastAnswers);
    const userFlashcard = await getUserFlashcard(currentUser, flashcardSetId);
    updateUserFlashcardType(userFlashcard);
    mergeUserAnswers(userFlashcard, lastAnswers);
    await saveUserFlashcard(userFlashcard);

    const trainingResult: TrainingResultDto = {
        userWithPoints: currentUser,
        updatedUserFlashcard: userFlashcard,
        newPoints: newPoints
    }
    return NextResponse.json(trainingResult);
}
