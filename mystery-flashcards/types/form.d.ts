interface LoginForm {
    name: string,
    password: string
}

interface RegisterForm {
    name: string,
    mail: string,
    password: string,
    confirmPassword: string
}

interface NewFlashcardSetForm {
    name: string,
    level: string,
    hashtags: string[],
    flashcards: string,
    isPublic: boolean,
    lang1: string,
    lang2: string
}

interface FlashcardsForm {
    wordLang1: string,
    wordLang2: string,
    description1: string,
    description2: string,
    _id: any
}

interface AnswerForm {
    givenAnswer: string,
    isCorrect: boolean,
    flashcardId: any
}

interface ChooseLearnTypeForm {
    type: "TRAINING" | "TEST",
    direction: string
}

interface ButtonAttrs {
    title: string,
    type?: "submit" | "reset" | "button" | undefined,
    form?: string,
    onClick?: any
}

interface MainAndOtherButton {
    mainButtonAttrs: ButtonAttrs,
    otherButtonAttrs: ButtonAttrs
}