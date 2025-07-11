// components/WeaponsList.tsx
"use client";

import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { WeaponBox, Weapon } from "./WeaponBox";

interface WeaponsListProps {
  weapons: Weapon[];
  onSelectWeapon?: (weaponId: string) => void;
}

export function WeaponsList({
  weapons,
  onSelectWeapon,
}: WeaponsListProps) {
  return (
    <ScrollArea className="h-[70vh] w-full rounded-md border">
      <div className="p-4 space-y-4">
        {weapons.length === 0 ? (
          <p className="text-gray-500">No weapons found.</p>
        ) : (
          weapons.map((w) => (
            <WeaponBox
              key={w.id}
              weapon={w}
              onSelect={onSelectWeapon} 
            />
          ))
        )}
      </div>
    </ScrollArea>
  );
}
