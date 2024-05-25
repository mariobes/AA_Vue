<script setup>
import { ref } from 'vue'
import { useCryptosStore } from '@/stores/cryptos'
import { useAuth } from '@/stores/auth'
import PopUpBuyCrypto from '@/components/PopUpBuyCrypto.vue'

const store = useCryptosStore()
const { role } = useAuth()

const dialogVisible = ref(false)

const openDialog = () => {
  dialogVisible.value = true
}

const closeDialog = () => {
  dialogVisible.value = false
}
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
          v-for="crypto in store.cryptos"
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
            <RouterLink :to="{ path: `/updateCrypto/${crypto.id}` }">
              <v-btn>Editar</v-btn>
            </RouterLink>
          </td>
          <td v-if="role === 'user'">
            <PopUpBuyCrypto :dialogVisible="dialogVisible" @closeDialog="closeDialog" />
            <v-btn @click="openDialog">Comprar</v-btn>
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
    color: #52a7f7;
    font-weight: bold;
    border: 1px solid #52a7f7;
  }
</style>
