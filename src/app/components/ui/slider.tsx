"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"
import { cn } from "@/app/lib/utils" // adjust if you don't have cn utility

export interface SliderProps extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {
  value?: number[]
  defaultValue?: number[]
  max?: number
  step?: number
  onValueChange?: (value: number[]) => void
}

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  SliderProps
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
      <SliderPrimitive.Range className="absolute h-full bg-red-500 dark:bg-red-400" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border-2 border-red-500 bg-white shadow focus:outline-none focus:ring-2 focus:ring-red-400" />
    <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border-2 border-red-500 bg-white shadow focus:outline-none focus:ring-2 focus:ring-red-400" />
  </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
