import { excludeFromArray, updateElement } from "@/utils/server/arrayUtils";
import { create } from "zustand";

type State = {
    sidebarForm: NewFlashcardSetForm,
    flashcardsList: FlashcardsForm[],
    sidebarFormValid:boolean,
    flashcardListInvalidCount:number
}

type Action = {
    updateSidebarForm: (sidebar: any) => void,
    updateFlashcard: (flashcard: any) => void,
    addFlashcard: () => void,
    deleteFlashcard: (flashcard: any) => void,
    setSidebarFormValid: (value: boolean) => void,
    flashcardListInvalidCountInc: () => void,
    flashcardListInvalidCountDec: () => void
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
    flashcardsList: [getInitailFlashcard()],
    sidebarFormValid:false,
    flashcardListInvalidCount: 0,
    updateSidebarForm: (sidebarForm) => set(() => ({ sidebarForm: sidebarForm })),
    updateFlashcard: (flashcard) => set((state) => ({ flashcardsList: [...updateElement(state.flashcardsList, flashcard)] })),
    addFlashcard: () => set((state) => ({ flashcardsList: [...state.flashcardsList, getInitailFlashcard()] })),
    deleteFlashcard: (flashcard) => set((state) => ({ flashcardsList: [...excludeFromArray(state.flashcardsList, flashcard)] })),
    setSidebarFormValid: (value) => set(()=>({sidebarFormValid: value})),
    flashcardListInvalidCountInc: () => set((state) => ({ flashcardListInvalidCount: state.flashcardListInvalidCount + 1 })),
    flashcardListInvalidCountDec: () => set((state) => ({ flashcardListInvalidCount: state.flashcardListInvalidCount - 1 })),
}))

export default useNewFlashcardSetStore;