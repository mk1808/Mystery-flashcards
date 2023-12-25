import FlashcardSet, { FlashcardSetT } from "@/models/FlashcardSet";
import { UserT } from "@/models/User";
import UserFlashcard, { UserFlashcardT } from "@/models/UserFlashcard";
import { getUser } from "@/utils/server/authUtils";
import connectToDB from "@/utils/server/database";
import { findNextRang } from "@/utils/server/userRangUtils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    await connectToDB();
    try {
        const user: UserT = await getUser(request);
        const userFlashcards: UserFlashcardT[] = await UserFlashcard.find({ userId: user._id });
        const learnedFlashcardSetStatuses = ["LEARNING", "TESTING", "FINISHED"];
        const learnedUserFlashcards = userFlashcards.filter(userFlashcard => learnedFlashcardSetStatuses.includes(userFlashcard.type!))
        const learnedUserFlashcardSetIds = learnedUserFlashcards.map(userFlashcard => userFlashcard.flashcardSetId);
        const learnedFlashcardSets: FlashcardSetT[] = await FlashcardSet.find({ '_id': { $in: learnedUserFlashcardSetIds } });
        const learnedFlashcards = learnedFlashcardSets.flatMap(flashcardSet => flashcardSet.flashcards);
        const userNextRange = findNextRang(user.rang!);

        const statistics: UserStatisticsDto = {
            userPoints: user.points,
            toNextLevel: userNextRange.pointsFrom - user.points,
            learnedWordsCount: learnedFlashcards.length,
            userTestsCount: learnedUserFlashcards.length
        }
        return new NextResponse(JSON.stringify(statistics));
    } catch (e) { }
    return new NextResponse(JSON.stringify({}), { status: 401 });
}