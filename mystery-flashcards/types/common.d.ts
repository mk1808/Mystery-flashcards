
interface Alert {
    key?: any,
    title: string,
    type: string
}

interface FlashcardSearchDto {
    name?: string,
    level?: string,
    lang1?: string,
    lang2?: string,
    hashtags?: string[],
    status?: string[]
}

interface Option {
    value: any,
    label: string
}

interface Dictionary {
    common?: any,
    userRanges?: any,
    langOptions?: any,
    levelOptions?: any,
    statusOptions?: any
}

interface Step {
    icon?: any,
    title?: any,
    description?: any
}

interface StepType {
    number: string,
    text: string
}