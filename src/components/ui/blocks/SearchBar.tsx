// File: components/ui/blocks/SearchBar.tsx
'use client'
import React, {useState} from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

interface SearchBarProps {
  onSubmit: (query: string) => void
  placeholder?: string
}

export function SearchBar({
  onSubmit,
  placeholder = 'Search…',
}: SearchBarProps) {
  const [inputValue, setInputValue] = useState('');
  return (
    <form
      onSubmit={e => {
        e.preventDefault()           
        onSubmit(inputValue)
      }}

      className="flex items-center"
    >
      <Input
        type="text"
        value={inputValue}
        onChange={e => setInputValue(e.currentTarget.value)}
        placeholder={placeholder}
        className="flex-1"
      />

      <Button type="submit" className="ml-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded cursor-pointer">
        Search
      </Button>
    </form>
  )
}
