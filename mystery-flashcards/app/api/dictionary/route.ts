import { defaultLocale, getDictionary } from "@/dictionaries/dictionaries";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const locale = request.nextUrl.searchParams.get("locale");
    if (locale) {
        return NextResponse.json(await getDictionary(locale));
    }
    return NextResponse.json(await getDictionary(defaultLocale));
}