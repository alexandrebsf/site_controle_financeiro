"use client"

import React, { useMemo, useState } from "react"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

import { getExpenses, getMetas } from "@/services/finance.service"
import type { Expense, Meta, GastoMes } from "@/data/types"

import {
  Wallet,
  CreditCard,
  TrendingUp,
  Calendar,
  PieChart as PieIcon,
  BarChart3,
  UsersRound,
} from "lucide-react"

// CARD COMPONENT
function Card({
  title,
  icon,
  children,
}: {
  title: string
  icon?: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <div
      className="
      relative rounded-2xl p-5 border
      bg-zinc-900/70 border-zinc-800
      shadow-[0_0_0_1px_rgba(255,255,255,0.05)]
      backdrop-blur-md
    "
    >
      <div className="flex items-center gap-2 mb-3">
        {icon}
        <h3 className="text-xs uppercase tracking-wide text-zinc-400">
          {title}
        </h3>
      </div>

      {children}
      <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/5" />
    </div>
  )
}

// HELPERS
const formatDay = (date: string) => {
  const [, month, day] = date.split("-")
  return `${day}/${month}`
}

const formatMonthShort = (month: string) =>
  (
    {
      "01": "jan",
      "02": "fev",
      "03": "mar",
      "04": "abr",
      "05": "mai",
      "06": "jun",
      "07": "jul",
      "08": "ago",
      "09": "set",
      "10": "out",
      "11": "nov",
      "12": "dez",
    } as Record<string, string>
  )[month]

// DASHBOARD
export default function Dashboard() {
  const expenses: Expense[] = getExpenses()
  const metas: Meta[] = getMetas()

  const [selectedMonth, setSelectedMonth] = useState<string>("Todos")

  // meses existentes nos dados
  const availableMonths = useMemo(() => {
    const set = new Set<string>()
    expenses.forEach((e) => {
      const ym = e.date.slice(0, 7)
      set.add(ym)
    })
    return Array.from(set).sort()
  }, [expenses])

  // filtro “Todos”
  const expensesMonth =
    selectedMonth === "Todos"
      ? expenses
      : expenses.filter((e) => e.date.startsWith(selectedMonth))

  const totalMes = expensesMonth.reduce((s, e) => s + e.amount, 0)
  const metaMensal = metas.reduce((s, m) => s + m.limit, 0)
  const percentualMeta = metaMensal ? Math.round((totalMes / metaMensal) * 100) : 0

  const gastoPorPessoa = ["Alexandre", "Maria"].map((p) => ({
    name: p,
    value: expensesMonth
      .filter((e) => e.person === p)
      .reduce((s, e) => s + e.amount, 0),
  }))

  const gastoPorPagamento = Object.values(
    expensesMonth.reduce<Record<string, { name: string; value: number }>>(
      (acc, e) => {
        if (!acc[e.payment]) {
          acc[e.payment] = { name: e.payment, value: 0 }
        }
        acc[e.payment].value += e.amount
        return acc
      },
      {}
    )
  )

  const gastoPorCategoria = metas.map((meta) => {
    const spent = expensesMonth
      .filter((e) => e.category === meta.category)
      .reduce((s, e) => s + e.amount, 0)

    return {
      category: meta.category,
      spent,
      limit: meta.limit,
      percent: meta.limit ? Math.round((spent / meta.limit) * 100) : 0,
    }
  })

  const gastoPorDia = expensesMonth.map((e) => ({
    date: formatDay(e.date),
    value: e.amount,
  }))

  const gastoPorMes: GastoMes[] = Object.values(
    expenses.reduce<Record<string, GastoMes>>((acc, e) => {
      const [, month] = e.date.split("-")
      const label = formatMonthShort(month)

      if (!acc[label]) {
        acc[label] = { month: label, value: 0 }
      }

      acc[label].value += e.amount
      return acc
    }, {})
  )

  return (
    <main
      className="
        min-h-screen p-6 text-zinc-100 
        bg-[radial-gradient(circle_at_top,rgba(34,197,94,0.15),transparent_40%)]
        bg-black
      "
    >
      <div className="fixed inset-0 -z-10 bg-[linear-gradient(120deg,#020617_0%,#0b1120_35%,#020617_100%)]" />

      {/* HEADER */}
      <header className="mb-10 relative flex flex-col gap-3">
        <div className="flex gap-2 items-center">
          <TrendingUp className="w-7 h-7 text-emerald-400" />
          <h1 className="text-3xl font-bold">Dashboard Financeiro Familiar</h1>
        </div>

        {/* SELECT À ESQUERDA */}
        <div className="flex items-center gap-2 w-fit">
          <Calendar className="w-4 h-4 text-emerald-300" />

          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="
              bg-zinc-900/70 border border-zinc-800 text-sm
              px-3 py-2 rounded-lg shadow
              focus:outline-none
              focus:ring-1 focus:ring-emerald-400
            "
          >
            <option value="Todos">Todos</option>

            {availableMonths.map((m) => {
              const [year, month] = m.split("-")
              return (
                <option key={m} value={m}>
                  {`${formatMonthShort(month)}/${year}`}
                </option>
              )
            })}
          </select>
        </div>
      </header>




      {/* KPIs */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-5">

        <Card title="Gasto total no mês" icon={<Wallet className="w-4 h-4 text-emerald-400" />}>
          <p className="text-3xl font-bold bg-gradient-to-r from-emerald-300 to-emerald-600 bg-clip-text text-transparent">
            R$ {totalMes}
          </p>

          <p className="text-sm text-zinc-400 mb-2">
            Meta: R$ {metaMensal}
          </p>

          <div className="w-full bg-zinc-800 h-2 rounded-full">
            <div
              className="h-2 rounded-full bg-gradient-to-r from-emerald-400 to-green-600"
              style={{ width: `${percentualMeta}%` }}
            />
          </div>

          <p className="text-xs text-zinc-400 mt-2">
            {percentualMeta}% da meta utilizada
          </p>

          <ResponsiveContainer width="100%" height={100} className="mt-2 text-xs">
            <BarChart data={gastoPorPessoa} layout="vertical">
              <XAxis type="number" stroke="#a1a1aa" />
              <YAxis type="category" dataKey="name" stroke="#a1a1aa" />
              <Tooltip
                    contentStyle={{
                      backgroundColor: "#0a0a0a",
                      border: "1px solid #27272a",
                      borderRadius: "8px",
                    }}
                    labelStyle={{ color: "#e4e4e7" }}
                    itemStyle={{ color: "#9ce4b0ff", fontWeight: "bold", fontSize:"14px"}}
                  />
              <Bar dataKey="value" fill="#22c55e" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Gasto por forma de pagamento" icon={<CreditCard className="w-4 h-4 text-purple-400" />}>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={gastoPorPagamento}>
              <XAxis dataKey="name" stroke="#a1a1aa" />
              <YAxis stroke="#a1a1aa" />
             <Tooltip
                    contentStyle={{
                      backgroundColor: "#0a0a0a",
                      border: "1px solid #27272a",
                      borderRadius: "8px",
                    }}
                    labelStyle={{ color: "#e4e4e7" }}
                    itemStyle={{ color: "#9ce4b0ff", fontWeight: "bold"}}
                  />
              <Bar dataKey="value" fill="#a855f7" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Gastos por categoria" icon={<PieIcon className="w-4 h-4 text-blue-400" />}>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={gastoPorCategoria}
                dataKey="spent"
                nameKey="category"
                innerRadius={45}
                outerRadius={80}
              >
                {gastoPorCategoria.map((_, i) => (
                  <Cell
                    key={i}
                    fill={["#22c55e", "#f97316", "#3b82f6", "#ef4444"][i % 4]}
                  />
                ))}
              </Pie>
              <Tooltip
                    contentStyle={{
                      backgroundColor: "#0a0a0a",
                      border: "1px solid #27272a",
                      borderRadius: "8px",
                    }}
                    labelStyle={{ color: "#e4e4e7" }}
                    itemStyle={{ color: "#9ce4b0ff", fontWeight: "bold"}}
                  />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </section>

      {/* METAS */}
      <section className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {gastoPorCategoria.map(meta => (
          <Card key={meta.category} title={meta.category} icon={<BarChart3 className="w-4 h-4 text-emerald-300" />}>
            <p className="text-sm">
              R$ {meta.spent} / R$ {meta.limit}
            </p>

            <div className="w-full bg-zinc-800 h-1 rounded-full mt-2">
              <div
                className="h-2 rounded-full bg-gradient-to-r from-emerald-400 via-amber-400 to-red-500"
                style={{ width: `${meta.percent}%` }}
              />
            </div>

            <p className="text-xs text-zinc-400 mt-2">
              {meta.percent}% da meta
            </p>
          </Card>
        ))}
      </section>

      {/* GRÁFICOS */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10 mt-8">

        <Card title="Gasto diário (DD/MM)" icon={<UsersRound className="w-4 h-4 text-cyan-300" />}>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={gastoPorDia}>
              <XAxis dataKey="date" stroke="#a1a1aa" />
              <YAxis stroke="#a1a1aa" />
              <Tooltip
                    contentStyle={{
                      backgroundColor: "#0a0a0a",
                      border: "1px solid #27272a",
                      borderRadius: "8px",
                    }}
                    labelStyle={{ color: "#e4e4e7" }}
                    itemStyle={{ color: "#9ce4b0ff", fontWeight: "bold"}}
                  />
              <Line dataKey="value" stroke="#22c55e" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Gasto por mês" icon={<BarChart3 className="w-4 h-4 text-pink-400" />}>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={gastoPorMes}>
              <XAxis dataKey="month" stroke="#a1a1aa" />
              <YAxis stroke="#a1a1aa" />
              <Tooltip
                    contentStyle={{
                      backgroundColor: "#0a0a0a",
                      border: "1px solid #27272a",
                      borderRadius: "8px",
                    }}
                    labelStyle={{ color: "#e4e4e7" }}
                    itemStyle={{ color: "#9ce4b0ff", fontWeight: "bold"}}
                  />
              <Bar dataKey="value" fill="#06b6d4" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </section>
    </main>
  )
}
