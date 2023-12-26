export const LearnViewOptions = {
    TRAINING: "TRAINING",
    TEST: "TEST",
    TRAINING_RESULT: "TRAINING_RESULT",
    TEST_RESULT: "TEST_RESULT"

} as const;

export type LearnViewType = "TRAINING" | "TEST" | "TRAINING_RESULT" | "TEST_RESULT";