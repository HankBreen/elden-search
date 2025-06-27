 // components/SearchBar.tsx
"use client";

import React from "react";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  /** the current query string */
  value: string;
  /** called on every keystroke */
  onChange: (newValue: string) => void;
  /** called when user hits “Enter” */
  onSubmit?: (query: string) => void;
  /** placeholder text */
  placeholder?: string;
}

export function SearchBar({
  value,
  onChange,
  onSubmit,
  placeholder = "Search…",
}: SearchBarProps) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit?.(value);
      }}
    >
      <Input
        type="text"
        value={value}
        onChange={(e) => onChange(e.currentTarget.value)}
        placeholder={placeholder}
        className="w-full"
      />
    </form>
  );
}
