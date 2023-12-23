import { UserT } from "@/models/User";
import FlashcardSet, { FlashcardSetT } from "@/models/FlashcardSet";
import UserFlashcard, { UserFlashcardT } from "@/models/UserFlashcard";
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

    const permissionParams = await getPermissionParams(request)
    paramValues["$and"] = [permissionParams]

    const statusParams = await getStatusParams(params, request);
    if (statusParams) {
        paramValues["$and"].push(statusParams)
    }

    const result = (await FlashcardSet.find(paramValues)).map((flashcardSet => flashcardSet.toObject()));
    const filledResult = await getUserFlashcards(result, request);

    return NextResponse.json(filledResult)
}

async function getUserFlashcards(sets: FlashcardSetT[], request: NextRequest) {
    try {
        const ids = sets.map((card: FlashcardSetT) => card._id);
        const currentUser: UserT = await getUser(request);
        const userFlashcards = (await UserFlashcard.find({ 'flashcardSetId': { $in: ids }, 'userId': currentUser._id })).map(userFlashcard => userFlashcard.toObject());

        userFlashcards.forEach((userFlashcard: UserFlashcardT) => {
            const set: FlashcardSetT = sets.find((set: FlashcardSetT) => set._id?.toString() == userFlashcard.flashcardSetId?.toString())!;
            if (set) {
                set.userFlashcard = userFlashcard;
            }

        })
    } catch (e) { }
    return sets;
}

async function getStatusParams(searchParams: any, request: NextRequest) {
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
        return { $or: statusParams };
    }
    return null
}


async function getFlashcardSetIdsByUserFlashcardStatus(params: string[]) {
    const statusParams = [];
    if (params.includes("favorite")) {
        statusParams.push({ "isFavorite": true });
    }

    if (params.includes("WANT_TO_LEARN") || params.includes("LEARNING") || params.includes("TESTING")) {
        statusParams.push({ "type": { $in: params } });
    }

    if (statusParams.length > 0) {
        const userFlashcards = await UserFlashcard.find({ $or: statusParams });
        return userFlashcards.map(userFlashcard => userFlashcard.flashcardSetId);
    }
    return null;
}


async function getPermissionParams(request: NextRequest) {
    const permissionParams: any[] = [{ isPublic: true }]
    try {
        const currentUser: UserT = await getUser(request);
        permissionParams.push({ "user._id": currentUser._id });
    } catch (e) { }
    return { $or: permissionParams };
}