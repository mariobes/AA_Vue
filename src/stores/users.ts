import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { User } from '@/core/user'

export const useUsersStore = defineStore('users', () => {
  const users = ref<User[]>([])

  async function GetAllUsers(token: string | null) {
    try {
        const response = await fetch('http://localhost:4746/Users', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })

          if (response.ok) {
            const usersInfo = await response.text() 
            users.value = JSON.parse(usersInfo)
          } else {
            console.error('Error al obtener los usuarios. Respuesta no exitosa.')
          }

    } catch (error) {
        console.error('Error al obtener los usuarios: ', error)
        throw error;
    }
  }

  async function DeleteUser(id: number, token: string | null) {
    try {
        const response = await fetch(`http://localhost:4746/Users/${id}`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })
          if (response.ok) {
            return true
          } else {
            console.error('Error al eliminar el usuario. Respuesta no exitosa.')
            return false
          }
    } catch (error) {
        console.error('Error al eliminar el usuario: ', error)
        throw error;
    }
  }

return { users, GetAllUsers, DeleteUser }
})
