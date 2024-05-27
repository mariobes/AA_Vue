export interface Transaction {
    id: number
    userId: number
    cryptoId?: number
    concept: string
    amount: number
    date: Date
    charge: number
    payment_Method?: string
  }