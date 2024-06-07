<script setup lang="ts">
    import { ref } from 'vue'
    import { useCryptosStore  } from '@/stores/cryptos'
    import router from '@/router';
    import { getToken } from '@/stores/auth'
    import { useI18n } from 'vue-i18n'

    const token = getToken()
    const store = useCryptosStore()
    const errorMessage = ref('')

    const name = ref('')
    const symbol = ref('')
    const value = ref<number | null>(null)
    const developer = ref('')
    const description = ref('')
    const descentralized = ref<boolean>(false)
    
    const valid = ref(false)

    const { t } = useI18n()

    const handleSubmit = async () => {
        try {
            errorMessage.value = ''
            const cryptoRegistered = await store.AddCrypto(name.value, symbol.value, description.value, value.value, developer.value, descentralized.value, token)
            if (cryptoRegistered) {
                router.push({ name: 'home' })
            } else {
                errorMessage.value = 'Error. Alguno de los parámetros es incorrecto o el nombre introducido ya se encuentra registrado.'
            }
        } catch (error) {
            console.error('Se ha producido un error al actualizar la criptomoneda: ', error)
            throw error
        }
    }
</script>

<template>
  <v-form v-model="valid" @submit.prevent="handleSubmit">
    <v-container>
      <h2 class="title-add-crypto">{{ t('TituloRegistrarCripto') }}</h2>
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
          <v-btn class="mt-2" type="submit">{{ t('RegistrarBtn') }}</v-btn>
          <v-alert v-if="errorMessage" type="error" class="mt-2">{{ errorMessage }}</v-alert>
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

  .title-add-crypto {
    text-align: center; 
    padding-bottom: 50px;
    font-size: 30px 
  }

  .v-alert {
        margin-bottom: 30px;
    }
</style>