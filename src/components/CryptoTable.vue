<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useCryptosStore } from '@/stores/cryptos'
import { useTransactionsStore } from '@/stores/transactions'
import { getToken, useAuth, getUserData } from '@/stores/auth'
import { useI18n } from 'vue-i18n'

const { GetAllCryptos } = useCryptosStore()

const token = getToken()
const { role } = useAuth()

const storeCryptos = useCryptosStore()
const storeTransactions = useTransactionsStore()

const storedEmail = localStorage.getItem('email')

const userData = ref({})
const amount = ref<number>(0)
const dialog = ref(false) 
const sortBy = ref('value')
const switchSortBy = ref(false)
const order = ref('asc')
const switchOrder = ref(false)

const { t } = useI18n()

const handleBuy = async (cryptoId: number) => {
  const success = await storeTransactions.BuyCrypto(userData.value.id, cryptoId, amount.value, token)
  if (success) {
    userData.value.cash -= parseFloat(amount.value.toString()) 
    userData.value.wallet += parseFloat(amount.value.toString()) 
    amount.value = 0
    console.log('Compra realizada con éxito')
    dialog.value = false 
  } else {
    console.error('Error al comprar la criptomoneda')
  }
}

const toggleSortBy = () => {
  sortBy.value = sortBy.value === 'value' ? 'name' : 'value' 
  GetAllCryptos(sortBy.value, order.value) 
}

const toggleOrder = () => {
  order.value = order.value === 'asc' ? 'desc' : 'asc' 
  GetAllCryptos(sortBy.value, order.value) 
}

onMounted(async () => {
  try {
    if ((storedEmail) && (token)) {
      userData.value = await getUserData(storedEmail)
    }
  } catch (error) {
    console.error('Error al obtener los datos del usuario: ', error)
  }
})

const deleteCrypto = async (cryptoId: number) => {
  const success = await storeCryptos.DeleteCrypto(cryptoId, token)

  if (success) {
    console.log('Criptomoneda eliminada con éxito')
    storeCryptos.GetAllCryptos(sortBy.value, order.value)
  } else {
    console.error('Error al eliminar la criptomoneda')
  }
}

GetAllCryptos(sortBy.value, order.value) 
</script>

<template>


  <div class="table-container">
    <div class="order-options">
      <v-switch :label="t('TextoOrdenar')" v-model="switchSortBy" @change="toggleSortBy"></v-switch>
      <v-switch :label="t('TextoOrdenar')" v-model="switchOrder" @change="toggleOrder"></v-switch>
    </div>
    <v-table class="table">
      <thead>
        <tr>
          <th>
            <h2>{{ t('NombreCripto') }}</h2>
          </th>
          <th>
            <h2>{{ t('SimboloCripto') }}</h2>
          </th>
          <th>
            <h2>{{ t('ValorCripto') }}</h2>
          </th>
          <th>
            <h2>{{ t('DesarrolladorCripto') }}</h2>
          </th>
          <th class="narrow-column">
            <h2>{{ t('DescentralizadaCripto') }}</h2>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="crypto, index in storeCryptos.cryptos"
          :key="crypto.id"
          :class="{ 'background-gray': index % 2 === 1 }"
        >
          <td>
            <h4>
              <RouterLink :to="{ path: `/cryptoDetails/${crypto.id}` }" class="crypto-name">{{ crypto.name }}</RouterLink>
            </h4>
          </td>
          <td>{{ crypto.symbol }}</td>
          <td>{{ crypto.value }} {{ t('Moneda') }}</td>
          <td>{{ crypto.developer }}</td>
          <td>{{ crypto.descentralized ? 'Sí' : 'No' }}</td>
          <td v-if="role === 'admin'">
            <div class="admin-btn">
              <RouterLink :to="{ path: `/updateCrypto/${crypto.id}` }" class="card-btn">
                <v-btn class="edit-btn">{{ t('EditarBtn') }}</v-btn>
              </RouterLink>
              <v-btn class="delete-btn" @click="deleteCrypto(crypto.id)">{{ t('EliminarBtn') }}</v-btn>
            </div>
          </td>
          <td v-if="role === 'user'">
            <v-dialog max-width="300">
              <template v-slot:activator="{ props: activatorProps }">
                <v-btn
                  class="buy-crypto-btn"
                  v-bind="activatorProps"
                  :text="t('ComprarBtn')"
                  variant="flat"
                ></v-btn>
              </template>
              <template v-slot:default="{ isActive }">
                <v-card>
                  <v-card-title>
                      <div class="title-popup">{{ t('ComprarBtn') }} {{ crypto.name }}
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
                      @click="handleBuy(crypto.id)"
                    >
                    {{ t('ComprarBtn') }}
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </template>
              </v-dialog>
          </td>
        </tr>
      </tbody>
    </v-table>
  </div>
  </template>

<style scoped>
  .table-container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-top: 30px;
      margin-bottom: 50px;
  }

  .v-table {
      width: 75%;
      text-align: center;
  }

  .v-table > .v-table__wrapper > table > tbody > tr > th, 
  .v-table > .v-table__wrapper > table > thead > tr > th {
      text-align: center !important;
  }

  .narrow-column {
    max-width: 100px;
  }

  .crypto-name {
    text-decoration: none;
    color: inherit; 
  }

  .crypto-name:hover {
    text-decoration: underline;
    color: #000; 
  }

  .edit-btn, .buy-btn, .buy-crypto-btn {
      display: flex;
      margin-left: auto;
      margin-right: auto;
      color: #52a7f7;
      font-weight: bold;
      border: 1px solid #52a7f7;
  }

  .buy-btn {
    margin-bottom: 30px;
  }

  .delete-btn {
    color: #ff0000;
    font-weight: bold;
    border: 1px solid #ff0000;
    margin-left: 10px;
  }

  .card-btn {
    text-decoration: none;
  }

  .close-btn {
    border: none;
  }
  
  .title-popup {
    display: flex;
    align-items: center;
    margin-left: 10px;
    margin-top: 10px;
  }

  .title-popup .v-btn {
    margin-left: 60px;
  }

  .background-gray {
    background-color: #ddd
  }

  .admin-btn {
    display: flex;
    max-width: 120px;
  }

  .order-options, .v-switch {
    display: flex;
    margin: 10px 30px;
  }
</style>
