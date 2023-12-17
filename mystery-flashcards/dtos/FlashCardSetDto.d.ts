import { FlashcardSetT } from "@/models/FlashcardSet";
import { TestResultT } from "@/models/TestResult";
import { UserFlashcardT } from "@/models/UserFlashcard";

interface FlashCardSetDto {
    flashcardSet?: FlashcardSetT,
    userFlashcard?: UserFlashcardT,
    testResult?: TestResultT
}