import { NextFetchEvent, NextMiddleware, NextRequest, NextResponse } from "next/server";
import { MiddlewareFactory } from "./types";
import { defaultLocale, dictionaries } from "@/dictionaries/dictionaries";


async function runMiddleware(request: NextRequest, next: NextMiddleware, _next: NextFetchEvent) {
    const { pathname } = request.nextUrl;
    const possibleDictionaries = Object.keys(dictionaries);
    const dictionaryMatch = possibleDictionaries.some(locale => pathname == `/${locale}` || pathname.match(`/${locale}/.*`))
    if (dictionaryMatch) {
        return await next(request, _next);
    }
    request.nextUrl.pathname = `/${defaultLocale}/${pathname}`;
    return Response.redirect(request.nextUrl);
}

export const localeManagerMiddleware: MiddlewareFactory = (next: NextMiddleware) => {
    return async (request: NextRequest, _next: NextFetchEvent) => {
        if (middlewareApplyCriteria(request)) {
            return runMiddleware(request, next, _next);
        }
        return await next(request, _next);
    };
};

function middlewareApplyCriteria(request: NextRequest) {
    return !request.nextUrl.pathname.match("^/images.*");
}