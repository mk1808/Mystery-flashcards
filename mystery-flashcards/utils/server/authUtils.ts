import { NextRequest } from "next/server";
import { decodeToken } from "./jwtUtils";
import User from "@/models/User";


export async function getUser(request: NextRequest) {
    const user = decodeToken(request);
    return await User.findById(user.id);
}