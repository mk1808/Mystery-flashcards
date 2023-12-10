import { UserT } from "@/models/User";
import { get, post, put } from "./RestUtils";

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


export const getUserStatistics = () => {
    return get(`${PREFIX}/users/statistics`);
}

export const getWhoAmi = () => {
    return get(`${PREFIX}/auth/whoAmI`);
}

export const updateUser = (user: UserT) => {
    return put(user, `${PREFIX}/users`);
}

export const logout = () => {
    return post({}, `${PREFIX}/auth/logout`);
}