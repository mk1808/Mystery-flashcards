import FlashcardSet from "@/models/FlashcardSet";
import { UserT } from "@/models/User";
import UserFlashcard from "@/models/UserFlashcard";
import { getArrParam, getSearchParam } from "@/utils/server/arrayUtils";
import { getUser } from "@/utils/server/authUtils";
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

    await filStatusParams(params, paramValues, request);

    const result = await FlashcardSet.find(paramValues);

    return NextResponse.json(result)
}

async function filStatusParams(searchParams: any, paramValues: any, request: NextRequest) {
    const statusParams = []
    const params: string[] = searchParams.getAll("status");
    if (params.includes("mine")) {
        const currentUser: UserT = await getUser(request);
        statusParams.push({ "user._id": currentUser._id })
    }
    const flashcardSetIds = await getFlashcardSetIdsByUserFlashcardStatus(params);
    if (flashcardSetIds !== null) {
        statusParams.push({ "_id": { $in: flashcardSetIds } })
    }

    if (statusParams.length > 0) {
        paramValues["$or"] = statusParams;
    }
}


async function getFlashcardSetIdsByUserFlashcardStatus(params: string[]) {
    const statusParams = [];
    const typeParams = [];
    if (params.includes("favorite")) {
        statusParams.push({ "isFavorite": true });
    }

    if (params.includes("wanting")) {
        typeParams.push("wantToLearn")
    }
    if (params.includes("learning")) {
        typeParams.push("LEARNING")
    }
    if (params.includes("test")) {
        typeParams.push("TESTING")
    }
    if (typeParams.length > 0) {
        statusParams.push({ "type": { $in: typeParams } });
    }

    if (statusParams.length > 0) {
        const userFlashcards = await UserFlashcard.find({ $or: statusParams });
        return userFlashcards.map(userFlashcard => userFlashcard.flashcardSetId);
    }
    return null;
}
