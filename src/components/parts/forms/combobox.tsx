'use client'

import { Check, ChevronsUpDown } from 'lucide-react'
import { type Dispatch, type SetStateAction, useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'

/**
 * Normalize a string for matching.
 */
const normalize = (s: string) => s.toLowerCase().normalize('NFKC').trim()

/**
 * Compute a match score between a label and a query.
 * Lower score means better match.
 * If no match, returns `Number.POSITIVE_INFINITY`.
 */
const computeMatchScore = (label: string, q: string) => {
  const L = normalize(label)
  const Q = normalize(q)

  if (!Q) return Number.POSITIVE_INFINITY
  if (L.startsWith(Q)) return 0

  const idx = L.indexOf(Q)
  return idx >= 0 ? 1 + idx / Math.max(1, L.length) : Number.POSITIVE_INFINITY
}

export type ComboboxOption = {
  id: string
  label: string
}

type ComboboxProps = {
  options: ComboboxOption[]
  value: string
  setValue: Dispatch<SetStateAction<string>>
}

const Combobox = ({ options, value, setValue }: ComboboxProps) => {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')

  const filteredOptions = useMemo(() => {
    const q = normalize(query)
    if (!q) return options

    return options
      .map((o) => ({ o, s: computeMatchScore(o.label, q) }))
      .filter((x) => Number.isFinite(x.s))
      .sort((a, b) => a.s - b.s)
      .map((x) => x.o)
  }, [options, query])

  return (
    <Popover open={open} onOpenChange={setOpen} modal>
      <PopoverTrigger asChild className="w-full">
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value
            ? options.find((option) => option.id === value)?.label
            : 'Select an option'}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="p-0 w-[var(--radix-popover-trigger-width)]">
        <Command shouldFilter={false}>
          <CommandInput
            placeholder="Search options"
            value={query}
            onValueChange={setQuery}
            className="h-9"
          />
          <CommandList className="max-h-60 overflow-y-auto">
            <CommandEmpty>No options found.</CommandEmpty>
            <CommandGroup>
              {filteredOptions.map((o) => (
                <CommandItem
                  key={o.id}
                  value={o.label}
                  onSelect={() => {
                    setValue(o.id)
                    setOpen(false)
                  }}
                >
                  {o.label}
                  <Check
                    className={cn(
                      'ml-auto',
                      value === o.id ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default Combobox
