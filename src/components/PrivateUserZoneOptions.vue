<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { logout, getToken, getUserData } from '@/stores/auth'

const router = useRouter()
const isLoggedIn = !!getToken()

const handleLogout = () => {
  logout()
  router.push('/')
}

const buyCrypto = () => {
  router.push('/')
}

</script>

<template>
    <div class="d-flex justify-center userOptions">
      <v-btn color="primary">Ingresar dinero</v-btn>
      <v-btn color="primary" @click="buyCrypto">Comprar criptomonedas</v-btn>
      <v-btn color="red" @click="handleLogout" v-if="isLoggedIn">Cerrar sesión</v-btn>
    </div>
</template>

<style scoped>
    .userOptions .v-btn {
      margin: 50px 20px;
    }
</style>
