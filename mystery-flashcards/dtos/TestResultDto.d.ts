import { UserRang } from "@/enums/UserRang";
import { TestResultT } from "@/models/TestResult";

interface TestResultDto {
    testResults?: TestResultT,
    gainPoints?: number,
    currentPoints?: number,
    currentRang?: UserRang,
    nextRang?: UserRang
}