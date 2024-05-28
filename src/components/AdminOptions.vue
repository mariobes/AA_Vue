<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { logout, getToken } from '@/stores/auth'

const router = useRouter()
const isLoggedIn = ref(!!getToken())

const handleLogout = () => {
  logout()
  isLoggedIn.value = false
  router.push('/')
}

const listUsers = () => {
  isLoggedIn.value = false
  router.push('/listUsers')
}
</script>

<template>
    <div class="d-flex justify-center adminTitle">
      <h2>Modo Administrador</h2>
    </div>
    <div class="d-flex justify-center adminOptions">
      <v-btn color="primary" @click="listUsers">Lista de usuarios</v-btn>
      <v-btn color="red" @click="handleLogout" v-if="isLoggedIn">Cerrar sesión</v-btn>
    </div>
</template>

<style scoped>
    .adminTitle {
      padding: 50px;
    }

    .adminOptions .v-btn {
      margin-right: 20px;
    }
</style>
