<script setup lang="ts">
    import { ref, onMounted } from 'vue'
    import { useTransactionsStore } from '@/stores/transactions'
    import { getToken, getUserData } from '@/stores/auth'

    const store = useTransactionsStore()
    const token = getToken()

    const storedEmail = localStorage.getItem('email')
    const userData = ref(null)

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
      <h2 class="table-title">Mis Criptomonedas</h2>
      <v-table>
        <thead>
          <tr>
            <th>
              <h2>ID Cripto</h2>
            </th>
            <th>
              <h2>Cantidad</h2>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(amount, cryptoName) in store.cryptos"
            :key="cryptoName"
          >
            <td>{{ cryptoName }}</td>
            <td>{{ amount }}</td>
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
    }
  
    .v-table > .v-table__wrapper > table > tbody > tr > th, 
    .v-table > .v-table__wrapper > table > thead > tr > th {
        text-align: center !important;
    }

    .table-title {
        padding-bottom: 30px;
    }
  </style>