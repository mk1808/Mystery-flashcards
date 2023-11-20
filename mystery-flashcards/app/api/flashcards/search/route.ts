import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    let params = request.nextUrl.searchParams;
    let name = params.get("name");
    console.log(name);

    return NextResponse.json("abc")
}