export const FlashcardSetSearchParams = {
    NAME: "name",
    LANG1: "lang1",
    LANG2: "lang2",
    LEVEL: "level",
    HASHTAGS: "hashtags",
    STATUS: "status"
} as const;

export type FlashcardSetSearchParamsType = "name" | "lang1" | "lang2" | "level" | "hashtags" | "status";