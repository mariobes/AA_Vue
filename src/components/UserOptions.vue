<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { logout, getToken, getUserData } from '@/stores/auth'

const router = useRouter()
const isLoggedIn = !!getToken()

const storedEmail = localStorage.getItem('email')
const userData = ref()

const handleLogout = () => {
  logout()
  router.push('/')
}

const myAccount = () => {
    router.push(`/privateZoneUser/${userData.value.id}`)
}

onMounted(async () => {
    try {
        if (storedEmail) {
            userData.value = await getUserData(storedEmail)
        }
    } catch (error) {
        console.error('Error al obtener los datos del usuario: ', error)
    }
})
</script>

<template>
    <div class="d-flex justify-center userTitle">
      <h2 v-if="userData">¡Hola de nuevo, {{ userData.name }}!</h2>
    </div>
    <div class="d-flex justify-center userOptions">
      <v-btn color="primary" @click="myAccount">Mi cuenta</v-btn>
      <v-btn color="red" @click="handleLogout" v-if="isLoggedIn">Cerrar sesión</v-btn>
    </div>
</template>

<style scoped>
    .userTitle {
      padding: 50px;
    }

    .userOptions .v-btn {
      margin-right: 20px;
    }
</style>
