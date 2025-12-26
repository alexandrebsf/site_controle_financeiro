import { Expense } from "@/data/types"


 export const expenses: Expense[] = [
  // Setembro
  { date: "2025-09-05", amount: 120, importance:"Not Essential", category: "Alimentação", person: "Alexandre", payment: "Cartão Nubank" },
  { date: "2025-09-10", amount: 300, importance:"Essential", category: "Aluguel", person: "Alexandre", payment: "Pix" },
  { date: "2025-09-18", amount: 90, importance:"Not Essential", category: "Transporte", person: "Maria", payment: "Pix" },

  // Outubro
  { date: "2025-10-03", amount: 150, importance:"Essential", category: "Alimentação", person: "Maria", payment: "Cartão Itaú" },
  { date: "2025-10-08", amount: 300, importance:"Essential", category: "Aluguel", person: "Alexandre", payment: "Pix" },
  { date: "2025-10-20", amount: 200, importance:"Not Essential", category: "Lazer", person: "Maria", payment: "Cartão Itaú" },
 
  // Novembro
  { date: "2025-11-01", amount: 120, importance:"Essential", category: "Alimentação", person: "Alexandre", payment: "Cartão Nubank" },
  { date: "2025-11-02", amount: 80, importance:"Not Essential", category: "Transporte", person: "Maria", payment: "Pix" },
  { date: "2025-11-03", amount: 300, importance:"Essential", category: "Aluguel", person: "Alexandre", payment: "Pix" },
  { date: "2025-11-05", amount: 150, importance:"Not Essencial", category: "Lazer", person: "Maria", payment: "Cartão Itaú" },
 
]

