import React from 'react'

function useRest() {

    const onResponse = async (response: any) => {
        if (response.status >= 200 && response.status < 300) {
            return response.json();
        }
        const body = await response.json();
        return Promise.reject({ status: response.status, body });
    }

    const login = (loginForm: LoginForm) => fetch(`http://localhost:3000/api/auth/login`, {
        cache: 'no-store',
        method: 'POST',
        body: JSON.stringify(loginForm)
    }).then(onResponse);

    const registerRequest = (registerForm: RegisterForm) => fetch(`http://localhost:3000/api/auth/register`, {
        cache: 'no-store',
        method: 'POST',
        body: JSON.stringify(registerForm)
    }).then(onResponse);

    const createFlashcardSet = (form: any) => fetch(`http://localhost:3000/api/flashcards`, {
        cache: 'no-store',
        method: 'POST',
        body: JSON.stringify(form)
    }).then(onResponse);

    const getUserStatistics = () => fetch(`http://localhost:3000/api/users/statistics`, {
        cache: 'no-store',
        method: 'GET'
    }).then(onResponse);

    return { login, registerRequest, createFlashcardSet, getUserStatistics };
}

export default useRest