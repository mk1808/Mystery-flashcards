import { NextFetchEvent, NextMiddleware, NextRequest, NextResponse } from "next/server";
import { MiddlewareFactory } from "./types";
import { verifyToken } from "@/utils/server/jwtUtils";

type UnsecuredRoutesTypes = { GET: string[], POST: string[] };

const unsecuredRoutes: UnsecuredRoutesTypes = {
    GET: [
        '^/api/flashcards/.*$',
        '^/api/dictionary.*$'
    ],
    POST: [
        '^/api/auth/register$',
        '^/api/auth/login$'
    ]
}

async function runMiddleware(request: NextRequest) {
    try {
        await verifyToken(request);
    } catch (err) {
        const unsecuredMethodRoutes = unsecuredRoutes[request.method as keyof UnsecuredRoutesTypes];
        const matchAnyRoute = unsecuredMethodRoutes?.find(unsecuredRoute => request.nextUrl.pathname.match(unsecuredRoute))
        if (!matchAnyRoute) {
            return new Response(JSON.stringify({ message: 'common.accessDenied' }), { status: 401 });
        }
    }
    return NextResponse.next();
}

function middlewareApplyCriteria(request: NextRequest) {
    return request.nextUrl.pathname.match("^/api/.*");
}

export const apiAccessControlMiddleware: MiddlewareFactory = (next: NextMiddleware) => {
    return async (request: NextRequest, _next: NextFetchEvent) => {
        if (middlewareApplyCriteria(request)) {
            return runMiddleware(request)
        }
        return await next(request, _next);
    };
};
