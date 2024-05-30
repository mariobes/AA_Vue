<script setup lang="ts">
    import { ref, onMounted } from 'vue'
    import { useTransactionsStore } from '@/stores/transactions'
    import { getToken, getUserData } from '@/stores/auth'
    import { useI18n } from 'vue-i18n'

    const store = useTransactionsStore()
    const token = getToken()

    const storedEmail = localStorage.getItem('email')
    const userData = ref(null)

    const { t } = useI18n()

    onMounted(async () => {
        if (token && storedEmail) {
            try {
                userData.value = await getUserData(storedEmail)
                if (userData.value && userData.value.id) {
                    await store.GetCryptos(userData.value.id, token)
                }
            } catch (error) {
                console.error('Error al obtener los datos del usuario: ', error)
            }
        }
    })
</script>

<template>
    <div class="table-container">
      <h2 class="table-title">{{ t('TituloCriptomonedas') }}</h2>
      <v-table>
        <thead>
          <tr>
            <th>
              <h2>{{ t('Nombre') }}</h2>
            </th>
            <th>
              <h2>{{ t('Cantidad') }}</h2>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="cryptoName, amount, index in store.cryptos"
            :key="cryptoName"
            :class="{ 'background-gray': index % 2 === 1 }"
          >
            <td>{{ amount }}</td>
            <td>{{ cryptoName }}</td>
          </tr>
        </tbody>
      </v-table>
    </div>
    </template>
  
  <style scoped>
    .table-container {
        display: flex;
        flex-direction: column;        
        align-items: center;
        margin-top: 40px;
    }
  
    .v-table {
        width: 400px;
        text-align: center;
        padding-top: 10px;
        border: 1px solid gray;
        margin-bottom: 50px;
        max-height: 500px;
    }
  
    .v-table > .v-table__wrapper > table > tbody > tr > th, 
    .v-table > .v-table__wrapper > table > thead > tr > th {
        text-align: center !important;
    }

    .table-title {
        padding-bottom: 30px;
    }

    .background-gray {
      background-color: #ddd
    }
  </style>