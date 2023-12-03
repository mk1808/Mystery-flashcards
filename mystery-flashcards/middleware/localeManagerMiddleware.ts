import { NextFetchEvent, NextMiddleware, NextRequest, NextResponse } from "next/server";
import { MiddlewareFactory } from "./types";
import { defaultLocale, dictionaries } from "@/dictionaries/dictionaries";

export const localeManagerMiddleware: MiddlewareFactory = (next: NextMiddleware) => {
    return async (request: NextRequest, _next: NextFetchEvent) => {
        const { pathname } = request.nextUrl;
        const possibleDictionaries = Object.keys(dictionaries);
        const dictionaryMatch = possibleDictionaries.some(locale => pathname.match(`/${locale}.*`))
        if (dictionaryMatch) {
            return await next(request, _next);
        }
        request.nextUrl.pathname = `/${defaultLocale}/${pathname}`;
        return Response.redirect(request.nextUrl);
    };
};