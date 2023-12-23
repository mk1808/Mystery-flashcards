import FlashcardSet, { FlashcardSetT } from "@/models/FlashcardSet";
import UserFlashcard, { UserFlashcardT } from "@/models/UserFlashcard";
import { getArrParam, getSearchParam } from "@/utils/server/arrayUtils";
import connectToDB from "@/utils/server/database";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    await connectToDB();
    const params = request.nextUrl.searchParams,
        possibleParamNames: any[] = ["name", "level", "lang1", "lang2"],
        possibleArrayParamNames: any[] = ["hashtags"],
        paramValues: any = {};
    possibleParamNames.forEach(getSearchParam(params, paramValues));
    possibleArrayParamNames.forEach(getArrParam(params, paramValues));

    if (paramValues.name) {
        paramValues.name = { $regex: '.*' + paramValues.name + '.*' }
    }

    const result = (await FlashcardSet.find(paramValues)).map((flashcardSet=>flashcardSet.toObject()));
    const filledResult = await getUserFlashcards(result);

    return NextResponse.json(filledResult)
}

async function getUserFlashcards(sets: FlashcardSetT[]) {
    const ids = sets.map((card: FlashcardSetT) => card._id);
    const userFlashcards = (await UserFlashcard.find({ 'flashcardSetId': { $in: ids } })).map(userFlashcard=>userFlashcard.toObject());

    userFlashcards.forEach((userFlashcard: UserFlashcardT) => {
        const set: FlashcardSetT = sets.find((set: FlashcardSetT) => set._id?.toString() == userFlashcard.flashcardSetId.toString())!;
        if (set){
           set.userFlashcard = userFlashcard; 
        }
        
    })
    return sets;
}



