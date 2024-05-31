<script setup lang="ts">
    import { onMounted, ref, watch } from 'vue'
    import { useRoute } from 'vue-router'
    import type { Crypto, UpdateCrypto } from '@/core/crypto'
    import { useCryptosStore } from '@/stores/cryptos'
    import router from '@/router';
    import { getToken } from '@/stores/auth'
    import { useI18n } from 'vue-i18n'

    const token = getToken()

    const store = useCryptosStore()
    const route = useRoute()
    const crypto = ref<Crypto | null>(null)

    const name = ref('')
    const symbol = ref('')
    const value = ref<number | null>(null)
    const developer = ref('')
    const description = ref('')
    const descentralized = ref<boolean | null>(null)
    
    const valid = ref(false)

    const { t } = useI18n()

    const loadCrypto = () => {
        const cryptoId = parseInt(route.params.id as string)
        crypto.value = store.cryptos.find((c: { id: number; }) => c.id === cryptoId) || null
        console.log(cryptoId);

        if (crypto.value) {
            name.value = crypto.value.name;
            symbol.value = crypto.value.symbol;
            value.value = crypto.value.value;
            developer.value = crypto.value.developer;
            description.value = crypto.value.description;
            descentralized.value = crypto.value.descentralized;
        }
    }
    
    onMounted(() => {
        loadCrypto()
    })

    watch(route, () => {
        loadCrypto()

    })

    const handleSubmit = async () => {
        const cryptoId = parseInt(route.params.id as string)
        const updatedCrypto: UpdateCrypto = {
            name: name.value,
            symbol: symbol.value,
            value: value.value!,
            developer: developer.value,
            description: description.value,
            descentralized: descentralized.value!,
        }

        if (token) {
          await store.UpdateCrypto(cryptoId, updatedCrypto, token)
          router.push({ name: 'home' })
        }
    }
</script>

<template>
  <v-form v-model="valid" @submit.prevent="handleSubmit">
    <v-container>
      <v-row>
        <v-col
          cols="12"
          md="6"
        >
          <v-text-field
            v-model="name"
            :label="t('NombreCripto')"
            required
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          md="6"
        >
          <v-text-field
            v-model="symbol"
            :label="t('SimboloCripto')"
            required
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          md="6"
        >
          <v-text-field
            v-model="value"
            :label="t('ValorCripto')"
            type="number"
            required
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          md="6"
        >
          <v-text-field
            v-model="developer"
            :label="t('DesarrolladorCripto')"
            required
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
        >
          <v-text-field
            v-model="description"
            :label="t('DescripcionCripto')"
            required
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          md="6"
        >
        <v-checkbox
            v-model="descentralized"
            :label="t('DescentralizadaCriptoPregunta')"
            required
          ></v-checkbox>
          <v-btn class="mt-2" type="submit">{{ t('EditarBtn') }}</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<style scoped>
  .v-container {
    padding-top: 60px;
    width: 50%;
  }

  .v-btn {
    background-color: #52a7f7;
    margin-bottom: 50px
  }
</style>