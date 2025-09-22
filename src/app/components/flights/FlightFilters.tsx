import { useState } from "react"
import { Card, CardContent, CardHeader} from "@/app/components/ui/card"
import { Button } from "@/app/components/ui/button"
import { Slider } from "@/app/components/ui/slider"
import { Checkbox } from "@/app/components/ui/checkbox"
import { Label } from "@/app/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select"

export interface Filters {
  priceRange: [number, number]
  airlines: string[]
  stops: "any" | "non-stop" | "1-stop" | "2+-stops"
  duration: [number, number]
  departureTime: string[]
}

interface FlightFiltersProps {
  filters?: Filters
  onFiltersChange: (filters: Filters) => void
  isOpen?: boolean
  onToggle?: () => void
}

export default function FlightFilters({ 
  filters: initialFilters, 
  onFiltersChange, 
  isOpen = true}: FlightFiltersProps) {
  const [filters, setFilters] = useState<Filters>(
    initialFilters || {
      priceRange: [0, 2000],
      airlines: [],
      stops: "any",
      duration: [0, 24],
      departureTime: [],
    }
  )

  const airlines = ["Emirates", "Qatar Airways", "Singapore Airlines", "Lufthansa", "British Airways"]
  const stopOptions: Filters["stops"][] = ["any", "non-stop", "1-stop", "2+-stops"]
  const timeWindows = ["morning", "afternoon", "evening", "night"]

  const updateFilters = (newFilters: Partial<Filters>) => {
    const updated = { ...filters, ...newFilters }
    setFilters(updated)
    onFiltersChange(updated)
  }

  return (
    <div className="flight-filters-container">
       <Card className={`flight-filters-card ${isOpen ? 'open' : 'hidden'} md:block`}>
        <CardHeader className="flex flex-row items-center justify-between">
        <Button
           variant="ghost"
           onClick={() =>
           updateFilters({
            priceRange: [0, 2000],
            airlines: [],
            stops: "any",
            duration: [0, 24],
            departureTime: [],     
              })
            }
          >
            Clear All
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Price Range */}
          <div className="space-y-4">
            <Label>Price Range</Label>
            <Slider
              defaultValue={[0, 2000]}
              max={2000}
              step={50}
              value={filters.priceRange}
              onValueChange={(value: number[]) =>
                updateFilters({ priceRange: value as [number, number] })
              }
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>${filters.priceRange[0]}</span>
              <span>${filters.priceRange[1]}</span>
            </div>
          </div>

          {/* Airlines */}
          <div className="space-y-3">
            <Label>Airlines</Label>
            {airlines.map((airline) => (
              <div key={airline} className="flex items-center space-x-2">
                <Checkbox
                  id={`airline-${airline}`}
                  checked={filters.airlines.includes(airline)}
                  onCheckedChange={(checked: boolean) => {
                    const updatedAirlines = checked
                      ? [...filters.airlines, airline]
                      : filters.airlines.filter((a) => a !== airline)
                    updateFilters({ airlines: updatedAirlines })
                  }}
                />
                <Label htmlFor={`airline-${airline}`} className="text-sm">
                  {airline}
                </Label>
              </div>
            ))}
          </div>

          {/* Stops */}
          <div className="space-y-2">
            <Label>Number of Stops</Label>
            <Select
              value={filters.stops}
              onValueChange={(value: Filters["stops"]) => updateFilters({ stops: value })}
            >
              <SelectTrigger className="filters-select-trigger">
                <SelectValue placeholder="Select stops" />
              </SelectTrigger>
              <SelectContent className="filters-select-content">
                {stopOptions.map((stop) => (
                  <SelectItem key={stop} value={stop}>
                    {stop === "any"
                      ? "Any"
                      : stop === "non-stop"
                      ? "Non-stop"
                      : stop === "1-stop"
                      ? "1 Stop"
                      : "2+ Stops"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Duration */}
          <div className="space-y-4">
            <Label>Duration (hours)</Label>
            <Slider
              defaultValue={[0, 24]}
              max={24}
              step={1}
              value={filters.duration}
              onValueChange={(value: number[]) =>
                updateFilters({ duration: value as [number, number] })
              }
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>{filters.duration[0]}h</span>
              <span>{filters.duration[1]}h</span>
            </div>
          </div>

          {/* Departure Time */}
          <div className="space-y-3">
            <Label>Departure Time</Label>
            {timeWindows.map((time) => (
              <div key={time} className="flex items-center space-x-2">
                <Checkbox
                  id={`time-${time}`}
                  checked={filters.departureTime.includes(time)}
                  onCheckedChange={(checked: boolean) => {
                    const updatedTimes = checked
                      ? [...filters.departureTime, time]
                      : filters.departureTime.filter((t) => t !== time)
                    updateFilters({ departureTime: updatedTimes })
                  }}
                />
                <Label htmlFor={`time-${time}`} className="text-sm capitalize">
                  {time}
                </Label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}