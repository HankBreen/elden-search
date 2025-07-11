// app/page.tsx
"use client";

import { useState } from "react";
import Filters from "@/components/ui/blocks/Filters";
import { SearchBar } from "@/components/ui/blocks/SearchBar";
import { WeaponsList } from "@/components/ui/blocks/WeaponList";
import { Weapon } from "@/components/ui/blocks/WeaponBox";

export default function Home() {
  const [query, setQuery] = useState("");
  const [weapons, setWeapons] = useState<Weapon[]>([]);

  // imagine fetchWeapons applies your filters and query
  const fetchWeapons = (q: string) => {
    // dummy data for example
    const all: Weapon[] = [
      { id: "1", name: "Longsword", type: "melee", damage: 75, description: "A sturdy blade.", imageUrl: "/sword.jpg" },
      { id: "2", name: "Crossbow", type: "ranged", damage: 50, description: "Silent and accurate.", imageUrl: "/crossbow.jpg" },
      // …
    ];
  
    // simple name‐contains filter
    const filtered = all.filter(w =>
      w.name.toLowerCase().includes(q.toLowerCase())
    );
  
    setWeapons(filtered);
  };
  
  
  return (
    <div className="max-w-6xl mx-auto mt-10 px-4">
      {/* — Search bar centered at top — */}
      <div className="flex justify-center mb-8">
        <div className="w-full max-w-lg">
          <SearchBar
            value={query}
            onChange={setQuery}
            onSubmit={(q) => {
              setQuery(q);
              fetchWeapons(q);
            }}
            placeholder="Describe your ideal weapon"
          />
        </div>
      </div>

      {/* — Filters on the left, results (or content) on the right — */}
      <div className="flex gap-8">
        <aside className="w-64 flex-shrink-0">
          <Filters />
        </aside>
        <main className="flex-1">
          {/* Replace this with your actual results */}
          <WeaponsList
            weapons={weapons}
            onSelectWeapon={(id) => console.log("Selected", id)}
          />
        </main>
      </div>
    </div>
  );
}
