import { SignJWT, decodeJwt, jwtVerify } from "jose";
import { NextRequest } from "next/server";

const TOKEN_TYPE = "Bearer ";
const TOKEN_COOKIE_NAME = "token";
const ENCRYPTION_ALGORYTM = "HS256";
const EXPIRATION_TIME = "2d";

export async function verifyToken(request: NextRequest) {
    await jwtVerify(getTokenFromCookie(request), getSecret());
}

export async function signToken(data: any) {
    return await new SignJWT(data)
        .setProtectedHeader({ alg: ENCRYPTION_ALGORYTM })
        .setExpirationTime(EXPIRATION_TIME)
        .sign(getSecret());
}

export function decodeToken(request: NextRequest) {
    return decodeJwt(getTokenFromCookie(request));
}

function getTokenFromCookie(request: NextRequest) {
    const cookieToken = request.cookies.get(TOKEN_COOKIE_NAME)?.value || "";
    return cookieToken.replace(TOKEN_TYPE, "");
}

function getSecret() {
    return new TextEncoder().encode(process.env.TOKEN_SECRET);
}