import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./utils/jwtUtils";

const unsecuredRoutes = [
    '/api/test/unsecured',
    '/api/auth/register',
    '/api/auth/login'
]

export async function middleware(request: NextRequest) {
    try {
        await verifyToken(request);
    } catch (err) {
        if (!unsecuredRoutes.includes(request.nextUrl.pathname)) {
            return new Response("No access!", { status: 401 });
        }
    }
    return NextResponse.next();
}

export const config = {
    matcher: '/api/:path*',
}