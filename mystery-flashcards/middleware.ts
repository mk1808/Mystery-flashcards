import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./utils/server/jwtUtils";

type UnsecuredRoutesTypes = { GET: string[], POST: string[] };

const unsecuredRoutes: UnsecuredRoutesTypes = {
    GET: [
        '^/api/flashcards/.*$'
    ],
    POST: [
        '^/api/auth/register$',
        '^/api/auth/login$'
    ]
}

export async function middleware(request: NextRequest) {
    try {
        await verifyToken(request);
    } catch (err) {
        const unsecuredMethodRoutes = unsecuredRoutes[request.method as keyof UnsecuredRoutesTypes];
        const matchAnyRoute = unsecuredMethodRoutes?.find(unsecuredRoute => request.nextUrl.pathname.match(unsecuredRoute))
        if (!matchAnyRoute) {
            return new Response("No access!", { status: 401 });
        }
    }
    return NextResponse.next();
}

export const config = {
    matcher: '/api/:path*',
}