import FlashcardSet from "@/models/FlashcardSet";
import UserFlashcard from "@/models/UserFlashcard";
import { shouldArrayContain, shuffleArray } from "@/utils/server/arrayUtils";
import { getUser } from "@/utils/server/authUtils";
import connectToDB from "@/utils/server/database";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
    const id = params.id;
    const learningHistoryTab = await request.json();
    // console.log(learningHistoryTab);
    await connectToDB();

    const currentUser = await getUser(request),
        flashcardSet = await FlashcardSet.findById(id),
        newUserFlashcard = { userId: currentUser._id, flashcardSetId: id, learningHistory: [] },
        existingUserFlashcard = await UserFlashcard.findOne({ flashcardSet: flashcardSet, user: currentUser }),
        userFlashcard = existingUserFlashcard || newUserFlashcard;
    updateAttemptNo(learningHistoryTab);
    const prevAnswers = filterLastAndUpdateAttemptNo(userFlashcard.learningHistory);
    userFlashcard.learningHistory = prevAnswers;
    userFlashcard.learningHistory.push(...learningHistoryTab);
    userFlashcard.type = "LEARNING";
    if (existingUserFlashcard) {
        await UserFlashcard.findOneAndReplace({ _id: userFlashcard._id }, userFlashcard, { new: true });
    }
    else {
        await UserFlashcard.create(userFlashcard);
    }

    if (!flashcardSet) {
        return new NextResponse('Flash card set not found!', { status: 404 });
    }
    const { flashcards } = flashcardSet;
    console.log("cards " + flashcards);
let finalArray:any[] = [];
    //1st
    finalArray = getForNo1(flashcards);
    //2nd
    finalArray = getForNo2(flashcards, learningHistoryTab);
    //3rd ....
    finalArray = getForNo3AndNext(flashcards, learningHistoryTab, prevAnswers);
    return NextResponse.json(finalArray);
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
    const id = params.id;
    const body = await request.json();
    console.log(body);
    await connectToDB();

    return NextResponse.json(id);
}

function updateAttemptNo(currentTab: any) {
    currentTab.forEach((element: any) => {
        element.attempt = "LAST";
    });
}
function filterLastAndUpdateAttemptNo(previousTab: any) {
    const filtered = previousTab
        .filter((element: any) => {
            element.attempt = "LAST";
        });
    filtered
        .forEach((element: any) => {
            element.attempt = "PREV";
        });
    return filtered;

}

function getForNo1(flashcards:any):any[]{
    //1st 
    shuffleArray(flashcards)
    return flashcards;
}

function getForNo2(flashcards:any, learningHistoryTab:any):any[]{
    const wrongCards:any[] = [];
    const correctCards:any[] = [];
    const finalArray:any[]=[];
    const correctCardsIds: any[] = []
    learningHistoryTab.forEach((element: any) => {
        if (element.isCorrect) {
            correctCardsIds.push(element.flashcardId);
        }
    });
    flashcards.forEach((flashcard: any) => {
        const flashCardId = flashcard._id.valueOf(),
            isCorrect = correctCardsIds.includes(flashCardId);
        if (isCorrect) { correctCards.push(flashcard); } else { wrongCards.push(flashcard); };
    })
    correctCards.forEach((flashcard: any) => {
        if (shouldArrayContain()) {finalArray.push(flashcard)}
    })
    wrongCards.forEach((flashcard: any) => {
        if (shouldArrayContain()) {finalArray.push(flashcard)}
    })
    finalArray.push(...wrongCards);
    shuffleArray(finalArray);
    return finalArray;
}

function getForNo3AndNext(flashcards:any, learningHistoryTab:any, prevAnswers:any):any[]{
    const last

}