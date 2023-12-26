import { StatusType } from "@/enums/StatusOptions";
import FlashcardSet, { FlashcardSetT } from "@/models/FlashcardSet";
import { UserT } from "@/models/User";
import UserFlashcard, { UserFlashcardT } from "@/models/UserFlashcard";
import { getUser } from "@/utils/server/authUtils";
import connectToDB from "@/utils/server/database";
import { simpleMessageResponse } from "@/utils/server/responseFactories";
import { findNextRang } from "@/utils/server/userRangUtils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    await connectToDB();
    try {
        const user: UserT = await getUser(request);
        const userFlashcards: UserFlashcardT[] = await UserFlashcard.find({ userId: user._id });

        return NextResponse.json(await getUSerStatistics(user, userFlashcards));
    } catch (e) { }
    return simpleMessageResponse('', 401)
}

async function getUSerStatistics(user: UserT, userFlashcards: UserFlashcardT[]): Promise<UserStatisticsDto> {
    const learnedFlashcardSets: FlashcardSetT[] = await getLearnedFlashcardSets(userFlashcards);
    const learnedFlashcards = getLearnedFlashcards(learnedFlashcardSets);
    const userNextRange = findNextRang(user.rang!);

    return {
        userPoints: user.points,
        toNextLevel: userNextRange.pointsFrom - user.points,
        learnedWordsCount: learnedFlashcards.length,
        userTestsCount: learnedFlashcardSets.length
    }
}

function getLearnedFlashcardSets(userFlashcards: UserFlashcardT[]) {
    const learnedFlashcardSetStatuses: string[] = [StatusType.LEARNING, StatusType.TESTING];
    const learnedUserFlashcards = userFlashcards.filter(userFlashcard => learnedFlashcardSetStatuses.includes(userFlashcard.type!))
    const learnedUserFlashcardSetIds = learnedUserFlashcards.map(userFlashcard => userFlashcard.flashcardSetId);
    return FlashcardSet.find({ '_id': { $in: learnedUserFlashcardSetIds } });
}

function getLearnedFlashcards(learnedFlashcardSets: FlashcardSetT[]) {
    return learnedFlashcardSets.flatMap(flashcardSet => flashcardSet.flashcards);
}