<script setup lang="ts">
import router from '@/router';
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const searchQuery = ref('')

const searchCrypto = () => {
  if (searchQuery.value.trim() !== '') {
    router.push({ name: 'cryptoDetailsByName', params: { name: searchQuery.value.trim() } })
  }
}

</script>

<template>
    <v-toolbar>
        <RouterLink to="/" class="toolbar-title"><h1>CryptoApp</h1></RouterLink>
        <v-spacer></v-spacer>
        <v-text-field
            v-model="searchQuery"
            append-icon="mdi-magnify"
            label="Buscar criptomoneda"
            single-line
            hide-details
            @click:append="searchCrypto"
            @keyup.enter="searchCrypto"
        ></v-text-field>
        <RouterLink to="/signIn" class="sign-in-icon">
            <v-icon>mdi-account</v-icon>
        </RouterLink>
    </v-toolbar>
</template>

<style scoped>
    .v-toolbar {
        display: flex;
        justify-content: space-between;
        padding: 15px 20px 15px 40px;
        background-color: #52a7f7;
    }

    .v-text-field {
        max-width: 400px;
    }

    .v-icon {
        cursor: pointer;
        margin: 0 20px 0 40px;
        color: #000;
        border-radius: 50%;
    }

    .v-icon:hover {
        border: 2px solid #afb0b1;
        background-color: #afb0b1;
    }

    .toolbar-title {
        cursor: pointer;
        text-decoration: none;
        color: #000;
    }
</style>