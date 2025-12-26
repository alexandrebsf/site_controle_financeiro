export type Expense = {
  id?: string        // já pensando em banco
  date: string
  amount: number
  importance: string
  category: string
  person: string
  payment: string
}

export type Meta = {
  id?: string
  category: string
  limit: number
  active: boolean
}

export type GastoMes = {
  month: string
  value: number
}