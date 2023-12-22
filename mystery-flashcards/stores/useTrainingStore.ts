import { FlashCardSetDto } from "@/dtos/FlashCardSetDto";
import { AnswerT } from "@/models/Answer";
import { FlashcardT } from "@/models/Flashcard";
import { FlashcardSetT } from "@/models/FlashcardSet";
import { TestResultT } from "@/models/TestResult";
import { create } from "zustand";

type State = {
    flashcardSet: FlashCardSetDto,
    allAnswers: AnswerT[],
    roundAnswers: AnswerT[],
    result: any,
    allFlashcards: FlashcardT[],
    roundFlashcards: FlashcardT[],
    currentFlashcardIndexInRound: number,
    wasChecked: boolean,
    finalResult: any,
    roundCount: number,
    view: "TRAINING" | "TEST" | "TRAINING_RESULT" | "TEST_RESULT",
    direction: string
}

type Action = {
    setFlashcardSet: (flashcardSet: any) => void,
    addToAllAnswers: (answer: any) => void,
    addToRoundAnswers: (answer: any) => void,
    resetRoundAnswers: () => void,
    updateResult: (result: any) => void,
    addToAllFlashcards: (flashcard: any) => void,
    setRoundFlashcards: (flashcards: []) => void,
    incrementCurrentFlashcardIndexInRound: () => void,
    resetCurrentFlashcardIndexInRound: () => void,
    onAnswerSave: (answer: any, flashcard: any, result: any) => void,
    onNewRound: (flashcards: []) => void,
    setWasChecked: (checked: boolean) => void,
    setFinalResult: (finalResult: any) => void,
    setView: (view: any) => void,
    initStore: () => void,
    setDirection: (direction: string) => void
}

const initResult = () => ({
    _id: "",
    userId: "",
    flashcardSetId: "",
    resultPercent: 0,
    validCount: 0,
    allCount: 0,
    answers: [],
    direction: ""
})

const initStore = () => ({
    allAnswers: [],
    roundAnswers: [],
    result: initResult(),
    allFlashcards: [],
    currentFlashcardIndexInRound: 0,
    wasChecked: false,
    finalResult: {},
    roundCount: 1,
})

const useTrainingStore = create<State & Action>((set) => ({
    ...initStore(),
    flashcardSet: {},
    roundFlashcards: [],
    view: "TRAINING",
    direction: "main",
    setFlashcardSet: (flashcardSet) => set(() => ({ flashcardSet: flashcardSet })),
    addToAllAnswers: (answer) => set((state) => ({ allAnswers: [...state.allAnswers, answer] })),
    addToRoundAnswers: (answer) => set((state) => ({ roundAnswers: [...state.roundAnswers, answer] })),
    resetRoundAnswers: () => set(() => ({ roundAnswers: [] })),
    updateResult: (result) => set(() => ({ result: result })),
    addToAllFlashcards: (flashcard) => set((state) => ({ allFlashcards: [...state.allFlashcards, flashcard] })),
    setRoundFlashcards: (flashcards) => set(() => ({ roundFlashcards: flashcards })),
    incrementCurrentFlashcardIndexInRound: () => set((state) => ({ currentFlashcardIndexInRound: state.currentFlashcardIndexInRound + 1 })),
    resetCurrentFlashcardIndexInRound: () => set(() => ({ currentFlashcardIndexInRound: 0 })),
    onAnswerSave: (answer, flashcard, result) => set((state) => {
        return {
            allAnswers: [...state.allAnswers, answer],
            roundAnswers: [...state.roundAnswers, answer],
            result: result,
            allFlashcards: [...state.allFlashcards, flashcard]
        }
    }),
    onNewRound: (flashcards) => set((state) => {
        return {
            roundAnswers: [],
            currentFlashcardIndexInRound: 0,
            roundFlashcards: flashcards,
            roundCount: state.roundCount + 1
        }
    }),
    setWasChecked: (checked) => set(() => ({ wasChecked: checked })),
    setFinalResult: (finalResult) => set(() => ({ finalResult: finalResult })),
    setView: (view) => set(() => ({ view: view })),
    initStore: () => set(initStore),
    setDirection: (direction) => set(() => ({ direction }))
}))

export default useTrainingStore;