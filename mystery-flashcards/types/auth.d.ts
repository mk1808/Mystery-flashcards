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
    hashtags: string,
    flashcards: string,
    isPublic: string,
    lang1: string,
    lang2: string
}