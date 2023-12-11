import { post, get } from "./RestUtils";

const PREFIX = "http://localhost:3000/api/";

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

export const getFlashcardSetRequest = (id: any, headers:any) => {
    console.log(id)
    return get(`${PREFIX}flashcards/${id}`, "no-store", headers);
}

export const postAnswersAndReturnCards = (id: any, body:any, headers:any) => {
    console.log(id)
    return post( body, `${PREFIX}flashcards/${id}/learn/training`,"no-store", headers);
}
