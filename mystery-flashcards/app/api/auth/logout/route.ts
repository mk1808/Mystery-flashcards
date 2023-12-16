import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {

    return new NextResponse(JSON.stringify({ message: 'common.userLoggedOut' }), {
        status: 200,
        headers: { 'Set-Cookie': `token=; Path=/` },
    });
}