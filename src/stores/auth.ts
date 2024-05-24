// auth.ts

import { ref } from 'vue'

interface AuthState {
  token: string | null;
  role: string | null; 
}

const state: AuthState = {
  token: null,
  role: null, 
}

export async function login(email: string, password: string) {
    try {
        const response = await fetch('http://localhost:4746/Auth/Login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        })

        if (response.ok) {
            const token = await response.text()
            setToken(token)
            return true
        } else {
            return false
        }
    } catch (error) {
        console.error('Se ha producido un error al iniciar sesión: ', error)
        throw error
    }
}

export function setToken(token: string | null) {
    state.token = token
}

export function getToken() {
    return state.token
}

export async function getUserData(email: string) {
    try {
        const userDataResponse = await fetch(`http://localhost:4746/Users/ByEmail?userEmail=${email}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${getToken()}`
            }
        })
        const userData = await userDataResponse.json()
        return userData
    } catch (error) {
        console.error('Se ha producido un error al obtener los datos del usuario: ', error)
        throw error
    }
}
