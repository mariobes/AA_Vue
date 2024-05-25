<script setup lang="ts">
    import { useCryptosStore } from '@/stores/cryptos'
    import CryptoTable from '@/components/CryptoTable.vue'
    import AdminOptions from '@/components/AdminOptions.vue'
    import UserOptions from '@/components/UserOptions.vue'
    import { useAuth } from '@/stores/auth'

    const { GetAllCryptos } = useCryptosStore()
    GetAllCryptos()

    const { role } = useAuth()
</script>

<template>

    <AdminOptions v-if="role === 'admin'"/>
    <UserOptions v-if="role === 'user'"/>
    <CryptoTable></CryptoTable>

</template>
