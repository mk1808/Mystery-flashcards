import { AnswerT } from "@/models/Answer";
import { FlashcardT } from "@/models/Flashcard";
import { TestResultT } from "@/models/TestResult";
import { getAllIndexes } from "../server/arrayUtils";
import { getPercentDisplay } from "./MathUtils";
import { DirectionOptions, DirectionType } from "@/enums/DirectionOptions";

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

export const checkValidity = (flashcard: FlashcardT, answer: AnswerForm, direction: DirectionType) => {
    const word = direction === DirectionOptions.MAIN ? flashcard.wordLang2 : flashcard.wordLang1;
    return word?.toLowerCase() == answer.givenAnswer.toLowerCase();
}

export const getUpdatedAnswerInfo = (currentFlashcard: FlashcardT, answer: AnswerForm, direction: DirectionType, result: TestResultT) => {
    const isValid = checkValidity(currentFlashcard, answer, direction),
        updatedAnswer = updateAnswer(answer, currentFlashcard, isValid),
        updatedResult = updateResult(updatedAnswer, result);
    return { isValid, updatedAnswer, updatedResult }
}

export const getMainButtonAttrs = (wasChecked: boolean, dictionary: any): ButtonAttrs => {
    const commonAttrs = { form: "answerForm" },
        title = wasChecked ? dictionary.common.continue : dictionary.common.confirmAnswer;
    return { ...commonAttrs, title: title, type: "submit" }
}

const getResults = (userAnswers: (string | undefined)[], userAnswersValidity: boolean[]) => {
    const allAnswersNumber = userAnswers.length,
        correctAnswersNumber = userAnswersValidity.filter((ans: any) => ans).length,
        percent = getPercentDisplay(correctAnswersNumber, allAnswersNumber);
    return { allAnswersNumber, correctAnswersNumber, percent };
}

export function createTrainingResult(allAnswers: AnswerT[], allFlashcards: FlashcardT[]):TrainingResultForCard[] {
    const flashcardsIds = allFlashcards.map((card: any) => card._id),
        uniqueIds = [...new Set(flashcardsIds)],
        allInfoObjects: any = [];

    uniqueIds.forEach((id: any) => {
        const indexes = getAllIndexes(flashcardsIds, id),
            firstId = indexes[0],
            flashcard = allFlashcards[firstId],
            answers: any = [],
            userAnswers: (string | undefined)[] = [],
            userAnswersValidity: boolean[] = [];
        indexes.forEach((id: any) => {
            const currentAnswer = allAnswers[id];
            answers.push(currentAnswer);
            userAnswers.push(currentAnswer.givenAnswer);
            userAnswersValidity.push(!!currentAnswer.isCorrect);
        })
        const results = getResults(userAnswers, userAnswersValidity);
        allInfoObjects.push({ id: firstId, flashcard, answers, userAnswers, ...results })
    })
    return allInfoObjects;
}

export const getLangsDirection = (lang1: string | undefined, lang2: string | undefined) => `${lang1 ?? ""} -> ${lang2 ?? ""}`