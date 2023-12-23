
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