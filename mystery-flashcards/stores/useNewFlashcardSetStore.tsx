import { create } from "zustand";

type State = {
    sidebarForm: NewFlashcardSetForm,
    flashcardsList: FlashcardsForm[]
}

type Action = {
    updateSidebarForm: (firstName: State['sidebarForm']) => void,
    updateFlashcard: (flashcard: any) => void,
    addFlashcard:() => void,
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
    updateSidebarForm: (sidebarForm) => set(() => ({ sidebarForm: sidebarForm })),
    updateFlashcard:(flashcardsList)=>set(() => ({ flashcardsList: flashcardsList })),
    addFlashcard:()=>set((state) => ({ flashcardsList: [...state.flashcardsList, getInitailFlashcard() ] })),

}))

export default useNewFlashcardSetStore;