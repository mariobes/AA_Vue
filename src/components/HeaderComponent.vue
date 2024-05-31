<script setup lang="ts">
import router from '@/router';
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'

const searchQuery = ref('')

const searchCrypto = () => {
  if (searchQuery.value.trim() !== '') {
    router.push({ name: 'cryptoDetailsByName', params: { name: searchQuery.value.trim() } })
  }
}

const { t, locale } = useI18n()
const languages: Array<'es' | 'en' | 'it'> = ['es', 'en', 'it']
const languageLabels: { [key in typeof languages[number]]: string } = {
  es: 'ESP',
  en: 'ENG',
  it: 'ITA'
}

const currentLanguageLabel = ref(languageLabels[locale.value as keyof typeof languageLabels])

const changeLanguage = () => {
  const currentIndex = languages.indexOf(locale.value as typeof languages[number])
  const nextIndex = (currentIndex + 1) % languages.length
  locale.value = languages[nextIndex]
  currentLanguageLabel.value = languageLabels[locale.value as keyof typeof languageLabels]
}
</script>

<template>
    <v-toolbar>
        <v-btn @click="changeLanguage">{{ currentLanguageLabel }}</v-btn>
        <RouterLink to="/" class="toolbar-title"><h1>CryptoApp</h1></RouterLink>
        <v-spacer></v-spacer>
        <v-text-field
            v-model="searchQuery"
            append-icon="mdi-magnify"
            :label="t('BuscadorCripto')"
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
        padding: 15px 20px 15px 20px;
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
        padding-left: 20px;
    }
</style>