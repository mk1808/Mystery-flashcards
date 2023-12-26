import { StatusType } from "@/enums/StatusOptions";
import TestResult, { TestResultT } from "@/models/TestResult";
import User, { UserT } from "@/models/User";
import UserFlashcard, { UserFlashcardT } from "@/models/UserFlashcard";
import { findRangByPoints } from "@/utils/server/userRangUtils";

export async function saveTestResult(flashcardSetId: string, newResults: TestResultT, currentUser: UserT): Promise<TestResultT> {
    let testResult: TestResultT = (await TestResult.findOne({ userId: currentUser._id, flashcardSetId: flashcardSetId }))?.toObject();
    newResults.userId = currentUser._id;
    if (testResult) {
        return (await TestResult.findOneAndReplace({ _id: testResult._id }, newResults, { new: true }))!;
    }
    return await TestResult.create(newResults);
}

export async function updateUserFlashcard(flashcardSetId: string, currentUser: UserT): Promise<UserFlashcardT> {
    const existingUserFlashcard: UserFlashcardT = (await UserFlashcard.findOne({ flashcardSetId: flashcardSetId, userId: currentUser._id }))?.toObject()
    if (existingUserFlashcard) {
        existingUserFlashcard.type = StatusType.TESTING;
        return (await UserFlashcard.findOneAndReplace({ _id: existingUserFlashcard._id }, existingUserFlashcard, { new: true }))!;
    }
    const newUserFlashCard = {
        userId: currentUser._id,
        flashcardSetId: flashcardSetId,
        learningHistory: [],
        type: StatusType.TESTING
    }
    return await UserFlashcard.create(newUserFlashCard);
}

export async function updateUser(currentUser: UserT, points: number): Promise<UserT> {
    currentUser.points += points;
    currentUser.rang = findRangByPoints(currentUser.points).id;
    return (await User.findOneAndReplace({ _id: currentUser._id }, currentUser, { new: true }))!;
}