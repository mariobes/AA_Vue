export interface Crypto {
    id: number
    name: string
    symbol: string
    description: string
    registerDate: Date
    value: number
    developer: string
    descentralized: boolean
}

export interface UpdateCrypto {
  name: string
  symbol: string
  description: string
  value: number
  developer: string
  descentralized: boolean
}