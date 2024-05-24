<script setup lang="ts">
    import { onMounted, ref, watch } from 'vue'
    import { useRoute } from 'vue-router'
    import type { Crypto } from '@/core/crypto'
    import { useCryptosStore } from '@/stores/cryptos'

    const store = useCryptosStore()
    const route = useRoute()
    const crypto = ref<Crypto | null>(null)

    const loadCrypto = () => {
        const cryptoId = parseInt(route.params.id as string)
        crypto.value = store.cryptos.find(c => c.id === cryptoId) || null
    }

    onMounted(() => {
        loadCrypto()
    })

    watch(route, () => {
        loadCrypto()
    })
</script>

<template>
    <v-container>
      <v-row justify="center" class="fill-height">
        <v-col cols="12" md="4">
          <v-card v-if="crypto">
            <v-card-title class="text-center">{{ crypto.name }}</v-card-title>
            <v-card-subtitle class="text-center">{{ crypto.symbol }}</v-card-subtitle>
            <v-card-text>{{ crypto.description }}</v-card-text>
            <v-card-subtitle>Desarrollador: {{ crypto.developer }}</v-card-subtitle>
            <v-card-subtitle>Valor: {{ crypto.value }} €</v-card-subtitle>
            <v-card-subtitle>Fecha de Registro: {{ new Date(crypto.registerDate).toLocaleDateString() }}</v-card-subtitle>
            <v-card-subtitle>Descentralizada: {{ crypto.descentralized ? 'Sí' : 'No' }}</v-card-subtitle>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>

<style scoped>
    .v-container {
        padding-top: 100px;
    }

    .v-card {
        padding: 10px 0;
        max-width: 300px;
    }

</style>