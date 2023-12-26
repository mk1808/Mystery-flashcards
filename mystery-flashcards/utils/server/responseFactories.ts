import { NextResponse } from "next/server";

export function simpleMessageResponse(message: string, status = 200, headers?: any) {
    return new NextResponse(JSON.stringify({ message }), { status, headers });
}