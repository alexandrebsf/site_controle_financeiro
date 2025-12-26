"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"

type ComboProps = {
  items: string[]
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function ComboBoxFilter({
  items,
  value,
  onChange,
  placeholder = "Selecione",
}: ComboProps) {
  const [open, setOpen] = React.useState(false)

  const options = ["Todos", ...items]

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        className="w-30 justify-between border rounded-md px-3 py-2 text-sm flex items-center"
      >
        {value === "" || value === "all"
          ? placeholder
          : value}

        <ChevronsUpDown className="opacity-50 h-4 w-4" />
      </PopoverTrigger>

      <PopoverContent className="w-56 p-0">
        <Command>
          <CommandInput placeholder="Buscar..." />

          <CommandEmpty>Nenhum item encontrado.</CommandEmpty>

          <CommandGroup>
            {options.map(item => {
              const realValue =
                item === "Todos" ? "all" : item

              return (
                <CommandItem
                  key={item}
                  value={realValue}
                  onSelect={() => {
                    onChange(realValue)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      realValue === value
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  {item}
                </CommandItem>
              )
            })}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
