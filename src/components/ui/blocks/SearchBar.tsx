// File: components/ui/blocks/SearchBar.tsx
'use client'
import React from 'react'
import { Input } from '@/components/ui/input'

interface SearchBarProps {
  value: string
  onChange: (newValue: string) => void
  onSubmit?: (query: string) => void
  placeholder?: string
}

export function SearchBar({
  value,
  onChange,
  onSubmit,
  placeholder = 'Search…',
}: SearchBarProps) {
  return (
    <form
      onSubmit={e => {
        e.preventDefault()
        onSubmit?.(value)
      }}
    >
      <Input
        type="text"
        value={value}
        onChange={e => onChange(e.currentTarget.value)}
        placeholder={placeholder}
        className="w-full"
      />
    </form>
  )
}
