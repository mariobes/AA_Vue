<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { logout, isLoggedIn, getUserData } from '@/stores/auth'
import { useI18n } from 'vue-i18n'

const router = useRouter()

const storedEmail = localStorage.getItem('email')
const userData = ref()

const { t } = useI18n()

const handleLogout = () => {
  logout()
  router.push('/')
}

const isLoggedInComputed = computed(() => isLoggedIn())

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
    <div class="d-flex justify-center userOptions">
      <v-btn color="primary" @click="myAccount">{{ t('MiCuenta') }}</v-btn>
      <v-btn color="red" @click="handleLogout" v-if="isLoggedInComputed">{{ t('CerrarSesionBtn') }}</v-btn>
    </div>
</template>

<style scoped>
    .userOptions .v-btn {
      margin-top: 50px;
      margin-right: 20px;
    }
</style>
