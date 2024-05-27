import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Transaction } from '@/core/transaction'

export const useTransactionsStore = defineStore('transactions', () => {
  const transactions = ref<Transaction[]>([])

  async function GetAllTransactions(userId: number, token: string | null) {
    try {
        const response = await fetch(`http://localhost:4746/Transactions/${userId}`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })

          if (response.ok) {
            const usersInfo = await response.text() 
            transactions.value = JSON.parse(usersInfo)
          } else {
            console.error('Error al obtener las transacciones. Respuesta no exitosa.')
          }

    } catch (error) {
        console.error('Error al obtener las transacciones.', error)
        throw error;
    }
}


return { transactions, GetAllTransactions }
})
