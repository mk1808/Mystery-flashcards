import React from 'react'

function useRest() {
    const login = (loginForm: LoginForm) => fetch(`http://localhost:3000/api/auth/login`, {
        cache: 'no-store',
        method: 'POST',
        body: JSON.stringify(loginForm)
    }).then(resp => resp.json());
    return { login };
}

export default useRest