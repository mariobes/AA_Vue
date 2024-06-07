import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Crypto, UpdateCrypto } from '@/core/crypto'


export const useCryptosStore = defineStore('cryptos', () => {
    const cryptos = ref<Crypto[]>([])


  async function GetAllCryptos(sortBy: string, order: string) {
    try {
        const response = await fetch(`http://localhost:4746/Cryptos?SortBy=${sortBy}&Order=${order}`)
        const cryptosInfo = await response.json()
        cryptos.value = cryptosInfo
    } catch (error) {
        console.error('Error al obtener las criptomonedas: ', error)
    }
  }

  async function UpdateCrypto(id: number, updatedCrypto: UpdateCrypto, token: string | null) {
      try {
          await fetch(`http://localhost:4746/Cryptos/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(updatedCrypto)
        })
      } catch (error) {
        console.error('Error al modificar la criptomoneda: ', error)
      }
  }

  async function AddCrypto(name: string, symbol: string, description: string, value: number, developer: string, descentralized: boolean, token: string | null) {
      try {
        const response = await fetch('http://localhost:4746/Cryptos', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
              name,
              symbol,
              description,
              value,
              developer,
              descentralized
            })
          })
          if (response.ok) {
            return true
          } else {
            console.error('Error al registrar la criptomoneda. Respuesta no exitosa.')
            return false
          }
      } catch (error) {
          console.error('Error al registrar la criptomoneda: ', error)
      }
  }

  async function DeleteCrypto(id: number, token: string | null) {
    try {
        const response = await fetch(`http://localhost:4746/Cryptos/${id}`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })
          if (response.ok) {
            return true
          } else {
            console.error('Error al eliminar la criptomoneda. Respuesta no exitosa.')
            return false
          }
    } catch (error) {
        console.error('Error al eliminar la criptomoneda: ', error)
        throw error;
    }
  }
    
  return { cryptos, GetAllCryptos, UpdateCrypto, AddCrypto, DeleteCrypto }
})


