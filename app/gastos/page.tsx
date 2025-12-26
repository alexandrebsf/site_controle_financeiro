"use client"

import { useState, useMemo } from "react"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Trash2, Edit2, Check, X } from "lucide-react"

import { getExpenses } from "@/services/finance.service"
import type { Expense } from "@/data/types"

import { ComboBoxFilter } from "@/components/combobox"

export default function Gastos() {
  const [expenses, setExpenses] = useState<Expense[]>(getExpenses())
  const [editingIndex, setEditingIndex] = useState<number | null>(null)

  const [formData, setFormData] = useState<Expense>({
    date: "",
    amount: 0,
    category: "",
    person: "",
    payment: "",
  })

  const [filterCategory, setFilterCategory] = useState("all")
  const [filterPerson, setFilterPerson] = useState("all")
  const [filterPayment, setFilterPayment] = useState("all")
  const [filterStartDate, setFilterStartDate] = useState("")
  const [filterEndDate, setFilterEndDate] = useState("")

  const uniqueCategories = Array.from(new Set(expenses.map(e => e.category)))
  const uniquePersons = Array.from(new Set(expenses.map(e => e.person)))
  const uniquePayments = Array.from(new Set(expenses.map(e => e.payment)))

  const clearFilters = () => {
    setFilterCategory("all")
    setFilterPerson("all")
    setFilterPayment("all")
    setFilterStartDate("")
    setFilterEndDate("")
  }

  const filteredExpenses = expenses.filter(e => {
    const matchCategory =
      filterCategory === "all" || e.category === filterCategory

    const matchPerson =
      filterPerson === "all" || e.person === filterPerson

    const matchPayment =
      filterPayment === "all" || e.payment === filterPayment

    const matchStart = !filterStartDate || e.date >= filterStartDate
    const matchEnd = !filterEndDate || e.date <= filterEndDate

    return (
      matchCategory &&
      matchPerson &&
      matchPayment &&
      matchStart &&
      matchEnd
    )
  })

  const totalFiltered = useMemo(
    () => filteredExpenses.reduce((sum, e) => sum + e.amount, 0),
    [filteredExpenses]
  )

  const averageFiltered = useMemo(
    () =>
      filteredExpenses.length
        ? totalFiltered / filteredExpenses.length
        : 0,
    [totalFiltered, filteredExpenses]
  )

  const handleCreate = () => {
    if (!formData.category || !formData.person || !formData.payment || !formData.date) return
    setExpenses([formData, ...expenses])
    resetForm()
  }

  const handleEdit = (index: number) => {
    setEditingIndex(index)
    setFormData(expenses[index])
  }

  const handleUpdate = () => {
    if (editingIndex === null) return
    const updated = [...expenses]
    updated[editingIndex] = formData
    setExpenses(updated)
    resetForm()
  }

  const handleDelete = (index: number) => {
    setExpenses(expenses.filter((_, i) => i !== index))
  }

  const resetForm = () => {
    setEditingIndex(null)
    setFormData({
      date: "",
      amount: 0,
      category: "",
      person: "",
      payment: "",
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-gray-100 relative overflow-hidden">

      {/* gradiente radial superior esmeralda */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.2),_transparent_60%)]" />

      {/* gradiente radial inferior rosa */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(236,72,153,0.2),_transparent_60%)]" />

      <div className="relative z-10 max-w-7xl mx-auto py-12 px-4 space-y-5">

        {/* HEADER */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white">Gastos</h1>
          <p className="text-zinc-400 mt-2">
            Cadastro e gerenciamento dos gastos familiares
          </p>
        </div>

        {/* KPI CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">

          <Card className="bg-black/40 border-white/10 backdrop-blur-xl shadow-xl p-3">
            <CardHeader className="p-1 pb-0 pt-0">
              <CardTitle className="text-emerald-400 text-sm pb-0 pt-0 text-lg font-bold">
                Total filtrado:
              </CardTitle>
            </CardHeader>

            <CardContent className="p-2 pt-0 text-3xl font-bold text-blue-100">
              R$ {totalFiltered.toFixed(2)}
            </CardContent>
          </Card>

          <Card className="bg-black/40 border-white/10 backdrop-blur-xl shadow-xl p-3">
            <CardHeader className="p-1 pb-0 pt-0">
              <CardTitle className="text-cyan-400 text-sm pb-0 pt-0 text-lg font-bold">
                Quantidade:
              </CardTitle>
            </CardHeader>

            <CardContent className="p-2 pt-0 text-3xl font-bold text-blue-100">
              {filteredExpenses.length} itens
            </CardContent>
          </Card>

          <Card className="bg-black/40 border-white/10 backdrop-blur-xl shadow-xl p-3">
            <CardHeader className="p-1 pb-0 pt-0">
              <CardTitle className="text-pink-400 text-sm pb-0 pt-0 text-lg font-bold">
                Média por gasto:
              </CardTitle>
            </CardHeader>

            <CardContent className="p-2 pt-0 text-3xl font-bold text-blue-100">
              R$ {averageFiltered.toFixed(2)}
            </CardContent>
          </Card>

        </div>


        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* FORM */}
          <Card className="bg-black/40 border-white/10 backdrop-blur-xl shadow-xl text-blue-100">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">
                {editingIndex !== null ? "Editar gasto" : "Novo gasto"}
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <span>Data:</span>
              <Input
                type="date"
                value={formData.date}
                onChange={e => setFormData({ ...formData, date: e.target.value })}
                className="bg-white/5 border-white/10 text-white"
              />
              <span>Valor:</span>
              <Input
                type="number"
                placeholder="Valor"
                value={formData.amount || ""}
                onChange={e =>
                  setFormData({ ...formData, amount: Number(e.target.value) })
                }
                className="bg-white/5 border-white/10 text-white"
              />
              <span>Categoria:</span>
              <Input
                placeholder="Categoria"
                value={formData.category}
                onChange={e =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="bg-white/5 border-white/10 text-white"
              />

              <span>Pessoa:</span>
              <Input
                placeholder="Pessoa"
                value={formData.person}
                onChange={e =>
                  setFormData({ ...formData, person: e.target.value })
                }
                className="bg-white/5 border-white/10 text-white"
              />

              <span>Forma de pagamento:</span>
              <Input
                placeholder="Forma de pagamento"
                value={formData.payment}
                onChange={e =>
                  setFormData({ ...formData, payment: e.target.value })
                }
                className="bg-white/5 border-white/10 text-white"
              />

              <div className="flex gap-2">
                <Button
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700"
                  onClick={editingIndex !== null ? handleUpdate : handleCreate}
                >
                  {editingIndex !== null ? (
                    <>
                      <Check className="mr-2" size={16} /> Atualizar
                    </>
                  ) : (
                    "Registrar"
                  )}
                </Button>

                {editingIndex !== null && (
                  <Button variant="outline" onClick={resetForm}>
                    <X size={16} />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* LIST + FILTERS */}
          <Card className="lg:col-span-2 bg-black/40 border-white/10 backdrop-blur-xl shadow-xl  text-blue-100">
            <CardHeader className="space-y-4">
              <CardTitle className="text-2xl font-bold">Histórico de gastos</CardTitle>

              {/* FILTERS */}
              <div className="flex flex-nowrap gap-2 overflow-x-auto items-center">

                <ComboBoxFilter
                  items={uniqueCategories}
                  value={filterCategory}
                  onChange={setFilterCategory}
                  placeholder="Categoria"
                />

                <ComboBoxFilter
                  items={uniquePersons}
                  value={filterPerson}
                  onChange={setFilterPerson}
                  placeholder="Pessoa"
                />

                <ComboBoxFilter
                  items={uniquePayments}
                  value={filterPayment}
                  onChange={setFilterPayment}
                  placeholder="Pagamento"
                />

                <Input
                  type="date"
                  value={filterStartDate}
                  onChange={e => setFilterStartDate(e.target.value)}
                  className="bg-white/5 border-white/10 text-white"
                />

                <Input
                  type="date"
                  value={filterEndDate}
                  onChange={e => setFilterEndDate(e.target.value)}
                  className="bg-white/5 border-white/10 text-white"
                />

                <Button className="bg-black" variant="outline" onClick={clearFilters}>
                  Limpar
                </Button>
              </div>
            </CardHeader>

            <CardContent>
              <div className="space-y-3 max-h-105 overflow-y-auto">
                {filteredExpenses.map((expense, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition"
                  >
                    <div>
                      <p className="font-semibold text-white">{expense.category}</p>
                      <p className="text-xs text-zinc-400">
                        {expense.person} • {expense.payment} • {expense.date}
                      </p>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className="font-bold text-emerald-400">
                        R$ {expense.amount.toFixed(2)}
                      </span>

                      <button
                        onClick={() => handleEdit(index)}
                        className="p-2 rounded-lg hover:bg-emerald-900/30"
                      >
                        <Edit2 size={18} className="text-emerald-400" />
                      </button>

                      <button
                        onClick={() => handleDelete(index)}
                        className="p-2 rounded-lg hover:bg-red-900/30"
                      >
                        <Trash2 size={18} className="text-red-400" />
                      </button>
                    </div>
                  </div>
                ))}

                {filteredExpenses.length === 0 && (
                  <p className="text-center text-zinc-500 py-8">
                    Nenhum gasto encontrado com os filtros aplicados
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
