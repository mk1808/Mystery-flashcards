import { FlashcardSetT } from "@/models/FlashcardSet";
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
    deleteAllFlashcards: () => void,
    setSidebarFormValid: (value: boolean) => void,
    flashcardListInvalidCountInc: () => void,
    flashcardListInvalidCountDec: () => void,
    addToInvalidCardsIndexes: (index: number) => void,
    resetState: () => void,
    initState: (flashcardSet: FlashcardSetT) => void
}

const getInitialFlashcard = () => ({ _id: Math.floor(Math.random() * 1000_000), wordLang1: "", wordLang2: "", description1: "", description2: "" })

const initState = () => ({
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
    flashcardsList: [getInitialFlashcard()],
    sidebarFormValid: false,
    flashcardListInvalidCount: 0,
})

const initStateByFlashcard = (flashcardSet: FlashcardSetT): any => ({
    ...initState(),
    sidebarForm: {
        name: flashcardSet.name,
        lang1: flashcardSet.lang1,
        lang2: flashcardSet.lang2,
        level: flashcardSet.level,
        hashtags: flashcardSet.hashtags,
        isPublic: flashcardSet.isPublic,
    },
    flashcardsList: [
        ...flashcardSet.flashcards!,
        getInitialFlashcard()
    ]
})

const useNewFlashcardSetStore = create<State & Action>((set) => ({
    ...initState(),
    updateSidebarForm: (sidebarForm) => set(() => ({ sidebarForm: sidebarForm })),
    updateFlashcard: (flashcard) => set((state) => ({ flashcardsList: [...updateElement(state.flashcardsList, flashcard)] })),
    addNewFlashcard: () => set((state) => ({ flashcardsList: [...state.flashcardsList, getInitialFlashcard()] })),
    addEditedFlashcard: (flashcard) => set((state) => ({ flashcardsList: [...state.flashcardsList, flashcard] })),
    deleteFlashcard: (flashcard) => set((state) => ({ flashcardsList: [...excludeFromArray(state.flashcardsList, flashcard)] })),
    deleteAllFlashcards: () => set((state) => ({ flashcardsList: [getInitialFlashcard()] })),
    setSidebarFormValid: (value) => set(() => ({ sidebarFormValid: value })),
    flashcardListInvalidCountInc: () => set((state) => ({ flashcardListInvalidCount: state.flashcardListInvalidCount + 1 })),
    flashcardListInvalidCountDec: () => set((state) => ({ flashcardListInvalidCount: state.flashcardListInvalidCount - 1 })),
    addToInvalidCardsIndexes: (index) => set((state) => ({ invalidCardsIndexes: [...state.invalidCardsIndexes, index] })),
    resetState: () => set(() => ({ ...initState() })),
    initState: (flashcard) => set(() => initStateByFlashcard(flashcard))
}))

export default useNewFlashcardSetStore;