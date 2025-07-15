// File: app/LandingClient.tsx
// Client Component: UI and interactivity live here
'use client'

import { useState, useMemo } from 'react'
import Filters from '@/components/ui/blocks/Filters'
import { SearchBar } from '@/components/ui/blocks/SearchBar'
import { WeaponsList } from '@/components/ui/blocks/WeaponList'
import type { Weapon } from '@/components/ui/blocks/WeaponBox'

export default function LandingClient({
  initialWeapons,
}: {
  initialWeapons: Weapon[]
}) {

  console.log('initialWeapons count:', initialWeapons.length, initialWeapons)
  const [searchQuery, setSearchQuery] = useState('')
  const [typeFilter, setTypeFilter]   = useState<string[]>([])

  const filtered = useMemo(() => {
    return initialWeapons
    .filter(w =>
        typeFilter.length === 0
          ? true
          : typeFilter.includes(w.category)
      )
  }, [initialWeapons, typeFilter, searchQuery])

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4">
      <div className="flex justify-center mb-8">
        <div className="w-full max-w-lg">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            onSubmit={setSearchQuery}
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
          <WeaponsList
            weapons={filtered}
            onSelectWeapon={id => console.log('Selected', id)}
          />
        </main>
      </div>
    </div>
  )
}
