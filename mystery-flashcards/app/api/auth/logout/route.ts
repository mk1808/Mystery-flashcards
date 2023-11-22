import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {

    return new Response('Successful logout!', {
        status: 200,
        headers: { 'Set-Cookie': `token=; Path=/` },
    });
}