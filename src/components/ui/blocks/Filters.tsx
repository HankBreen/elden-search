"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { FilterField, FilterOption } from "@/components/ui/blocks/FilterField";
import { Form } from "@/components/ui/form";


// 1) Define your schema
const FiltersSchema = z.object({
  sidebar: z.array(z.string()),
  experience: z.array(z.string()), // optional
});
type FiltersData = z.infer<typeof FiltersSchema>;

// 2) Your options for each field
const weaponTypeOptions: FilterOption[] = [
  { id: "axe", label: "Axe" },
  { id: "ballista", label: "Ballista" },
  { id: "bow", label: "Bow" },
  { id: "claw", label: "Claw" },
  { id: "colossal-sword", label: "Colossal Sword" },
  { id: "colossal-weapon", label: "Colossal Weapon" },
  { id: "crossbow", label: "Crossbow" },
  { id: "curved-greatsword", label: "Curved Greatsword" },
  { id: "curved-sword", label: "Curved Sword" },
  { id: "dagger", label: "Dagger" },
  { id: "fist", label: "Fist" },
  { id: "flail", label: "Flail" },
  { id: "glintstone-staff", label: "Glintstone Staff" },
  { id: "great-spear", label: "Great Spear" },
  { id: "greataxe", label: "Greataxe" },
  { id: "greatbow", label: "Greatbow" },
  { id: "greatsword", label: "Greatsword" },
  { id: "halberd", label: "Halberd" },
  { id: "hammer", label: "Hammer" },
  { id: "heavy-thrusting-sword", label: "Heavy Thrusting Sword" },
  { id: "katana", label: "Katana" },
  { id: "light-bow", label: "Light Bow" },
  { id: "reaper", label: "Reaper" },
  { id: "sacred-seal", label: "Sacred Seal" },
  { id: "spear", label: "Spear" },
  { id: "straight-sword", label: "Straight Sword" },
  { id: "thrusting-sword", label: "Thrusting Sword" },
  { id: "torch", label: "Torch" },
  { id: "twinblade", label: "Twinblade" },
  { id: "warhammer", label: "Warhammer" },
  { id: "whip", label: "Whip" },
];
const stageOptions: FilterOption[] = [
  { id: "early", label: "Early Game" },
  { id: "mid", label: "Middle Game" },
  { id: "late", label: "Late Game" },
  { id:"dlc", label: "DLC"},
];

export default function Filters() {
  const form = useForm<FiltersData>({
    resolver: zodResolver(FiltersSchema),
    defaultValues: {
      sidebar: ["recents", "home"],
      experience: [],
    },
  });

  const onSubmit = (data: FiltersData) => {
    console.log("filters:", data);
    // trigger your search here…
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 p-4 bg-white rounded-lg shadow"
      >
        <FilterField
          control={form.control}
          name="sidebar"
          options={weaponTypeOptions}
          label="Weapon Type"
        />

        <FilterField
          control={form.control}
          name="experience"
          options={stageOptions}
          label="Where The Weapon Is Found"
        />

      </form>
    </Form>
  );
}
