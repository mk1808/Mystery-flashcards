import { TestResultDto } from "@/dtos/TestResultDto";
import { AnswerT } from "@/models/Answer";
import FlashcardSet from "@/models/FlashcardSet";
import TestResult, { TestResultT } from "@/models/TestResult";
import User, { UserT } from "@/models/User";
import UserFlashcard, { UserFlashcardT } from "@/models/UserFlashcard";
import { shuffleArray } from "@/utils/server/arrayUtils";
import { getUser } from "@/utils/server/authUtils";
import connectToDB from "@/utils/server/database";
import { checkAnswers } from "@/utils/server/testUtils";
import { findNextRang, findRangByPoints, getRang } from "@/utils/server/userRangUtils";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
    const flashcardSetId = params.id;
    const testAnswers: AnswerT[] = await request.json();
    await connectToDB();
    const currentUser: UserT = await getUser(request);
    const flashcardSet = (await FlashcardSet.findById(flashcardSetId));

    const newResults = checkAnswers(flashcardSet, testAnswers);

    let testResult: TestResultT = (await TestResult.findOne({ userId: currentUser._id, flashcardSetId: flashcardSetId })).toObject();
    if (testResult) {
        testResult.allCount = newResults.allCount;
        testResult.answers = newResults.answers;
        testResult.resultPercent = newResults.resultPercent;
        testResult.validCount = newResults.validCount;
        await TestResult.findOneAndReplace({ _id: testResult._id }, testResult, { new: true });
    } else {
        testResult = newResults;
        testResult.userId = currentUser._id;
        testResult.direction = "?"
        testResult = await TestResult.create(testResult);
    }

    const existingUserFlashcard: UserFlashcardT = (await UserFlashcard.findOne({ flashcardSetId: flashcardSetId, userId: currentUser._id })).toObject()
    if (existingUserFlashcard) {
        existingUserFlashcard.type = "TESTING";
        await UserFlashcard.findOneAndReplace({ _id: existingUserFlashcard._id }, existingUserFlashcard, { new: true });
    } else {
        const newUserFlashCard = {
            userId: currentUser._id,
            flashcardSetId: flashcardSetId,
            learningHistory: [],
            type: "TESTING"
        }
        await UserFlashcard.create(newUserFlashCard);
    }
    const points = (testResult?.validCount || 0) * 10;
    currentUser.points += points;
    currentUser.rang = findRangByPoints(currentUser.points).id;
    await User.findOneAndReplace({ _id: currentUser._id }, currentUser, { new: true });
    const response: TestResultDto = {
        testResults: testResult!,
        gainPoints: points,
        currentPoints: currentUser.points,
        currentRang: getRang(currentUser.rang),
        nextRang: findNextRang(currentUser.rang)
    }
    return NextResponse.json(response);
}

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    const id = params.id;
    await connectToDB();

    const flashcardSet = await FlashcardSet.findById(id);
    if (!flashcardSet) {
        return new NextResponse('Flash card set not found!', { status: 404 });
    }
    shuffleArray(flashcardSet.flashcards);

    return NextResponse.json(flashcardSet);
}
