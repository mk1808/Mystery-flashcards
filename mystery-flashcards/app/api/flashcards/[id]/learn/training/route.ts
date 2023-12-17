import { AnswerT } from "@/models/Answer";
import { FlashcardT } from "@/models/Flashcard";
import FlashcardSet from "@/models/FlashcardSet";
import User, { UserT } from "@/models/User";
import UserFlashcard from "@/models/UserFlashcard";
import { shouldArrayContain, shuffleArray } from "@/utils/server/arrayUtils";
import { getUser } from "@/utils/server/authUtils";
import connectToDB from "@/utils/server/database";
import { findRangByPoints } from "@/utils/server/userRangUtils";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
    const id = params.id;
    const learningHistoryTab: AnswerT[] = await request.json();
    await connectToDB();

    const currentUser = await getUser(request),
        flashcardSet = (await FlashcardSet.findById(id)).toObject(),
        newUserFlashcard = { userId: currentUser._id, flashcardSetId: id, learningHistory: [] },
        existingUserFlashcard = (await UserFlashcard.findOne({ flashcardSet: flashcardSet, user: currentUser })).toObject(),
        userFlashcard = existingUserFlashcard || newUserFlashcard;
    const { randStrategy, prevAnswers } = await addOrUpdateUserFlashcard(userFlashcard, learningHistoryTab, existingUserFlashcard);
    if (!flashcardSet) {
        return new NextResponse('Flash card set not found!', { status: 404 });
    }
    const { flashcards } = flashcardSet;
    const finalArray: any = randomize(randStrategy, flashcards, learningHistoryTab, prevAnswers);
    updateUserPoints(currentUser, learningHistoryTab);
    console.log("in req")
    return NextResponse.json(finalArray);
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
    const id = params.id;
    const learningHistoryTab: AnswerT[] = await request.json();
    await connectToDB();

    const currentUser = await getUser(request),
        flashcardSet = (await FlashcardSet.findById(id)).toObject(),
        newUserFlashcard = { userId: currentUser._id, flashcardSetId: id, learningHistory: [] },
        existingUserFlashcard = (await UserFlashcard.findOne({ flashcardSet: flashcardSet, user: currentUser })).toObject(),
        userFlashcard = existingUserFlashcard || newUserFlashcard;
    const { udpatedUserFlashcard } = await addOrUpdateUserFlashcard(userFlashcard, learningHistoryTab, existingUserFlashcard);
    const { user, newPoints } = await updateUserPoints(currentUser, learningHistoryTab);
    return NextResponse.json({ userWithPoints: user, udpatedUserFlashcard: udpatedUserFlashcard, newPoints: newPoints });
}

function updateAttemptNo(currentTab: any) {
    if (currentTab) {
        currentTab.forEach((element: any) => {
            element.attempt = "LAST";
        });
    }

}
function filterLastAndUpdateAttemptNo(previousTab: any) {
    const filtered = getOnlyLastAnswers(previousTab);
    filtered
        .forEach((element: any) => {
            element.attempt = "PREV";
        });
    return filtered;

}

function getOnlyLastAnswers(previousTab: any) {
    return previousTab
        .filter((element: any) =>
            element.attempt == "LAST"
        );

}

function getForNo1(flashcards: any): any[] {
    //1st 
    shuffleArray(flashcards)
    return flashcards;
}

function getForNo2(flashcards: any, learningHistoryTab: any): any[] {
    const wrongCards: any[] = [];
    const correctCards: any[] = [];
    const finalArray: any[] = [];
    const correctCardsIds: any[] = getCorrectCardIds(learningHistoryTab);

    flashcards.forEach((flashcard: any) => {
        const flashCardId = flashcard._id.valueOf(),
            isCorrect = correctCardsIds.includes(flashCardId);
        if (isCorrect) { correctCards.push(flashcard); } else { wrongCards.push(flashcard); };
    })
    correctCards.forEach((flashcard: any) => {
        if (shouldArrayContain()) { finalArray.push(flashcard) }
    })
    wrongCards.forEach((flashcard: any) => {
        if (shouldArrayContain()) { finalArray.push(flashcard) }
    })
    finalArray.push(...wrongCards);
    shuffleArray(finalArray);
    return finalArray;
}

function getForNo3AndNext(flashcards: FlashcardT[], learningHistoryTab: any, prevAnswers: AnswerT[]): any[] {
    const prevAnswersCardsIds = prevAnswers.map((element: AnswerT) => element.flashcardId?.valueOf());
    const allCardsIds = flashcards.map((element: FlashcardT) => element._id?.valueOf());

    const idsWithNumOfCorrectAns: any = {
        correct2: [],
        correct1: [],
        incorrect: []
    }
    const allPrev: AnswerT[] = [...prevAnswers];
    const cardsIdsWithAnswers: idWithAns[] = [];
    flashcards.forEach((element: any) => {
        const singleArrElement: idWithAns = {
            id: element._id,
            answers: allPrev.filter(prev => prev.flashcardId == element._id)
        }
        cardsIdsWithAnswers.push(singleArrElement);
    });
    cardsIdsWithAnswers.forEach((element: idWithAns) => {
        const noOfCorrect = element.answers.filter(el => el.isCorrect).length;
        const category = noOfCorrect > 1 ? "correct2" : noOfCorrect == 1 ? "correct1" : "incorrect";
        idsWithNumOfCorrectAns[category].push(element.id);
    })

    const finalIds = [];
    const idsNotInPrev = allCardsIds.filter((element: any) => !prevAnswersCardsIds.includes(element));
    finalIds.push(...idsNotInPrev);
    idsWithNumOfCorrectAns.correct2.forEach((id: any) => {
        if (shouldArrayContain()) { finalIds.push(id) }
    })
    finalIds.push(...idsWithNumOfCorrectAns.correct1);
    finalIds.push(...idsWithNumOfCorrectAns.incorrect);
    finalIds.push(...idsWithNumOfCorrectAns.incorrect);
    const finalArray = finalIds.map(id => {
        return flashcards.filter(card => card._id == id)[0]
    })
    shuffleArray(finalArray);
    return finalArray;
}

function getRandomizeStrategy(answersFromDb: any[]) {
    const isSecond = answersFromDb.every((ans: AnswerT) => ans.attempt == "LAST")
    return answersFromDb.length == 0 ? 1 : isSecond ? 2 : 3;
}

interface idWithAns {
    id: any,
    answers: AnswerT[]
}

function randomize(randStrategy: number, flashcards: any, learningHistoryTab: any, prevAnswers: any) {
    console.log("randStrategy: " + randStrategy)
    switch (randStrategy) {
        case 1:
            return getForNo1(flashcards);
        case 2:
            return getForNo2(flashcards, learningHistoryTab);
        default:
            return getForNo3AndNext(flashcards, learningHistoryTab, prevAnswers);
    }
}

async function addOrUpdateUserFlashcard(userFlashcard: any, learningHistoryTab: any, existingUserFlashcard: any) {
    userFlashcard.learningHistory.forEach((card: any) => {
        card._id = card._id.valueOf();
        card.flashcardId = card.flashcardId.valueOf();
    });
    updateAttemptNo(learningHistoryTab);
    const randStrategy = getRandomizeStrategy(userFlashcard.learningHistory);
    const prevAnswers = filterLastAndUpdateAttemptNo(userFlashcard.learningHistory);
    userFlashcard.learningHistory = prevAnswers;
    userFlashcard.learningHistory.push(...learningHistoryTab);
    userFlashcard.type = "LEARNING";
    const udpatedUserFlashcard = await updateOrCreate(existingUserFlashcard, userFlashcard);

    return { randStrategy, prevAnswers, udpatedUserFlashcard };
}

async function updateOrCreate(existingUserFlashcard: any, userFlashcard: any) {
    let udpatedUserFlashcard;
    if (existingUserFlashcard) {
        udpatedUserFlashcard =
            (await UserFlashcard.findOneAndReplace({ _id: userFlashcard._id }, userFlashcard, { new: true })).toObject();
    }
    else {
        udpatedUserFlashcard =
            (await UserFlashcard.create(userFlashcard)).toObject();
    }
    return udpatedUserFlashcard;
}

function getCorrectCardIds(learningHistoryTab: any) {
    const correctCardsIds: any[] = []
    learningHistoryTab.forEach((element: any) => {
        if (element.isCorrect) {
            correctCardsIds.push(element.flashcardId);
        }
    });
    return correctCardsIds;
}

async function updateUserPoints(user: UserT, learningHistoryTab: any) {
    const correctCardsIds: any[] = getCorrectCardIds(learningHistoryTab);
    user.points += correctCardsIds.length;
    user.rang = findRangByPoints(user.points).id;
    const savedUser = await User.findOneAndReplace({ _id: user._id }, user, { new: true });
    return { user: savedUser.toObject(), newPoints: correctCardsIds.length };
}

