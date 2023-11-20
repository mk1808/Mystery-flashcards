import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const id = request.url.slice(request.url.lastIndexOf('/') + 1)
    console.log(id);

    return NextResponse.json(id);
}

export async function PUT(request: NextRequest) {
    const id = request.url.slice(request.url.lastIndexOf('/') + 1)
    console.log(id);

    return NextResponse.json(id);
}

export async function DELETE(request: NextRequest) {
    const id = request.url.slice(request.url.lastIndexOf('/') + 1)
    console.log(id);

    return NextResponse.json(id);
}