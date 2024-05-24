<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { login, getUserData } from '@/stores/auth'

const email = ref('')
const password = ref('')
const errorMessage = ref('')
const router = useRouter()

const handleLogin = async () => {
    try {
        errorMessage.value = ''
        const loggedIn = await login(email.value, password.value)
        if (loggedIn) {
            const userData = await getUserData(email.value)
            router.push({ name: userData.role === 'admin' ? 'home' :'privateZoneUser', params: { id: userData.id } })
        } else {
            errorMessage.value = 'Error. Las credenciales son incorrectas'
        }
    } catch (error) {
        console.error('Se ha producido un error al iniciar sesión: ', error)
        throw error
    }
}
</script>

<template>
    <v-sheet class="mx-auto" width="400">
      <v-card-title class="text-center"><h3>Inicio de sesión</h3></v-card-title>
      <v-form fast-fail @submit.prevent="handleLogin">
        <v-text-field
          v-model="email"
          label="Correo electrónico"
          required
        ></v-text-field>
  
        <v-text-field
          v-model="password"
          label="Contraseña"
          type="password"
          required
        ></v-text-field>
  
        <v-btn class="mt-2" type="submit" block>Iniciar Sesión</v-btn>
        <v-alert v-if="errorMessage" type="error" class="mt-2">{{ errorMessage }}</v-alert>
      </v-form>
    </v-sheet>
</template>

<style scoped>
    .v-card-title {
        padding: 100px 0 30px 0
    }

    .v-btn {
        background-color: #52a7f7;
        margin-bottom: 50px
    }
</style>
