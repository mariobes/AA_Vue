import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Crypto } from '@/core/crypto'


export const useCryptosStore = defineStore('cryptos', () => {
    const cryptos = ref<Crypto[]>([])


async function FetchAllCryptos() {
    try {
        const response = await fetch('http://localhost:4746/Cryptos')
        const cryptosInfo = await response.json()

        console.log('Información recibida:', cryptosInfo)

        cryptos.value = cryptosInfo
    } catch (ex) {
        console.error('Error al obtener las criptomonedas.', ex)
    }
}

async function DeleteCrypto(id: number) {
    try {
        await fetch(`http://localhost:4746/Cryptos/${id}`, {
        method: 'DELETE',
      })
      cryptos.value = cryptos.value.filter((Crypto) => Crypto.id !== id)
      alert('Criptomoneda eliminada correctamente')
    } catch (ex) {
      console.error('Error al borrar la criptomoneda. ', ex)
    }
  }

    

    return { cryptos, FetchAllCryptos, DeleteCrypto }
})


