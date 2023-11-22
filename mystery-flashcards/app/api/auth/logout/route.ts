import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {

    return new NextResponse('Successful logout!', {
        status: 200,
        headers: { 'Set-Cookie': `token=; Path=/` },
    });
}