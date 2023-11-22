import FlashcardSet from "@/models/FlashcardSet";
import { getArrParam, getParam } from "@/utils/server/arrayUtils";
import connectToDB from "@/utils/server/database";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    await connectToDB();
    const params = request.nextUrl.searchParams,
        possibleParams: any[] = ["name", "level", "lang1", "lang2"],
        possibleArrayParams: any[] = ["hashtags"],
        values: any[] = [];
    possibleParams.forEach(getParam(params, values));
    possibleArrayParams.forEach(getArrParam(params, values));
    const result = await FlashcardSet.find({ ...values });

    console.log({ ...values })


    return NextResponse.json(result)
}



