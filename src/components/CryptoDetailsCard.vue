<script setup lang="ts">
    import { onMounted, ref, watch } from 'vue'
    import { useRoute } from 'vue-router'
    import type { Crypto } from '@/core/crypto'
    import { useCryptosStore } from '@/stores/cryptos'
    import { getToken, useAuth, getUserData } from '@/stores/auth'
    import { useTransactionsStore } from '@/stores/transactions'
    import { useI18n } from 'vue-i18n'

    const token = getToken()
    const { role } = useAuth()

    const storeCryptos = useCryptosStore()
    const storeTransactions = useTransactionsStore()

    const route = useRoute()
    const crypto = ref<Crypto | null>(null)

    const { t } = useI18n()

    const loadCrypto = () => {
        const cryptoId = parseInt(route.params.id as string)
        crypto.value = storeCryptos.cryptos.find(c => c.id === cryptoId) || null

        if (!crypto.value) {
          const cryptoName = route.params.name as string
          crypto.value = storeCryptos.cryptos.find(c => c.name.toLowerCase() === cryptoName.toLowerCase()) || null
        }
    }

    onMounted(() => {
        loadCrypto()
    })

    watch(route, () => {
        loadCrypto()
    })

    const storedEmail = localStorage.getItem('email')

    const userData = ref({})
    const amount = ref<number>(0)
    const dialog = ref(false) 

    const handleBuy = async (cryptoId: number) => {
      const success = await storeTransactions.BuyCrypto(userData.value.id, cryptoId, amount.value, token)
      if (success) {
        userData.value.cash -= parseFloat(amount.value.toString()) 
        userData.value.wallet += parseFloat(amount.value.toString()) 
        amount.value = 0
        console.log('Compra realizada con éxito')
        dialog.value = false 
      } else {
        console.error('Error al comprar la criptomoneda')
      }
    }

    onMounted(async () => {
      try {
        if (storedEmail) {
          userData.value = await getUserData(storedEmail)
        }
      } catch (error) {
        console.error('Error al obtener los datos del usuario: ', error)
      }
    })
</script>

<template>
    <v-container>
      <v-row justify="center" class="fill-height">
        <v-col cols="12" md="4">
          <v-card v-if="crypto" class="crypto-card">
            <v-card-title class="text-center">{{ crypto.name }}</v-card-title>
            <v-card-subtitle class="text-center">{{ crypto.symbol }}</v-card-subtitle>
            <v-card-text>{{ crypto.description }}</v-card-text>
            <v-card-subtitle>{{ t('DesarrolladorCripto') }}: {{ crypto.developer }}</v-card-subtitle>
            <v-card-subtitle>{{ t('ValorCripto') }}: {{ crypto.value }} €</v-card-subtitle>
            <v-card-subtitle>{{ t('FechaRegistroCripto') }}: {{ new Date(crypto.registerDate).toLocaleDateString() }}</v-card-subtitle>
            <v-card-subtitle>{{ t('DescentralizadaCripto') }}: {{ crypto.descentralized ? 'Sí' : 'No' }}</v-card-subtitle>
            <div v-if="role === 'admin'">
              <RouterLink :to="{ path: `/updateCrypto/${crypto.id}` }" class="card-btn">
                <v-btn>{{ t('EditarBtn') }}</v-btn>
              </RouterLink>
            </div>
            <div v-if="role === 'user'">
                <v-dialog max-width="300">
                  <template v-slot:activator="{ props: activatorProps }">
                    <v-btn
                      v-bind="activatorProps"
                      text="Comprar"
                      variant="flat"
                    ></v-btn>
                  </template>
                  <template v-slot:default="{ isActive }">
                    <v-card>
                      <v-card-title>
                          <div class="title-popup">Comprar {{ crypto.name }}
                          <v-btn class="close-btn" size="small" icon @click="isActive.value = false">
                            <v-icon color="grey lighten-1">mdi-close</v-icon>
                          </v-btn>
                        </div>
                      </v-card-title>                      
                      <v-card-text>
                        <v-text-field
                          v-model="amount"
                          label="EUROS"
                          type="number"
                        ></v-text-field>
                      </v-card-text>
                      <v-card-actions>
                        <v-btn
                          class="buy-btn"
                          @click="handleBuy(crypto.id)"
                        >
                        {{ t('ComprarBtn') }}
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </template>
              </v-dialog>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>

<style scoped>
    .v-container {
        padding-top: 100px;
    }

    .crypto-card {
        padding: 10px 0;
        max-width: 500px;
    }

    .v-btn {
      margin-top: 15px;
      display: flex;
      margin-left: auto;
      margin-right: auto;
      color: #52a7f7;
      font-weight: bold;
      border: 1px solid #52a7f7;
  }

  .buy-btn {
    margin-bottom: 30px;
    margin-top: 0;
  }

  .card-btn {
    text-decoration: none;
  }

  .close-btn {
    border: none;
  }
  
  .title-popup {
    display: flex;
    align-items: center;
    margin-left: 10px;
  }

  .title-popup .v-btn {
    margin-bottom: 10px;
    margin-left: 60px;
  }
  </style>
