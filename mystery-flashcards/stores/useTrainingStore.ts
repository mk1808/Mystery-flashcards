import { AnswerT } from "@/models/Answer";
import { FlashcardT } from "@/models/Flashcard";
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
    wasChecked: boolean
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
    setWasChecked: (checked: boolean) => void
}

const initResult = () => {
    return {
        _id: "",
        userId: "",
        flashcardSetId: "",
        resultPercent: 0,
        validCount: 0,
        allCount: 0,
        answers: [],
        direction: ""
    }
}

const useTrainingStore = create<State & Action>((set) => ({
    flashcardSet: {},
    allAnswers: [],
    roundAnswers: [],
    result: initResult(),
    allFlashcards: [],
    roundFlashcards: [],
    currentFlashcardIndexInRound: 0,
    wasChecked: false,
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
        state.addToAllAnswers(answer);
        state.addToRoundAnswers(answer);
        state.updateResult(result);
        state.addToAllFlashcards(flashcard);
        return state;
    }),
    setWasChecked: (checked) => set(() => ({ wasChecked: checked }))

}))

export default useTrainingStore;