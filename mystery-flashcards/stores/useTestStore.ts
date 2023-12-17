import { AnswerT } from "@/models/Answer";
import { FlashcardT } from "@/models/Flashcard";
import { create } from "zustand";

type State = {
    flashcardSet: FlashCardSetDto,
    testAnswers: AnswerT[],
    testFlashcards: FlashcardT[],
    currentFlashcardIndex: number,
    finalResult: any
}

type Action = {
    setFlashcardSet: (flashcardSet: any) => void,
    onAnswerSave: (answer: AnswerT) => void,
    setTestFlashcards: (flashcards: FlashcardT[]) => void,
    incrementCurrentFlashcardIndex: () => void,
    setFinalResult: (finalResult: any) => void
}

const useTestStore = create<State & Action>((set) => ({
    flashcardSet: {},
    testAnswers: [],
    testFlashcards: [],
    currentFlashcardIndex: 0,
    finalResult: {},
    setFlashcardSet: (flashcardSet) => set(() => ({ flashcardSet: flashcardSet })),
    onAnswerSave: (answer) => set((state) => ({ testAnswers: [...state.testAnswers, answer] })),
    setTestFlashcards: (flashcards: FlashcardT[]) => set(() => ({ testFlashcards: flashcards })),
    incrementCurrentFlashcardIndex: () => set((state) => ({ currentFlashcardIndex: state.currentFlashcardIndex + 1 })),
    setFinalResult: (finalResult) => set(() => ({ finalResult: finalResult })),
}))

export default useTestStore;