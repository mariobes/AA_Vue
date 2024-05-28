<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useCryptosStore } from '@/stores/cryptos'
import { useTransactionsStore } from '@/stores/transactions'
import { getToken, useAuth, getUserData } from '@/stores/auth'

const token = getToken()
const { role } = useAuth()

const storeCryptos = useCryptosStore()
const storeTransactions = useTransactionsStore()

const storedEmail = localStorage.getItem('email')

const userData = ref({})
const amount = ref<number>(0)
const dialog = ref(false) 

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
  <div class="table-container">
    <v-table>
      <thead>
        <tr>
          <th>
            <h2>Nombre</h2>
          </th>
          <th>
            <h2>Símbolo</h2>
          </th>
          <th>
            <h2>Valor</h2>
          </th>
          <th>
            <h2>Desarrollador</h2>
          </th>
          <th class="narrow-column">
            <h2>Descentralizada</h2>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="crypto in storeCryptos.cryptos"
          :key="crypto.id"
        >
          <td>
            <h4>
              <RouterLink :to="{ path: `/cryptoDetails/${crypto.id}` }" class="crypto-name">{{ crypto.name }}</RouterLink>
            </h4>
          </td>
          <td>{{ crypto.symbol }}</td>
          <td>{{ crypto.value }} €</td>
          <td>{{ crypto.developer }}</td>
          <td>{{ crypto.descentralized ? 'Sí' : 'No' }}</td>
          <td v-if="role === 'admin'">
            <RouterLink :to="{ path: `/updateCrypto/${crypto.id}` }" class="card-btn">
              <v-btn>Editar</v-btn>
            </RouterLink>
          </td>
          <td v-if="role === 'user'">
            <v-dialog max-width="300">
              <template v-slot:activator="{ props: activatorProps }">
                <v-btn
                  v-bind="activatorProps"
                  text="Comprar"
                  variant="flat"
                ></v-btn>
              </template>
              <template v-slot:default="{ isActive }">
                <v-card>
                  <v-card-title>
                      <div class="title-popup">Comprar {{ crypto.name }}
                      <v-btn class="close-btn" size="small" icon @click="isActive.value = false">
                        <v-icon color="grey lighten-1">mdi-close</v-icon>
                      </v-btn>
                    </div>
                  </v-card-title>                      
                  <v-card-text>
                    <v-text-field
                      v-model="amount"
                      label="EUROS"
                      type="number"
                    ></v-text-field>
                  </v-card-text>
                  <v-card-actions>
                    <v-btn
                      @click="handleBuy(crypto.id)"
                    >
                      Comprar
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
      justify-content: center;
      margin-top: 60px;
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

  .v-btn {
      display: flex;
      margin-left: auto;
      margin-right: auto;
      color: #52a7f7;
      font-weight: bold;
      border: 1px solid #52a7f7;
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
</style>
