// components/WeaponBox.tsx
"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";

export interface Weapon {
  id: string;
  name: string;
  type: string;
  damage: number;
  description?: string;
  imageUrl?: string;
}

interface WeaponBoxProps {
  weapon: Weapon;
  onSelect?: (weaponId: string) => void;
}

export function WeaponBox({ weapon, onSelect }: WeaponBoxProps) {
  return (
    <Card
      onClick={() => onSelect?.(weapon.id)}
      className="flex w-full max-w-md cursor-pointer hover:shadow-lg transition-shadow"
    >
      {weapon.imageUrl && (
        <img
          src={weapon.imageUrl}
          alt={weapon.name}
          className="w-32 h-32 object-cover rounded-l-lg"
        />
      )}

      <div className="flex flex-col flex-1">
        <CardHeader className="px-4 pt-4 pb-0">
          <CardTitle>{weapon.name}</CardTitle>
          <CardDescription className="capitalize">{weapon.type}</CardDescription>
        </CardHeader>

        {weapon.description && (
          <CardContent className="px-4 py-2 flex-1">
            <p className="text-sm text-gray-700 line-clamp-3">
              {weapon.description}
            </p>
          </CardContent>
        )}

        <CardFooter className="px-4 py-2">
          <span className="text-sm font-medium">Damage: {weapon.damage}</span>
        </CardFooter>
      </div>
    </Card>
  );
}

