<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
    <v-footer>{{ t('Footer') }}</v-footer>
</template>

<style scoped>
    .v-footer {
        padding: 30px;
        justify-content: center;
        background-color: #d0d3d6;
    }
</style>