export const StatusType = {
    MINE: "mine",
    FAVORITE: "favorite",
    WANT_TO_LEARN: "WANT_TO_LEARN",
    LEARNING: "LEARNING",
    TESTING: "TESTING"
} as const;

export const StatusOptions: Option[] = [
    { value: StatusType.MINE, label: "statusOptions.mine" },
    { value: StatusType.FAVORITE, label: "statusOptions.favorite" },
    { value: StatusType.WANT_TO_LEARN, label: "statusOptions.wantToLearn" },
    { value: StatusType.LEARNING, label: "statusOptions.learning" },
    { value: StatusType.TESTING, label: "statusOptions.testing" }
];