// File: components/ui/blocks/WeaponBox.tsx
'use client'
import React from 'react'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card'

export interface Weapon {
  id: string
  name: string
  image: string
  description: string
  attack: string
  defence: string
  scalesWith: string
  requiredAttributes: string
  category: string
}

interface WeaponBoxProps {
  weapon: Weapon
  onSelect?: (weaponId: string) => void
}

export function WeaponBox({ weapon, onSelect }: WeaponBoxProps) {

  const attacks = React.useMemo(() => {
    const regex = /'name':\s*'([^']+)',\s*'amount':\s*(\d+)/g
    const result: { name: string; amount: number }[] = []
    let match: RegExpExecArray | null

    while ((match = regex.exec(weapon.attack)) !== null) {
      result.push({ name: match[1], amount: Number(match[2]) })
    }

    return result
  }, [weapon.attack])
  
  return (
    <Card
  onClick={() => onSelect?.(weapon.id)}
  className="flex flex-col w-full max-w-none cursor-default hover:shadow-lg transition-shadow"
>
  {/* ─── Top row: image + attack stats ────────────────────────────── */}
  <div className="flex items-start justify-between px-4 pt-4">
    {weapon.image && (
      <img
        src={weapon.image}
        alt={weapon.name}
        className="w-32 h-32 object-cover rounded-lg"
      />
    )}
    <div className="flex flex-col space-y-1 text-left">
      {attacks.map((dmg) => (
        <span key={dmg.name} className="text-sm font-medium">
          {dmg.name}: {dmg.amount}
        </span>
      ))}
    </div>
  </div>

  {/* ─── Bottom section: name, category, description ──────────────── */}
  <CardHeader className="px-4 pt-2 pb-0">
    <CardTitle>{weapon.name}</CardTitle>
    <CardDescription className="capitalize">
      {weapon.category}
    </CardDescription>
  </CardHeader>

  {weapon.description && (
    <CardContent className="px-4 pb-4">
      <p className="text-sm text-gray-700 line-clamp-3">
        {weapon.description}
      </p>
    </CardContent>
  )}
</Card>

  )
}