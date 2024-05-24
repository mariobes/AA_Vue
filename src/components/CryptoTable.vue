<script setup lang="ts">
    import { RouterLink, RouterView } from 'vue-router'
    import type { Crypto } from '@/core/crypto'
    import { useCryptosStore } from '@/stores/cryptos'

    const store = useCryptosStore()
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
          <!--<th>
            <h2>Borrar</h2>
          </th>-->
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="crypto in store.cryptos"
          :key="crypto.id"
        >
          <td>
            <h4>
              <RouterLink :to="{ path: `/cryptoDetails/${crypto.id}` }" class="crypto-name">{{  crypto.name }}</RouterLink>
            </h4>
          </td>
          <td>{{ crypto.symbol }}</td>
          <td>{{ crypto.value }} €</td>
          <td>{{ crypto.developer }}</td>
          <!--<td><v-btn @click="store.DeleteCrypto(crypto.id)">Eliminar</v-btn></td>-->
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

  .crypto-name {
    text-decoration: none;
    color: inherit; 
  }

  .crypto-name:hover {
    text-decoration: underline;
    color: #000; 
  }
</style>
