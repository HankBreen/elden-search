// components/FilterField.tsx
"use client";

import React from "react";
import { Control, FieldValues, Path } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import {
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";

export interface FilterOption {
  id: string;
  label: string;
}

interface FilterFieldProps<T extends FieldValues> {
  /** react-hook-form control */
  control: Control<T>;
  /** name of the array field in your form schema */
  name: Path<T>;
  /** the checkbox options to render */
  options: FilterOption[];
  /** section heading */
  label: string;
  /** optional helper text */
  description?: string;
}

export function FilterField<T extends FieldValues>({
  control,
  name,
  options,
  label,
  description,
}: FilterFieldProps<T>) {
  return (
    <FormField<T>
      control={control}
      name={name}
      render={() => (
        <FormItem>
          <div className="mb-3">
            <FormLabel className="text-base">{label}</FormLabel>
            {description && <FormDescription>{description}</FormDescription>}
          </div>

          {options.map((opt) => (
            <FormField<T>
              key={opt.id}
              control={control}
              name={name}
              render={({ field }) => {
                // we expect field.value to be a string[]
                const selected = (field.value as unknown as string[]) || [];
                const isChecked = selected.includes(opt.id);

                return (
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <Checkbox
                        checked={isChecked}
                        onCheckedChange={(checked) => {
                          const next = checked
                            ? [...selected, opt.id]
                            : selected.filter((v) => v !== opt.id);
                          field.onChange(next);
                        }}
                      />
                    </FormControl>
                    <FormLabel className="text-sm font-normal">
                      {opt.label}
                    </FormLabel>
                  </FormItem>
                );
              }}
            />
          ))}

          <FormMessage />
        </FormItem>
      )}
    />
  );
}
