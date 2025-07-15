// File: components/ui/blocks/Filters.tsx
'use client'

import React from 'react'
import { Checkbox } from '@/components/ui/checkbox'

export interface FilterOption {
  id: string
  label: string
}

const weaponTypeOptions: FilterOption[] = [
  { id: 'Axe', label: 'Axe' },
  { id: 'Ballista', label: 'Ballista' },
  { id: 'Bow', label: 'Bow' },
  { id: 'Claw', label: 'Claw' },
  { id: 'Colossal Sword', label: 'Colossal Sword' },
  { id: 'Colossal Weapon', label: 'Colossal Weapon' },
  { id: 'Crossbow', label: 'Crossbow' },
  { id: 'Curved Greatsword', label: 'Curved Greatsword' },
  { id: 'Curved Sword', label: 'Curved Sword' },
  { id: 'Dagger', label: 'Dagger' },
  { id: 'Fist', label: 'Fist' },
  { id: 'Flail', label: 'Flail' },
  { id: 'Glintstone Staff', label: 'Glintstone Staff' },
  { id: 'Great Spear', label: 'Great Spear' },
  { id: 'Greataxe', label: 'Greataxe' },
  { id: 'Greatbow', label: 'Greatbow' },
  { id: 'Greatsword', label: 'Greatsword' },
  { id: 'Halberd', label: 'Halberd' },
  { id: 'Hammer', label: 'Hammer' },
  { id: 'Heavy Thrusting Sword', label: 'Heavy Thrusting Sword' },
  { id: 'Katana', label: 'Katana' },
  { id: 'Light Bow', label: 'Light Bow' },
  { id: 'Reaper', label: 'Reaper' },
  { id: 'Sacred Seal', label: 'Sacred Seal' },
  { id: 'Spear', label: 'Spear' },
  { id: 'Straight Sword', label: 'Straight Sword' },
  { id: 'Thrusting Sword', label: 'Thrusting Sword' },
  { id: 'Torch', label: 'Torch' },
  { id: 'Twinblade', label: 'Twinblade' },
  { id: 'Warhammer', label: 'Warhammer' },
  { id: 'Whip', label: 'Whip' },
];

interface FiltersProps {
  selectedTypes: string[]
  onTypesChange: (next: string[]) => void
}

export default function Filters({
  selectedTypes,
  onTypesChange,
}: FiltersProps) {
  return (
    <div className="space-y-6 p-4 bg-white rounded-lg shadow">
      <section>
        <h3 className="mb-2 font-medium">Weapon Type</h3>
        {weaponTypeOptions.map(opt => (
          <div key={opt.label} className="flex items-center space-x-2 mb-1">
            <Checkbox
              checked={selectedTypes.includes(opt.label)}
              onCheckedChange={checked => {
                const next = checked
                  ? [...selectedTypes, opt.label]
                  : selectedTypes.filter(label => label !== opt.label)
                onTypesChange(next)
              }}
            />
            <label className="text-sm">{opt.label}</label>
          </div>
        ))}
      </section>
    </div>
  )
}
