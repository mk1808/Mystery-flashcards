import { UserFlashcardT } from "@/models/UserFlashcard";

export interface TrainingResultDto {
    userWithPoints?: any,
    udpatedUserFlashcard?: UserFlashcardT
    newPoints?: any
};
