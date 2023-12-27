import { FlashCardSetDto } from "@/dtos/FlashCardSetDto";
import { TestResultDto } from "@/dtos/TestResultDto";
import { DirectionType } from "@/enums/DirectionOptions";
import { AnswerT } from "@/models/Answer";
import { FlashcardT } from "@/models/Flashcard";
import { create } from "zustand";

type State = {
    flashcardSet: FlashCardSetDto,
    testAnswers: AnswerT[],
    testFlashcards: FlashcardT[],
    currentFlashcardIndex: number,
    finalResult: TestResultDto,
    direction: DirectionType
}

type Action = {
    setFlashcardSet: (flashcardSet: FlashCardSetDto) => void,
    onAnswerSave: (answer: AnswerT) => void,
    setTestFlashcards: (flashcards: FlashcardT[]) => void,
    incrementCurrentFlashcardIndex: () => void,
    setFinalResult: (finalResult: TestResultDto) => void,
    initStore: () => void,
    setDirection: (direction: DirectionType) => void
}

const initStore = () => ({
    testAnswers: [],
    currentFlashcardIndex: 0,
    finalResult: {},
})

const useTestStore = create<State & Action>((set) => ({
    flashcardSet: {},
    testFlashcards: [],
    direction: "main",
    ...initStore(),
    setFlashcardSet: (flashcardSet) => set(() => ({ flashcardSet: flashcardSet })),
    onAnswerSave: (answer) => set((state) => ({ testAnswers: [...state.testAnswers, answer] })),
    setTestFlashcards: (flashcards: FlashcardT[]) => set(() => ({ testFlashcards: flashcards })),
    incrementCurrentFlashcardIndex: () => set((state) => ({ currentFlashcardIndex: state.currentFlashcardIndex + 1 })),
    setFinalResult: (finalResult: TestResultDto) => set(() => ({ finalResult: finalResult })),
    initStore: () => set(initStore),
    setDirection: (direction) => set(() => ({ direction }))
}))

export default useTestStore;