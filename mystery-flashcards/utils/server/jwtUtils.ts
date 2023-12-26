import { SignJWT, decodeJwt, jwtVerify } from "jose";
import { NextRequest } from "next/server";

export async function verifyToken(request: NextRequest) {
    await jwtVerify(getTokenFromCookie(request), getSecret());
}

export async function signToken(data: any) {
    return await new SignJWT(data)
        .setProtectedHeader({ alg: process.env.ENCRYPTION_ALGORYTM! })
        .setExpirationTime(process.env.EXPIRATION_TIME!)
        .sign(getSecret());
}

export function decodeToken(request: NextRequest) {
    return decodeJwt(getTokenFromCookie(request));
}

function getTokenFromCookie(request: NextRequest) {
    const cookieToken = request.cookies.get(process.env.TOKEN_COOKIE_NAME!)?.value || "";
    return cookieToken.replace(process.env.TOKEN_TYPE!, "");
}

function getSecret() {
    return new TextEncoder().encode(process.env.TOKEN_SECRET);
}