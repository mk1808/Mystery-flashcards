import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const segments = request.url.split('/');
    const id = segments[segments.indexOf('flashcards') + 1];
    const body = await request.json();
    console.log(body);

    return NextResponse.json(id);
}

export async function PATCH(request: NextRequest) {
    const segments = request.url.split('/');
    const id = segments[segments.indexOf('flashcards') + 1];
    const body = await request.json();
    console.log(body);

    return NextResponse.json(id);
}