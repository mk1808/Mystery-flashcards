import { UserT } from "@/models/User";
import { createPathParams, get, patch, post, put } from "./RestUtils";

const PREFIX = "http://localhost:3000/api";

export const loginRequest = (loginForm: LoginForm) => {
    console.log(loginForm)
    return post(loginForm, `${PREFIX}/auth/login`);
}

export const registerRequest = (registerForm: RegisterForm) => {
    console.log(registerForm)
    return post(registerForm, `${PREFIX}/auth/register`);
}

export const createFlashcardSetRequest = (form: any) => {
    console.log(form)
    return post(form, `${PREFIX}/flashcards`);
}

export const searchFlashcardSets = (data: any) => {
    return get(`${PREFIX}/flashcards/search?${createPathParams(data)}`);
}

export const getFlashcardSetRequest = (id: any, headers:any) => {
    console.log(id)
    return get(`${PREFIX}/flashcards/${id}`, "no-store", headers);
}

export const postAnswersAndReturnCards = (id: any, body:any, headers?:any) => {
    console.log(id)
    return post( body, `${PREFIX}/flashcards/${id}/learn/training`,"no-store", headers);
}

export const getUserStatistics = () => {
    return get(`${PREFIX}/users/statistics`);
}

export const getWhoAmi = () => {
    return get(`${PREFIX}/auth/whoAmI`);
}

export const updateUser = (user: UserT) => {
    return put(user, `${PREFIX}/users`);
}

export const patchAnswersAndReturnResults = (id: any, body:any, headers?:any) => {
    console.log(id)
    return patch(body, `${PREFIX}/flashcards/${id}/learn/training`,"no-store", headers);
}

export const logout = () => {
    return post({}, `${PREFIX}/auth/logout`);
}

export const postUserFlashcardSet = (body: any) => {
    console.log(body)
    return post(body, `${PREFIX}/userFlashcards`);
}

