import { excludeFromArray, updateElement } from "@/utils/server/arrayUtils";
import { create } from "zustand";

type State = {
    sidebarForm: NewFlashcardSetForm,
    flashcardsList: FlashcardsForm[],
    sidebarFormValid: boolean,
    flashcardListInvalidCount: number,
    invalidCardsIndexes: any[]
}

type Action = {
    updateSidebarForm: (sidebar: any) => void,
    updateFlashcard: (flashcard: any) => void,
    addNewFlashcard: () => void,
    addEditedFlashcard: (flashcard: any) => void,
    deleteFlashcard: (flashcard: any) => void,
    setSidebarFormValid: (value: boolean) => void,
    flashcardListInvalidCountInc: () => void,
    flashcardListInvalidCountDec: () => void,
    addToInvalidCardsIndexes: (index: number) => void
}

const getInitailFlashcard = () => ({ _id: Math.floor(Math.random() * 1000_000), wordLang1: "", wordLang2: "", description1: "", description2: "" })

const useNewFlashcardSetStore = create<State & Action>((set) => ({
    sidebarForm: {
        name: "",
        level: "",
        hashtags: "",
        flashcards: "",
        isPublic: "",
        lang1: "",
        lang2: ""
    },
    invalidCardsIndexes: [],
    flashcardsList: [getInitailFlashcard()],
    sidebarFormValid: false,
    flashcardListInvalidCount: 0,
    updateSidebarForm: (sidebarForm) => set(() => ({ sidebarForm: sidebarForm })),
    updateFlashcard: (flashcard) => set((state) => ({ flashcardsList: [...updateElement(state.flashcardsList, flashcard)] })),
    addNewFlashcard: () => set((state) => ({ flashcardsList: [...state.flashcardsList, getInitailFlashcard()] })),
    addEditedFlashcard: (flashcard) => set((state) => ({ flashcardsList: [...state.flashcardsList, flashcard] })),
    deleteFlashcard: (flashcard) => set((state) => ({ flashcardsList: [...excludeFromArray(state.flashcardsList, flashcard)] })),
    setSidebarFormValid: (value) => set(() => ({ sidebarFormValid: value })),
    flashcardListInvalidCountInc: () => set((state) => ({ flashcardListInvalidCount: state.flashcardListInvalidCount + 1 })),
    flashcardListInvalidCountDec: () => set((state) => ({ flashcardListInvalidCount: state.flashcardListInvalidCount - 1 })),
    addToInvalidCardsIndexes: (index) => set((state) => ({ invalidCardsIndexes: [...state.invalidCardsIndexes, index] }))
}))

export default useNewFlashcardSetStore;