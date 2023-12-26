import { TestResultDto } from "@/dtos/TestResultDto";
import FlashcardSet from "@/models/FlashcardSet";
import { UserT } from "@/models/User";
import { shuffleArray } from "@/utils/server/arrayUtils";
import { getUser } from "@/utils/server/authUtils";
import connectToDB from "@/utils/server/database";
import { simpleMessageResponse } from "@/utils/server/responseFactories";
import { checkAnswers } from "@/utils/server/testUtils";
import { findNextRang, getRang } from "@/utils/server/userRangUtils";
import { NextRequest, NextResponse } from "next/server";
import { saveTestResult, updateUser, updateUserFlashcard } from "./utils";
import { TestResultT } from "@/models/TestResult";

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
    await connectToDB();
    const flashcardSetId = params.id,
        test: TestResultT = await request.json(),
        currentUser: UserT = await getUser(request),
        flashcardSet = (await FlashcardSet.findById(flashcardSetId)),

        newResults = checkAnswers(flashcardSet, test),
        savedResult = await saveTestResult(flashcardSetId, newResults, currentUser);

    await updateUserFlashcard(flashcardSetId, currentUser);

    const gainPoints = (savedResult?.validCount || 0) * 10,
        updatedUser = await updateUser(currentUser, gainPoints);

    const response: TestResultDto = {
        testResults: savedResult!,
        gainPoints: gainPoints,
        currentPoints: currentUser.points,
        currentRang: getRang(updatedUser.rang!),
        nextRang: findNextRang(updatedUser.rang!)
    }
    return NextResponse.json(response);
}

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    await connectToDB();
    const id = params.id,
        flashcardSet = await FlashcardSet.findById(id);

    if (!flashcardSet) {
        return simpleMessageResponse('Flash card set not found!', 404)
    }
    shuffleArray(flashcardSet.flashcards);

    return NextResponse.json(flashcardSet);
}
