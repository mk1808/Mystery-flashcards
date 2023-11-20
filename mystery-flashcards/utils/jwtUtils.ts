import { SignJWT, jwtVerify } from "jose";
import { NextRequest } from "next/server";

const tokenType = "Bearer ";
const tokenCookieName = "token";
const encryptionAlgorytm = "HS256";
const expirationTime = "2d";

export async function verifyToken(request: NextRequest) {
    await jwtVerify(getTokenFromCookie(request), getSecret());
}

export async function signToken(data: any) {
    return await new SignJWT(data)
        .setProtectedHeader({ alg: encryptionAlgorytm })
        .setExpirationTime(expirationTime)
        .sign(getSecret());
}

function getTokenFromCookie(request: NextRequest) {
    const cookieToken = request.cookies.get(tokenCookieName)?.value || "";
    return cookieToken.replace(tokenType, "");
}

function getSecret() {
    return new TextEncoder().encode(process.env.TOKEN_SECRET);
}