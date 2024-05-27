export interface Transaction {
    id: number
    idUser: number
    idCrypto?: number
    concept: string
    amount: number
    date: Date
    charge: number
    payment_Method?: string
  }