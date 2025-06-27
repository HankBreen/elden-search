"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { FilterField, FilterOption } from "@/components/ui/blocks/FilterField";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

// 1) Define your schema
const FiltersSchema = z.object({
  sidebar: z.array(z.string()),
  experience: z.array(z.string()), // optional
});
type FiltersData = z.infer<typeof FiltersSchema>;

// 2) Your options for each field
const weaponTypeOptions: FilterOption[] = [
  { id: "sword", label: "Sword" },
  { id: "axe", label: "Axe" },
  { id: "hammer", label: "Hammer" },
  { id: "spear", label: "Spear" },
  { id: "staff", label: "Sword" },
  { id: "colossal", label: "Colossal" },
  { id: "dagger", label: "Dagger" },
  { id: "twinblade", label: "Twinblade" },
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
