import { AnswerT } from "@/models/Answer";
import { FlashcardT } from "@/models/Flashcard";
import { TestResultT } from "@/models/TestResult";
import { getAllIndexes } from "../server/arrayUtils";
import { getPercentDisplay } from "./MathUtils";

export const updateAnswer = (answerForm: AnswerForm, flashcard: any, isValid: boolean) => {
    const answer: AnswerT = {
        flashcardId: flashcard._id,
        isCorrect: isValid,
        givenAnswer: answerForm.givenAnswer
    }
    //   console.log(answer)
    return answer;
}

export const updateResult = (answer: AnswerT, result: TestResultT) => {
    result.answers?.push(answer);
    result.allCount! += 1;
    result.validCount = answer.isCorrect ? result.validCount! + 1 : result.validCount;
    if (result.validCount != 0 && result.allCount != 0) {
        result.resultPercent = Number((result.validCount! / result.allCount!).toFixed(2));
    }

    //  console.log(result)
    return result;
}

export const checkValidity = (flashcard: FlashcardT, answer: AnswerForm, direction: string) => {
    const word = direction === "main" ? flashcard.wordLang2 : flashcard.wordLang1;
    return word?.toLowerCase() == answer.givenAnswer.toLowerCase();
}

export const getMainButtonAttrs = (wasChecked: Boolean): ButtonAttrs => {
    const commonAttrs = { form: "answerForm" }
    const title = wasChecked ? "Kontynuuj" : "Zatwierdź odpowiedź";
    return { ...commonAttrs, title: title, type: "submit" }
}

export const createTestResult = (allAnswers: any[], allFlashcards: any[]) => {
    const flashcardsIds = allFlashcards.map((card: any) => card._id),
        uniqueIds = [...new Set(flashcardsIds)],
        allInfoObjects: any = [];


    uniqueIds.forEach((id: any) => {
        const indexes = getAllIndexes(flashcardsIds, id);
        const firstId = indexes[0];
        const flashcard = allFlashcards[firstId];
        const answers: any = [];
        const userAnswers: any = [];
        const userAnswersValidity: any = [];
        indexes.forEach((id: any) => {
            const currentAnswer = allAnswers[id]
            answers.push(currentAnswer);
            userAnswers.push(currentAnswer.givenAnswer);
            userAnswersValidity.push(currentAnswer.isCorrect)
        })
        const allAnswersNumber = userAnswers.length,
            correctAnswersNumber = userAnswersValidity.filter((ans: any) => ans == true).length,
            percent = getPercentDisplay(correctAnswersNumber, allAnswersNumber);
        allInfoObjects.push({ id: firstId, flashcard, answers, userAnswers, allAnswersNumber, correctAnswersNumber, percent })
    })
    return allInfoObjects;
}
