<script setup lang="ts">
    import { useCryptosStore } from '@/stores/cryptos'
    import CryptosTable from '@/components/CryptoTable.vue'
    import AdminOptions from '@/components/AdminOptions.vue'
    import { useAuth } from '@/stores/auth'

    const { FetchAllCryptos } = useCryptosStore()
    FetchAllCryptos()

    const { role } = useAuth()
</script>

<template>

    <AdminOptions v-if="role === 'admin'"/>
    <CryptosTable></CryptosTable>

</template>
