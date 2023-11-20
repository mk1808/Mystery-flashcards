import { NextRequest } from "next/server";
import { decodeToken } from "./jwtUtils";


export function getUser(request: NextRequest) {
    const user = decodeToken(request);

    // Get user from database by user.id

    return user;
}