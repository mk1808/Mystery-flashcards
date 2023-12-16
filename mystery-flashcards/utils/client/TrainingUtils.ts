import { AnswerT } from "@/models/Answer";
import { FlashcardT } from "@/models/Flashcard";
import { TestResultT } from "@/models/TestResult";

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

export const checkValidity = (flashcard: FlashcardT, answer: AnswerForm) => {
    return flashcard.wordLang2?.toLowerCase() == answer.givenAnswer.toLowerCase();
}

export const getMainButtonAttrs = (wasChecked: Boolean): ButtonAttrs => {
    const commonAttrs = { form: "answerForm" }
    const title = wasChecked?"Kontynuuj":"Zatwierdź odpowiedź";
    return { ...commonAttrs, title: title, type: "submit" }
}
