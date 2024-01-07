import { DirectionOptions } from "@/enums/DirectionOptions";
import { AnswerT } from "@/models/Answer";
import { FlashcardT } from "@/models/Flashcard";
import { FlashcardSetT } from "@/models/FlashcardSet";
import { TestResultT } from "@/models/TestResult";

export function checkAnswers(flashCardSet: FlashcardSetT, test: TestResultT): TestResultT {
    const allCount = flashCardSet.flashcards?.length || 0;
    let validCount = { value:0 };
    const missing: AnswerT[] = [];
    flashCardSet.flashcards?.forEach((fc) => checkSingleFlashcard(fc, missing, test, validCount));
    return {
        allCount: allCount,
        answers: [...test.answers!, ...missing],
        flashcardSetId: flashCardSet._id,
        resultPercent: (validCount.value * 100.0 / allCount),
        validCount: validCount.value,
        direction: test.direction
    }

    function checkSingleFlashcard(fc: FlashcardT, missing: AnswerT[], test: TestResultT, validCount: { value:number }) {
        const matchedAnswer = test.answers!.filter(answer => answer.flashcardId  == fc._id?.toString())[0]
        if (matchedAnswer) {
            matchedAnswer.isCorrect = test.direction === DirectionOptions.MAIN ? matchedAnswer.givenAnswer == fc.wordLang2 : matchedAnswer.givenAnswer == fc.wordLang1;
            matchedAnswer.flashcard = fc;
            if (matchedAnswer.isCorrect) {
                validCount.value++
            }
        } else {
            missing.push({
                flashcardId: fc._id,
                givenAnswer: "-",
                isCorrect: false,
                flashcard: fc
            })
        }
    }
}