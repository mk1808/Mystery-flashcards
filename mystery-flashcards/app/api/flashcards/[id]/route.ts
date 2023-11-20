import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    const id = params.id;
    console.log(id);

    return NextResponse.json(id);
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    const id = params.id;
    console.log(id);

    return NextResponse.json(id);
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    const id = params.id;
    console.log(id);

    return NextResponse.json(id);
}