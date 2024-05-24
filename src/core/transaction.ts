export interface Transaction {
    id: number
    idUser: number
    idCrypto?: number
    concept: string
    amount: number
    date: Date
    Charge: number
    payment_Method?: string
    
  }