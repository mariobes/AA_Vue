<script setup lang="ts">
    import { ref, onMounted } from 'vue'
    import { useTransactionsStore } from '@/stores/transactions'
    import { getToken, getUserData } from '@/stores/auth'
    import { useI18n } from 'vue-i18n'

    const store = useTransactionsStore()
    const token = getToken()

    const storedEmail = localStorage.getItem('email')
    const userData = ref<{ id?: number } | null>(null);

    const { t } = useI18n()

    onMounted(async () => {
        if (token && storedEmail) {
            try {
                userData.value = await getUserData(storedEmail)
                if (userData.value && userData.value.id) {
                    await store.GetTransactions(userData.value.id, token)
                }
            } catch (error) {
                console.error('Error al obtener los datos del usuario: ', error)
            }
        }
    })
</script>

<template>
    <div class="table-container">
      <h2 class="table-title">{{ t('TituloTransacciones') }}</h2>
      <v-table>
        <thead>
          <tr>
            <th>
              <h2>{{ t('IDTransaccion') }}</h2>
            </th>
            <th>
              <h2>{{ t('IDCripto') }}</h2>
            </th>
            <th>
              <h2>{{ t('Concepto') }}</h2>
            </th>
            <th>
              <h2>{{ t('Cantidad') }}</h2>
            </th>
            <th>
              <h2>{{ t('FechaCompra') }}</h2>
            </th>
            <th>
              <h2>{{ t('MetodoPago') }}</h2>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="transaction, index in store.transactions"
            :key="transaction.id"
            :class="{ 'background-gray': index % 2 === 1 }"
          >
            <td>{{ transaction.id }}</td>
            <td>{{ transaction.cryptoId ?? '---' }}</td>
            <td>{{ transaction.concept }}</td>
            <td>{{ transaction.amount }}</td>
            <td>{{ transaction.date }}</td>
            <td>{{ transaction.payment_Method ?? '---' }}</td>
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
        margin-top: 20px;
    }
  
    .v-table {
        width: 80%;
        text-align: center;
        padding-top: 10px;
        border: 1px solid gray;
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