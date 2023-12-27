import { AnswerAttempt, AnswerAttemptType } from "@/enums/CommonEnums";
import { StatusOptions, StatusType } from "@/enums/StatusOptions";
import { AnswerT } from "@/models/Answer";
import { FlashcardT } from "@/models/Flashcard";
import User, { UserT } from "@/models/User";
import UserFlashcard, { UserFlashcardT } from "@/models/UserFlashcard";
import { shouldArrayContain, shuffleArray } from "@/utils/server/arrayUtils";
import { findRangByPoints } from "@/utils/server/userRangUtils";

export async function getUserFlashcard(currentUser: UserT, flashcardSetId: string): Promise<UserFlashcardT> {
    const existingUserFlashcard = (await UserFlashcard.findOne({ flashcardSetId: flashcardSetId, userId: currentUser._id }))?.toObject();
    if (existingUserFlashcard) {
        return existingUserFlashcard
    }
    const newUserFlashcard = { userId: currentUser._id, flashcardSetId: flashcardSetId, learningHistory: [], type: StatusType.LEARNING };
    return (await UserFlashcard.create(newUserFlashcard)).toObject()
}

export async function saveUserFlashcard(userFlashcard: UserFlashcardT) {
    await UserFlashcard.findOneAndReplace({ _id: userFlashcard._id }, userFlashcard, { new: true })
}

export function updateUserFlashcardType(userFlashcard: UserFlashcardT) {
    userFlashcard.type = StatusType.LEARNING;
}

export function mergeUserAnswers(userFlashcard: UserFlashcardT, lastAnswers: AnswerT[]) {
    updateAttempt(lastAnswers, AnswerAttempt.LAST);
    const prevAnswers = getAnswersByAttempt(userFlashcard.learningHistory!, AnswerAttempt.LAST)
    updateAttempt(prevAnswers, AnswerAttempt.PREV);
    userFlashcard.learningHistory = [...prevAnswers, ...lastAnswers];
}

export function getRandomizeStrategy(existingAnswers: AnswerT[]) {
    if (existingAnswers.length === 0) {
        return newLearningRandomizeStrategy;
    }

    return nextRoundRandomizeStrategy;
}

function newLearningRandomizeStrategy(flashcards: FlashcardT[]) {
    const allFlashcards = [...flashcards]
    shuffleArray(allFlashcards)
    return allFlashcards;
}

function nextRoundRandomizeStrategy(flashcards: FlashcardT[], userLearningHistory: AnswerT[]) {
    const wrongAnswersMap = getWrongAnswersMap(flashcards, userLearningHistory);
    return getNextRoundFlashcards(flashcards, wrongAnswersMap);
}


function getWrongAnswersMap(flashcards: FlashcardT[], userLearningHistory: AnswerT[]) {
    const wrongAnswersMap: any = {}
    flashcards.forEach((flashcard) => {
        const answers = filterFlashcardAnswers(flashcard, userLearningHistory);
        wrongAnswersMap[flashcard._id!] = getWrongAnswers(answers).length;
    })
    return wrongAnswersMap;
}

function filterFlashcardAnswers(flashcard: FlashcardT, answers: AnswerT[]) {
    return answers.filter(answer => answer.flashcardId?.toString() === flashcard._id?.toString());
}

function getWrongAnswers(answers: AnswerT[]) {
    return answers.filter(answer => !answer.isCorrect);
}

function getNextRoundFlashcards(flashcards: FlashcardT[], wrongAnswersMap: any) {
    const results: FlashcardT[] = [];
    flashcards.forEach(flashcard => {
        if (wrongAnswersMap[flashcard._id!] == 0) {
            onAllCorrectAnswers(results, flashcard);
        } else if (wrongAnswersMap[flashcard._id!] == 1) {
            onOneWrongAnswer(results, flashcard);
        } else {
            onAllWrongAnswers(results, flashcard);
        }
    })
    return results;
}

function onAllCorrectAnswers(results: FlashcardT[], flashcard: FlashcardT) {
    if (shouldArrayContain()) {
        results.push(flashcard);
    }
}

function onOneWrongAnswer(results: FlashcardT[], flashcard: FlashcardT) {
    results.push(flashcard);
}

function onAllWrongAnswers(results: FlashcardT[], flashcard: FlashcardT) {
    results.push(flashcard);
    results.push(flashcard);
}

function updateAttempt(answers: AnswerT[], attempt: AnswerAttemptType) {
    answers?.forEach(answer => {
        answer.attempt = attempt;
    });
}

function getAnswersByAttempt(answers: AnswerT[], attempt: AnswerAttemptType) {
    return answers.filter(answer => answer.attempt === attempt);
}

export async function updateUserPoints(user: UserT, lastAnswers: AnswerT[]) {
    const correct: AnswerT[] = getCorrectAnswers(lastAnswers);
    user.points += correct.length;
    user.rang = findRangByPoints(user.points).id;

    await User.findOneAndReplace({ _id: user._id }, user, { new: true });
    return correct.length;
}

function getCorrectAnswers(answers: AnswerT[]) {
    return answers.filter(answer => answer.isCorrect);
}