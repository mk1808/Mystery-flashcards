import { UserT } from "@/models/User";
import { createPathParams, get, patch, post, put } from "./RestUtils";

function getHost(host?: string) {
    if (host) {
        return `http://${host}/api`
    }
    return '/api'
}

export const loginRequest = (loginForm: LoginForm, host?: string) => {
    return post(loginForm, `${getHost(host)}/auth/login`);
}

export const registerRequest = (registerForm: RegisterForm, host?: string) => {
    return post(registerForm, `${getHost(host)}/auth/register`);
}

export const createFlashcardSetRequest = (form: any, host?: string) => {
    return post(form, `${getHost(host)}/flashcards`);
}

export const updateFlashcardSetRequest = (id: string, form: any, host?: string) => {
    return put(form, `${getHost(host)}/flashcards/${id}`);
}

export const searchFlashcardSets = (data: any, host?: string) => {
    return get(`${getHost(host)}/flashcards/search?${createPathParams(data)}`);
}

export const getFlashcardSetRequest = (id: any, host?: string, headers?: any) => {
    return get(`${getHost(host)}/flashcards/${id}`, "no-store", headers);
}

export const postAnswersAndReturnCards = (id: any, body: any, host?: string, headers?: any) => {
    return post(body, `${getHost(host)}/flashcards/${id}/learn/training`, "no-store", headers);
}

export const getTestFlashcardsRequest = (id: any, host?: string, headers?: any) => {
    return get(`${getHost(host)}/flashcards/${id}/learn/test`, "no-store", headers);
}

export const sendTestAnswersRequest = (id: any, body: any, host?: string) => {
    return post(body, `${getHost(host)}/flashcards/${id}/learn/test`, "no-store");
}

export const getUserStatistics = (host?: string) => {
    return get(`${getHost(host)}/users/statistics`);
}

export const getWhoAmi = (host?: string, headers?: any) => {
    return get(`${getHost(host)}/auth/whoAmI`, "no-store", headers);
}

export const updateUser = (user: UserT, host?: string) => {
    return put(user, `${getHost(host)}/users`);
}

export const patchAnswersAndReturnResults = (id: any, body: any, host?: string, headers?: any) => {
    return patch(body, `${getHost(host)}/flashcards/${id}/learn/training`, "no-store", headers);
}

export const logout = (host?: string) => {
    return post({}, `${getHost(host)}/auth/logout`);
}

export const postUserFlashcardSet = (body: any, host?: string) => {
    return post(body, `${getHost(host)}/userFlashcards`);
}

export const getHashtags = (host?: string, headers?: any) => {
    return get(`${getHost(host)}/cached/hashtags`, "no-store", headers);
}

export const getDictionaryRequest = async (locale: string, host?: string) => {
    return get(`${getHost(host)}/dictionary?locale=${locale}`, "no-store")
}

