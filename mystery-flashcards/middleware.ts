import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./utils/server/jwtUtils";

const unsecuredRoutes = [
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