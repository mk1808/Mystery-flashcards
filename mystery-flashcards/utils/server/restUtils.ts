import { cookies, headers } from "next/headers";
import { createCookieHeader, getHost } from "../client/RestUtils";

function getServerRequestParams() {
    return [
        getHost(headers()),
        createCookieHeader(cookies())
    ]
}

export async function executeServerSideRequest(method: any, ...params: any[]) {
    return await method.apply(null, [...params, ...getServerRequestParams()])
}