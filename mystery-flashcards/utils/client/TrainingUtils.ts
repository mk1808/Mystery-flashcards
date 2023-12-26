import { AnswerT } from "@/models/Answer";
import { FlashcardT } from "@/models/Flashcard";
import { TestResultT } from "@/models/TestResult";
import { getAllIndexes } from "../server/arrayUtils";
import { getPercentDisplay } from "./MathUtils";

export const updateAnswer = (answerForm: AnswerForm, flashcard: any, isValid: boolean): AnswerT => ({
    flashcardId: flashcard._id,
    isCorrect: isValid,
    givenAnswer: answerForm.givenAnswer
})

export const updateResult = (answer: AnswerT, result: TestResultT) => {
    result.answers?.push(answer);
    result.allCount! += 1;
    result.validCount = answer.isCorrect ? result.validCount! + 1 : result.validCount;
    if (result.validCount != 0 && result.allCount != 0) {
        result.resultPercent = Number((result.validCount! / result.allCount!).toFixed(2));
    }
    return result;
}

export const checkValidity = (flashcard: FlashcardT, answer: AnswerForm, direction: string) => {
    const word = direction === "main" ? flashcard.wordLang2 : flashcard.wordLang1;
    return word?.toLowerCase() == answer.givenAnswer.toLowerCase();
}

export const getMainButtonAttrs = (wasChecked: boolean, dictionary: any): ButtonAttrs => {
    const commonAttrs = { form: "answerForm" },
        title = wasChecked ? dictionary.common.continue : dictionary.common.confirmAnswer;
    return { ...commonAttrs, title: title, type: "submit" }
}

const getResults = (userAnswers: [], userAnswersValidity: []) => {
    const allAnswersNumber = userAnswers.length,
        correctAnswersNumber = userAnswersValidity.filter((ans: any) => ans).length,
        percent = getPercentDisplay(correctAnswersNumber, allAnswersNumber);
    return { allAnswersNumber, correctAnswersNumber, percent };
}

export function createTestResult(allAnswers: AnswerT[], allFlashcards: FlashcardT[]) {
    const flashcardsIds = allFlashcards.map((card: any) => card._id),
        uniqueIds = [...new Set(flashcardsIds)],
        allInfoObjects: any = [];

    uniqueIds.forEach((id: any) => {
        const indexes = getAllIndexes(flashcardsIds, id),
            firstId = indexes[0],
            flashcard = allFlashcards[firstId],
            answers: any = [],
            userAnswers: any = [],
            userAnswersValidity: any = [];
        indexes.forEach((id: any) => {
            const currentAnswer = allAnswers[id]
            answers.push(currentAnswer);
            userAnswers.push(currentAnswer.givenAnswer);
            userAnswersValidity.push(currentAnswer.isCorrect)
        })
        const results = getResults(userAnswers, userAnswersValidity);
        allInfoObjects.push({ id: firstId, flashcard, answers, userAnswers, ...results })
    })
    return allInfoObjects;
}
