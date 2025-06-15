'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { Search, Loader2 } from 'lucide-react'

import { Input } from '@/components/ui/input'
import { Command, CommandList, CommandItem, CommandEmpty } from '@/components/ui/command'

/* ───── small hooks ───── */
function useDebounce<T>(v: T, ms = 300) {
  const [d, setD] = useState(v)
  useEffect(() => {
    const id = setTimeout(() => setD(v), ms)
    return () => clearTimeout(id)
  }, [v, ms])
  return d
}

/* ───── minimal type ───── */
type Trek = {
  id: string
  slug: string
  name: string
  durationDays: number
  price: { amount: number; currency: string }
}

/* ───── component ───── */
export default function TrekSearch({ placeholder }: { placeholder?: string }) {
  const router = useRouter()
  const [q, setQ] = useState('')
  const debounced = useDebounce(q.trim(), 300)
  const [treks, setTreks] = useState<Trek[]>([])
  const [loading, setLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement | null>(null)

  /* fetch + filter */
  useEffect(() => {
    if (!debounced) {
      setTreks([])
      return
    }
    ;(async () => {
      try {
        setLoading(true)
        const { data } = await axios.get('/api/treks')
        const docs: Trek[] = data.docs.map(({ id, slug, name, durationDays, price }: any) => ({
          id,
          slug,
          name,
          durationDays,
          price,
        }))
        setTreks(docs.filter((t) => t.name.toLowerCase().includes(debounced.toLowerCase())))
      } catch (e) {
        console.error(e)
        setTreks([])
      } finally {
        setLoading(false)
      }
    })()
  }, [debounced])

  /* result list */
  const List = (
    <Command className="w-full" role="listbox" aria-live="polite" aria-label="Trek search results">
      <CommandEmpty>{debounced ? 'No treks found' : 'Start typing…'}</CommandEmpty>
      <CommandList>
        {treks.map((t) => (
          <CommandItem
            key={t.id}
            onSelect={() => router.push(`/treks/${t.slug}`)}
            className="cursor-pointer px-4 py-3 flex flex-col gap-0.5
                       focus:bg-gray-100/70 hover:bg-gray-100/70
                       transition-colors rounded-md outline-none"
          >
            <span className="font-medium">{t.name}</span>
            <span className="text-xs text-muted-foreground">
              {t.durationDays} d • {t.price.currency} {t.price.amount.toLocaleString()}
            </span>
          </CommandItem>
        ))}
      </CommandList>
    </Command>
  )

  /* pill-style input */
  const InputShell = (
    <div className="flex items-center overflow-hidden rounded-full bg-white shadow-md">
      <Input
        ref={inputRef}
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder={placeholder}
        aria-label="Search treks"
        className="flex-1 h-14 border-0 px-6 text-base placeholder:text-gray-400 
                   focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600/60"
      />
      <button
        type="button"
        aria-label="Search"
        className="grid h-14 w-16 place-content-center bg-gray-300
                   focus-visible:outline-none focus-visible:ring-2
                   focus-visible:ring-emerald-600/60"
      >
        {loading ? (
          <Loader2 className="h-6 w-6 animate-spin text-gray-600" />
        ) : (
          <Search className="h-6 w-6 text-gray-600" />
        )}
      </button>
    </div>
  )

  return (
    <div className="relative w-full">
      {InputShell}
      {debounced && (
        <div
          className="absolute left-0 mt-2 w-full max-h-[70vh] overflow-auto 
                        rounded-2xl border bg-white shadow-lg"
        >
          {List}
        </div>
      )}
    </div>
  )
}
