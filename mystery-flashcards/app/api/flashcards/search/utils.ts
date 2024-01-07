import { FlashcardSetSearchParamsType as SearchParamsType, FlashcardSetSearchParams as SearchParams } from "@/enums/FlashcardSetSearchParams";
import { StatusType } from "@/enums/StatusOptions";
import { FlashcardSetT } from "@/models/FlashcardSet";
import { UserT } from "@/models/User";
import UserFlashcard, { UserFlashcardT } from "@/models/UserFlashcard";
import { getArrParam, getSearchParam } from "@/utils/server/arrayUtils";
import { getUser } from "@/utils/server/authUtils";
import { NextRequest } from "next/server";


export async function getSearchParams(request: NextRequest) {
    const params = request.nextUrl.searchParams,
        possibleParamNames: SearchParamsType[] = [SearchParams.NAME, SearchParams.LEVEL, SearchParams.LANG1, SearchParams.LANG2],
        possibleArrayParamNames: SearchParamsType[] = [SearchParams.HASHTAGS],
        paramValues: any = {};
    possibleParamNames.forEach(getSearchParam(params, paramValues));
    possibleArrayParamNames.forEach(getArrParam(params, paramValues));

    updateByNameFilter(paramValues);

    const permissionParams = await getPermissionParams(request)
    const statusParams = await getStatusParams(params, request);

    addAndQuery(paramValues, permissionParams, statusParams);

    return paramValues;
}

function updateByNameFilter(paramValues: any) {
    if (paramValues[SearchParams.NAME]) {
        paramValues[SearchParams.NAME] = getByParamLike(paramValues[SearchParams.NAME])
    }
}

function getByParamLike(paramValue: string) {
    return { $regex: '.*' + paramValue + '.*' }
}

function addAndQuery(paramValues: any, ...params: any[]) {
    paramValues["$and"] = []
    params.filter(param => !!param).forEach(param => paramValues["$and"].push(param))
}

async function getPermissionParams(request: NextRequest) {
    const permissionParams: any[] = [{ isPublic: true }]
    try {
        const currentUser: UserT = await getUser(request);
        permissionParams.push({ "user._id": currentUser._id });
    } catch (e) { }
    return { $or: permissionParams };
}

async function getStatusParams(params: any, request: NextRequest) {
    const statusParams = []
    const searchParams: string[] = params.getAll(SearchParams.STATUS);
    try {
        const currentUser: UserT = await getUser(request);
        if (searchParams.includes(StatusType.MINE)) {
            statusParams.push({ "user._id": currentUser._id })
        }
        const flashcardSetIds = await getFlashcardSetIdsByUserFlashcardStatus(searchParams, currentUser._id!);
        if (flashcardSetIds !== null) {
            statusParams.push({ "_id": { $in: flashcardSetIds } })
        }
    } catch (e) { }

    if (statusParams.length > 0) {
        return { $or: statusParams };
    }
    return null
}

async function getFlashcardSetIdsByUserFlashcardStatus(params: string[], userId: string) {
    const statusParams = [];
    if (params.includes(StatusType.FAVORITE)) {
        statusParams.push({ isFavorite: true });
    }

    if (params.includes(StatusType.WANT_TO_LEARN) || params.includes(StatusType.LEARNING) || params.includes(StatusType.TESTING)) {
        statusParams.push({ type: { $in: params } });
    }

    if (statusParams.length > 0) {
        const userFlashcards = await UserFlashcard.find({ $or: statusParams, userId });
        return userFlashcards.map(userFlashcard => userFlashcard.flashcardSetId);
    }
    return null;
}

export async function getUserFlashcards(sets: FlashcardSetT[], request: NextRequest) {
    try {
        const userFlashcards = await getUserFlashcardsBySets(sets, request);
        matchUserFlashcards(sets, userFlashcards);
    } catch (e) { }
    return sets;
}

async function getUserFlashcardsBySets(sets: FlashcardSetT[], request: NextRequest) {
    const ids = sets.map((card: FlashcardSetT) => card._id);
    const currentUser: UserT = await getUser(request);
    return (await UserFlashcard.find({ flashcardSetId: { $in: ids }, userId: currentUser._id })).map(userFlashcard => userFlashcard.toObject());
}

function matchUserFlashcards(sets: FlashcardSetT[], userFlashcards: UserFlashcardT[]) {
    userFlashcards.forEach((userFlashcard: UserFlashcardT) => {
        const set: FlashcardSetT | undefined = sets.find((set: FlashcardSetT) => set._id?.toString() == userFlashcard.flashcardSetId?.toString());
        if (set) {
            set.userFlashcard = userFlashcard;
        }
    })
}