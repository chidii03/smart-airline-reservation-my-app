"use client"

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { Check } from "lucide-react"
import { cn } from "@/app/lib/utils" // adjust if missing

export interface CheckboxProps extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
}

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ className, checked, onCheckedChange, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    checked={checked}
    onCheckedChange={(val) => onCheckedChange?.(val === true)}
    className={cn(
      "peer h-5 w-5 shrink-0 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400 disabled:cursor-not-allowed disabled:opacity-50",
      checked ? "bg-red-500 text-white" : "bg-white",
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator className="flex items-center justify-center text-current">
      <Check className="h-4 w-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
