import { simpleMessageResponse } from "@/utils/server/responseFactories";

export async function POST() {

    return simpleMessageResponse('common.userLoggedOut', 200, { 'Set-Cookie': `token=; Path=/` })
}