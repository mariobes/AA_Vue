import { reactive, toRefs } from 'vue'

interface AuthState {
  token: string | null;
  role: string | null;
}

const state: AuthState = reactive({
  token: localStorage.getItem('token'), 
  role: localStorage.getItem('role'), 
})

export async function login(email: string, password: string) {
    try {
        const response = await fetch('http://localhost:4746/Auth/Login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })

        if (response.ok) {
            const token = await response.text()
            setToken(token)
            const userData = await getUserData(email)
            setRole(userData.role)
            localStorage.setItem('email', email)
            localStorage.setItem('password', password)
            return true
        } else {
            return false
        }
    } catch (error) {
        console.error('Se ha producido un error al iniciar sesión: ', error)
        throw error
    }
}

export async function Register(name: string, birthdate: Date, email: string, password: string, phone: string, dni: string, nationality: string) {
    try {
        const response = await fetch('http://localhost:4746/Auth/Register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
               name,
               birthdate,
               email,
               password,
               phone,
               dni,
               nationality
            })
          })
          if (response.ok) {
            return true
          } else {
            console.error('Error al registrar el usuario. Respuesta no exitosa.')
            return false
          }
    } catch (error) {
        console.error('Error al registrar el usuario: ', error)
    }
  }

export function setToken(token: string | null) {
    state.token = token
    if (token) {
        localStorage.setItem('token', token)
    } else {
        localStorage.removeItem('token')
    }
}

export function getToken() {
    return state.token || localStorage.getItem('token')
}

export function setRole(role: string | null) {
    state.role = role
    if (role) {
        localStorage.setItem('role', role)
    } else {
        localStorage.removeItem('role')
    }
}

export function getRole() {
    return state.role || localStorage.getItem('role')
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

export function logout() {
    setToken(null)
    setRole(null)
}

export function useAuth() {
  return {
    ...toRefs(state),
    login,
    Register,
    setToken,
    getToken,
    setRole,
    getRole,
    getUserData,
    logout
  }
}
