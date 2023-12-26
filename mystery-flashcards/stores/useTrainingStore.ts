import { FlashCardSetDto } from "@/dtos/FlashCardSetDto";
import { TrainingResultDto } from "@/dtos/TrainingResultDto";
import { AnswerT } from "@/models/Answer";
import { FlashcardT } from "@/models/Flashcard";
import { FlashcardSetT } from "@/models/FlashcardSet";
import { TestResultT } from "@/models/TestResult";
import { create } from "zustand";

type State = {
    flashcardSet: FlashCardSetDto,
    allAnswers: AnswerT[],
    roundAnswers: AnswerT[],
    result: TestResultT,
    allFlashcards: FlashcardT[],
    roundFlashcards: FlashcardT[],
    currentFlashcardIndexInRound: number,
    wasChecked: boolean,
    finalResult: TrainingResultDto,
    roundCount: number,
    view: "TRAINING" | "TEST" | "TRAINING_RESULT" | "TEST_RESULT",
    direction: string
}

type Action = {
    setFlashcardSet: (flashcardSet: FlashCardSetDto) => void,
    addToAllAnswers: (answer: AnswerT) => void,
    addToRoundAnswers: (answer: AnswerT) => void,
    resetRoundAnswers: () => void,
    updateResult: (result: TestResultT) => void,
    addToAllFlashcards: (flashcard: FlashcardT) => void,
    setRoundFlashcards: (flashcards: FlashcardT[]) => void,
    incrementCurrentFlashcardIndexInRound: () => void,
    resetCurrentFlashcardIndexInRound: () => void,
    onAnswerSave: (answer: AnswerT, flashcard: FlashcardT, result: any) => void,
    onNewRound: (flashcards: FlashcardT[]) => void,
    setWasChecked: (checked: boolean) => void,
    setFinalResult: (finalResult: TrainingResultDto) => void,
    setView: (view: any) => void,
    initStore: () => void,
    setDirection: (direction: string) => void
}

const initResult: () => TestResultT = () => ({
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
    setFlashcardSet: (flashcardSet: FlashCardSetDto) => set(() => ({ flashcardSet: flashcardSet })),
    addToAllAnswers: (answer: AnswerT) => set((state) => ({ allAnswers: [...state.allAnswers, answer] })),
    addToRoundAnswers: (answer: AnswerT) => set((state) => ({ roundAnswers: [...state.roundAnswers, answer] })),
    resetRoundAnswers: () => set(() => ({ roundAnswers: [] })),
    updateResult: (result: TestResultT) => set(() => ({ result: result })),
    addToAllFlashcards: (flashcard: FlashcardT) => set((state) => ({ allFlashcards: [...state.allFlashcards, flashcard] })),
    setRoundFlashcards: (flashcards: FlashcardT[]) => set(() => ({ roundFlashcards: flashcards })),
    incrementCurrentFlashcardIndexInRound: () => set((state) => ({ currentFlashcardIndexInRound: state.currentFlashcardIndexInRound + 1 })),
    resetCurrentFlashcardIndexInRound: () => set(() => ({ currentFlashcardIndexInRound: 0 })),
    onAnswerSave: (answer: AnswerT, flashcard: FlashcardT, result: TestResultT) => set((state) => {
        return {
            allAnswers: [...state.allAnswers, answer],
            roundAnswers: [...state.roundAnswers, answer],
            result: result,
            allFlashcards: [...state.allFlashcards, flashcard]
        }
    }),
    onNewRound: (flashcards: FlashcardT[]) => set((state) => {
        return {
            roundAnswers: [],
            currentFlashcardIndexInRound: 0,
            roundFlashcards: flashcards,
            roundCount: state.roundCount + 1
        }
    }),
    setWasChecked: (checked: boolean) => set(() => ({ wasChecked: checked })),
    setFinalResult: (finalResult: TrainingResultDto) => set(() => ({ finalResult: finalResult })),
    setView: (view) => set(() => ({ view: view })),
    initStore: () => set(initStore),
    setDirection: (direction) => set(() => ({ direction }))
}))

export default useTrainingStore;