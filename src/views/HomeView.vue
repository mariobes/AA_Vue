<script setup lang="ts">
    import { useCryptosStore } from '@/stores/cryptos'
    import CryptosTable from '@/components/CryptoTable.vue'

    const { FetchAllCryptos } = useCryptosStore()
    FetchAllCryptos()
</script>

<template>

    <CryptosTable></CryptosTable>

</template>
