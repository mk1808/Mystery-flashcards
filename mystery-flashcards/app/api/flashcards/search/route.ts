import FlashcardSet from "@/models/FlashcardSet";
import { getArrParam, getSearchParam } from "@/utils/server/arrayUtils";
import connectToDB from "@/utils/server/database";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    await connectToDB();
    const params = request.nextUrl.searchParams,
        possibleParamNames: any[] = ["name", "level", "lang1", "lang2"],
        possibleArrayParamNames: any[] = ["hashtags"],
        paramValues: any[] = [];
    possibleParamNames.forEach(getSearchParam(params, paramValues));
    possibleArrayParamNames.forEach(getArrParam(params, paramValues));
    const result = await FlashcardSet.find({ ...paramValues });
    console.log({ ...paramValues })


    return NextResponse.json(result)
}



