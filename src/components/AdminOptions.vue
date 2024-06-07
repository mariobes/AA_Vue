<script setup lang="ts">
import { useRouter } from 'vue-router'
import { logout, isLoggedIn  } from '@/stores/auth'
import { useI18n } from 'vue-i18n'
import { computed } from 'vue';

const router = useRouter()

const { t } = useI18n()

const handleLogout = () => {
  logout()
  router.push('/')
}

const isLoggedInComputed = computed(() => isLoggedIn())

const listUsers = () => {
  router.push('/listUsers')
}

const addCrypto = () => {
  router.push('/addCrypto')
}
</script>

<template>
    <div class="d-flex justify-center adminTitle">
      <h2>{{ t('TituloAdministrador') }}</h2>
    </div>
    <div class="d-flex justify-center adminOptions">
      <v-btn color="primary" @click="addCrypto">{{ t('RegistrarCriptoBtn') }}</v-btn>
      <v-btn color="primary" @click="listUsers">{{ t('ListaUsuariosBtn') }}</v-btn>
      <v-btn color="red" @click="handleLogout" v-if="isLoggedInComputed">{{ t('CerrarSesionBtn') }}</v-btn>
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
