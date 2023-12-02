import { AnswerT } from "@/models/Answer";
import { FlashcardSetT } from "@/models/FlashcardSet";
import { TestResultT } from "@/models/TestResult";

export function checkAnswers(flashCardSet: FlashcardSetT, answers: AnswerT[]): TestResultT {
    const allCount = flashCardSet.flashcards?.length || 0;
    let validCount = 0;
    const missing: AnswerT[] = [];
    flashCardSet.flashcards?.forEach(fc => {
        const matchedAnswer = answers.filter(answer => answer.flashcardId == fc._id)[0]
        if (matchedAnswer) {
            matchedAnswer.isCorrect = matchedAnswer.givenAnswer == fc.wordLang2
            matchedAnswer.flashcard = fc;
            if (matchedAnswer.isCorrect) {
                validCount++
            }
        } else {
            missing.push({
                flashcardId: fc._id,
                givenAnswer: "-",
                isCorrect: false,
                flashcard: fc
            })
        }
    });
    return {
        allCount: allCount,
        answers: [...answers, ...missing],
        flashcardSetId: flashCardSet._id,
        resultPercent: (validCount * 100.0 / allCount),
        validCount: validCount,
    }
}