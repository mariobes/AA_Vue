<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { logout, getToken, isLoggedIn, getUserData } from '@/stores/auth'
import { useTransactionsStore } from '@/stores/transactions'
import { useI18n } from 'vue-i18n'

const token = getToken()

const router = useRouter()

const storedEmail = localStorage.getItem('email')
const userData = ref({ name: '', cash: 0, wallet: 0 })
const amount = ref<number>(0)
const dialog = ref(false) 

const { t } = useI18n()

const transactionsStore = useTransactionsStore()

const handleLogout = () => {
  logout()
  router.push('/')
}

const isLoggedInComputed = computed(() => isLoggedIn())

const buyCrypto = () => {
  router.push('/')
}

const makeDeposit = async () => {
  try {
    const success = await transactionsStore.MakeDeposit(userData.value.id, amount.value, token)
    if (success) {
      await transactionsStore.GetTransactions(userData.value.id, token)
      userData.value.cash += parseFloat(amount.value.toString()) 
      amount.value = 0
      console.log('Depósito realizado con éxito')
      dialog.value = false 
    }
  } catch (error) {
    console.error('Error al realizar el depósito: ', error)
  }
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
  <div class="btn-container">
    <v-dialog v-model="dialog" max-width="300">
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn
          v-bind="activatorProps"
          color="primary"
          :text="t('IngresarDineroBtn')"
          variant="flat"
          class="userOptions"
        ></v-btn>
        <v-btn 
        class="userOptions" 
        color="primary" 
        @click="buyCrypto"
        :text="t('ComprarCriptomonedaBtn')"
        ></v-btn>
        <v-btn 
          color="red" 
          @click="handleLogout" 
          v-if="isLoggedInComputed"
          :text="t('CerrarSesionBtn')"
          class="userOptions"
          ></v-btn>
      </template>
      <template v-slot:default="{ isActive }">
        <v-card>
          <v-card-title>
              <div class="title-popup">{{ t('IngresarDineroBtn') }}
              <v-btn class="close-btn" size="small" icon @click="isActive.value = false">
                <v-icon color="grey lighten-1">mdi-close</v-icon>
              </v-btn>
            </div>
          </v-card-title>                      
          <v-card-text>
            <v-text-field
              v-model="amount"
              :label="t('TextoMoneda')"
              type="number"
            ></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-btn
              class="buy-btn"
              @click="makeDeposit"
            >
            {{ t('IngresarBtn') }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
  </div>
  <div class="user-container">
      <div class="user-title">
          <h2 v-if="userData">¡{{ t('ZonaPrivadaTitulo') }}, {{ userData.name }}!</h2>
      </div>
      <div class="user-info">
          <p>{{ t('ZonaPrivadaEfectivo') }}: <b>{{ userData.cash }} {{ t('Moneda') }}</b> | {{ t('ZonaPrivadaCartera') }}: <b>{{ userData.wallet }} {{ t('Moneda') }}</b></p>
      </div>
  </div>
</template>

<style scoped>
.user-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px;
}

.user-title {
  padding-bottom: 30px;
  font-size: 25px;
}

.user-info {
  font-size: 20px;
}

.userOptions {
  margin: 0 20px;
  margin-top: 50px;
}

.btn-container {
  display: flex;
  justify-content: center;
}

.buy-btn {
  display: flex;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 30px;
  color: #52a7f7;
  font-weight: bold;
  border: 1px solid #52a7f7;
}

.close-btn {
  border: none;
}

.title-popup {
  display: flex;
  align-items: center;
  margin-left: 10px;
  margin-top: 15px;
}

.title-popup .v-btn {
  margin-left: 70px;
}
</style>
