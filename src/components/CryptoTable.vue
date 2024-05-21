<script setup lang="ts">
    import type { Crypto } from '@/core/crypto'
    import { useCryptosStore } from '@/stores/cryptos'

    const store = useCryptosStore()
</script>

<template>
    <v-table theme="dark">
      <thead>
        <tr>
          <th class="text-left">
            Name
          </th>
          <th class="text-left">
            Precio
          </th>
          <th>
            Borrar
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="crypto in store.cryptos"
          :key="crypto.id"
        >
          <td>{{ crypto.name }}</td>
          <td>{{ crypto.value }}</td>
          <td><v-btn @click="store.DeleteCrypto(crypto.id)">Eliminar</v-btn></td>
        </tr>
      </tbody>
    </v-table>
  </template>
