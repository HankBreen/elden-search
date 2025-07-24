'use client'

import { useState, useMemo } from 'react'
import Filters from '@/components/ui/blocks/Filters'
import { SearchBar } from '@/components/ui/blocks/SearchBar'
import { WeaponsList } from '@/components/ui/blocks/WeaponList'
import type { Weapon } from '@/components/ui/blocks/WeaponBox'
import  Title  from '@/components/ui/blocks/Title'

interface LandingClientProps {
  initialWeapons: Weapon[]
}

export default function LandingClient({ initialWeapons }: LandingClientProps) {
  const [typeFilter, setTypeFilter] = useState<string[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [weapons, setWeapons] = useState<Weapon[]>(initialWeapons)

  async function handleSearch(q: string) {
    setLoading(true)

    if (!q.trim()) {
      console.log("Empty query submit");
      setWeapons(initialWeapons);
      setLoading(false)
    } else {

      try {
        const res = await fetch('/api/search', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query: q }),
        })
        const { weapons: newWeapons } = await res.json()
        setWeapons(newWeapons)
      } catch (err) {
        console.error('Search error:', err)
      } finally {
        setLoading(false)
      }
    }
  }

  const filteredWeapons = useMemo(() => {
    return weapons.filter(w =>
      typeFilter.length === 0 ? true : typeFilter.includes(w.category)
    )
  }, [weapons, typeFilter])

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4 pb-10">
      <Title />
      <div className="flex justify-center mb-8">
        <div className="w-full max-w-lg">
          <SearchBar
            onSubmit={handleSearch}
            placeholder="Describe your ideal weapon"
          />
        </div>
      </div>

      <div className="flex gap-8">
        <aside className="w-64 flex-shrink-0">
          <Filters
            selectedTypes={typeFilter}
            onTypesChange={setTypeFilter}
          />
        </aside>
        <main className="flex-1">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <WeaponsList
              weapons={filteredWeapons}
              onSelectWeapon={id => console.log('Selected', id)}
            />
          )}
        </main>
      </div>
    </div>
  )
}
