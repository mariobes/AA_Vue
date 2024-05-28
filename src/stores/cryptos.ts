import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Crypto, UpdateCrypto } from '@/core/crypto'


export const useCryptosStore = defineStore('cryptos', () => {
    const cryptos = ref<Crypto[]>([])


  async function GetAllCryptos() {
    try {
        const response = await fetch('http://localhost:4746/Cryptos')
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
    
  return { cryptos, GetAllCryptos, UpdateCrypto }
})


