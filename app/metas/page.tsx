"use client"

import { useEffect, useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Trash2, Edit2, Check, X, Target } from "lucide-react"

import { Meta } from "@/data/types"
import { getMetas } from "@/services/finance.service"

export default function MetasPage() {
  const [metas, setMetas] = useState<Meta[]>([])
  const [editingIndex, setEditingIndex] = useState<number | null>(null)

  const [formData, setFormData] = useState<Meta>({
    category: "",
    limit: 0,
  })

  useEffect(() => {
    setMetas(getMetas())
  }, [])

  const handleCreate = () => {
    if (!formData.category || !formData.limit) return
    setMetas([...metas, formData])
    resetForm()
  }

  const handleEdit = (index: number) => {
    setEditingIndex(index)
    setFormData(metas[index])
  }

  const handleUpdate = () => {
    if (editingIndex === null) return
    const updated = [...metas]
    updated[editingIndex] = formData
    setMetas(updated)
    resetForm()
  }

  const handleDelete = (index: number) => {
    setMetas(metas.filter((_, i) => i !== index))
  }

  const resetForm = () => {
    setEditingIndex(null)
    setFormData({
      category: "",
      limit: 0,
    })
  }

  // ⭐ total das metas
  const totalMetas = metas.reduce((acc, meta) => acc + meta.limit, 0)

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-gray-100 relative overflow-hidden">

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.2),_transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(236,72,153,0.2),_transparent_60%)]" />

      <div className="relative z-10 max-w-6xl mx-auto py-12 px-4 space-y-10">

        {/* HEADER */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white">Metas financeiras</h1>
          <p className="text-zinc-400 mt-2">
            Defina limites mensais por categoria de gasto
          </p>
        </div>

        {/* ⭐ CARD TOTAL METAS (compacto) */}
        <Card className="bg-black/40 border-white/10 backdrop-blur-xl shadow-xl text-blue-100 p-3">

          <CardHeader className="flex flex-row items-center justify-between space-y-0 p-2 pb-1">
            <CardTitle className="text-base font-semibold leading-tight">
              Total das metas
            </CardTitle>

            <Target className="text-cyan-400" size={18} />
          </CardHeader>

          <CardContent className="p-2 pt-0">
            <p className="text-3xl font-bold text-emerald-400 leading-tight">
              R$ {totalMetas.toFixed(2)}
            </p>

            <p className="text-[11px] text-zinc-400 mt-1 leading-tight">
              Soma de todos os limites cadastrados
            </p>
          </CardContent>

        </Card>


        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* FORM */}
          <Card className="bg-black/40 border-white/10 backdrop-blur-xl shadow-xl text-blue-100">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">
                {editingIndex !== null ? "Editar meta" : "Nova meta"}
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <div>
                <label className="text-sm text-zinc-400">Categoria</label>
                <Input
                  placeholder="Ex: Alimentação"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>

              <div>
                <label className="text-sm text-zinc-400">
                  Limite mensal (R$)
                </label>
                <Input
                  type="number"
                  placeholder="Ex: 1500"
                  value={formData.limit || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, limit: Number(e.target.value) })
                  }
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>

              <div className="flex gap-2">
                <Button
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700"
                  onClick={editingIndex !== null ? handleUpdate : handleCreate}
                >
                  {editingIndex !== null ? (
                    <>
                      <Check size={16} className="mr-2" /> Atualizar
                    </>
                  ) : (
                    "Registrar meta"
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

          {/* LISTA */}
          <Card className="lg:col-span-2 bg-black/40 border-white/10 backdrop-blur-xl shadow-xl text-blue-100">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Metas cadastradas</CardTitle>
            </CardHeader>

            <CardContent>
              <div className="space-y-3 max-h-105 overflow-y-auto">

                {metas.map((meta, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition"
                  >
                    <div>
                      <p className="font-semibold text-white">{meta.category}</p>
                      <p className="text-xs text-zinc-400">
                        Limite mensal
                      </p>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className="font-bold text-cyan-400">
                        R$ {meta.limit.toFixed(2)}
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

                {metas.length === 0 && (
                  <p className="text-center text-zinc-500 py-8">
                    Nenhuma meta cadastrada
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
