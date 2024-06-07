<script setup lang="ts">
    import CryptoTable from '@/components/CryptoTable.vue'
    import AdminOptions from '@/components/AdminOptions.vue'
    import UserOptions from '@/components/UserOptions.vue'
    import { useAuth } from '@/stores/auth'



    const { role } = useAuth()
</script>

<template>

    <AdminOptions v-if="role === 'admin'"/>
    <UserOptions v-if="role === 'user'"/>
    <CryptoTable></CryptoTable>

</template>
