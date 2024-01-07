import { UserT } from "@/models/User";
import { UserFlashcardT } from "@/models/UserFlashcard";

export interface TrainingResultDto {
    userWithPoints?: UserT,
    updatedUserFlashcard?: UserFlashcardT
    newPoints?: number
};
