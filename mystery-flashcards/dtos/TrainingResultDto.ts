import { UserFlashcardT } from "@/models/UserFlashcard";

export interface TrainingResultDto {
    userWithPoints?: any,
    updatedUserFlashcard?: UserFlashcardT
    newPoints?: any
};
