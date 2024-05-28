import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Transaction } from '@/core/transaction'

export const useTransactionsStore = defineStore('transactions', () => {
  const transactions = ref<Transaction[]>([])
  const cryptos = ref<Record<string, number>>({})

  async function GetTransactions(userId: number, token: string | null) {
    try {
        const response = await fetch(`http://localhost:4746/Transactions/${userId}`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })

          if (response.ok) {
            const transactionsInfo = await response.text() 
            transactions.value = JSON.parse(transactionsInfo)
          } else {
            console.error('Error al obtener las transacciones. Respuesta no exitosa.')
          }

    } catch (error) {
        console.error('Error al obtener las transacciones: ', error)
        throw error;
    }
  }

async function GetCryptos(userId: number, token: string | null) {
    try {
        const response = await fetch(`http://localhost:4746/Transactions/${userId}/cryptos`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })

          if (response.ok) {
            const cryptosInfo = await response.text() 
            cryptos.value = JSON.parse(cryptosInfo)
          } else {
            console.error('Error al obtener las criptomonedas. Respuesta no exitosa.')
          }

    } catch (error) {
        console.error('Error al obtener las criptomonedas: ', error)
        throw error;
    }
}

async function MakeDeposit(userId: number, amount: number, token: string | null) {
  try {
      const response = await fetch(`http://localhost:4746/Transactions/deposit`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
             userId,
             amount,
             paymentMethod: 'Tarjeta de crédito'
          })
        })

        if (response.ok) {
          return true
        } else {
          console.error('Error al realizar el depósito. Respuesta no exitosa.')
          return false
        }

  } catch (error) {
      console.error('Error al realizar el depósito: ', error)
      throw error;
  }
}

async function BuyCrypto(userId: number, cryptoId: number, amount: number, token: string | null) {
  try {
      const response = await fetch(`http://localhost:4746/Transactions/buycrypto`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
             userId,
             cryptoId,
             amount
          })
        })

        if (response.ok) {
          return true
        } else {
          console.error('Error al realizar la compra. Respuesta no exitosa.')
          return false
        }

  } catch (error) {
      console.error('Error al realizar la compra: ', error)
      throw error;
  }
}

return { transactions, cryptos, GetTransactions, GetCryptos, MakeDeposit, BuyCrypto }
})
