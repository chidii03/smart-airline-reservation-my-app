// components/shared/SearchForm.tsx
"use client"

import { SetStateAction, useState } from 'react'
import { Button } from '@/app/components/ui/button'
import { Input } from '@/app/components/ui/input'
import { Calendar } from '@/app/components/ui/calendar'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/components/ui/select'
import { Popover, PopoverTrigger, PopoverContent } from '@/app/components/ui/popover'
import { CalendarIcon, Search, MapPin, Users } from 'lucide-react'
import { cn } from '@/app/lib/utils'
import { format } from 'date-fns'

interface SearchFormProps {
  onSubmit: (searchParams: {
    origin: string;
    destination: string;
    departureDate?: string;
    returnDate?: string;
    passengers: string;
  }) => void;
}

export default function SearchForm({ onSubmit }: SearchFormProps) {
  const [origin, setOrigin] = useState('')
  const [destination, setDestination] = useState('')
  const [departureDate, setDepartureDate] = useState<Date>()
  const [returnDate, setReturnDate] = useState<Date>()
  const [passengers, setPassengers] = useState('1')
  const [tripType, setTripType] = useState('one-way')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
   
    // Handle form submission logic here
    console.log({
      origin,
      destination,
      departureDate,
      returnDate,
      passengers
    })
    
    // Call the onSubmit prop if provided
    if (onSubmit) {
      onSubmit({
        origin,
        destination,
        departureDate: departureDate?.toISOString(),
        returnDate: tripType === 'round-trip' ? returnDate?.toISOString() : undefined,
        passengers,
      })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="search-form-container">
      {/* Trip type selector */}
      <div className="trip-type-selector">
        <Button
          type="button"
          variant={tripType === 'one-way' ? 'default' : 'outline'}
          onClick={() => setTripType('one-way')}
          className="trip-type-btn"
        >
          One Way
        </Button>
        <Button
          type="button"
          variant={tripType === 'round-trip' ? 'default' : 'outline'}
          onClick={() => setTripType('round-trip')}
          className="trip-type-btn"
        >
          Round Trip
        </Button>
      </div>

      <div className="search-form-grid">
        {/* Origin */}
        <div className="form-group">
          <label className="form-label">From</label>
          <div className="input-with-icon">
            <MapPin className="input-icon" />
            <Input
              placeholder="Origin"
              value={origin}
              onChange={(e: { target: { value: SetStateAction<string> } }) => setOrigin(e.target.value)}
              className="form-input border-black ring-1 ring-black"
              required
            />
          </div>
        </div>

        {/* Destination */}
        <div className="form-group">
          <label className="form-label">To</label>
          <div className="input-with-icon">
            <MapPin className="input-icon" />
            <Input
              placeholder="Destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="form-input border-black ring-1 ring-black"
              required
            />
          </div>
        </div>

        {/* Departure Date */}
        <div className="form-group">
          <label className="form-label">Departure</label>
          <Popover>
            <PopoverTrigger>
              <Button
                variant="outline"
                className={cn(
                  "date-picker-trigger border-black ring-1 ring-black",
                  !departureDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {departureDate ? format(departureDate, "PPP") : "Pick date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 calendar-popover">
              <Calendar
                mode="single"
                selected={departureDate}
                onSelect={setDepartureDate}
                initialFocus
                className="rounded-md border"
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Return Date (only for round trip) */}
        {tripType === 'round-trip' && (
          <div className="form-group">
            <label className="form-label">Return</label>
            <Popover>
              <PopoverTrigger>
                <Button
                  variant="outline"
                  className={cn(
                    "date-picker-trigger border-black ring-1 ring-black",
                    !returnDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {returnDate ? format(returnDate, "PPP") : "Pick date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 calendar-popover">
                <Calendar
                  mode="single"
                  selected={returnDate}
                  onSelect={setReturnDate}
                  initialFocus
                  className="rounded-md border"
                />
              </PopoverContent>
            </Popover>
          </div>
        )}

        {/* Passengers */}
        <div className="form-group">
          <label className="form-label">Passengers</label>
          <div className="input-with-icon">
            <Users className="input-icon" />
            <Select value={passengers} onValueChange={setPassengers}>
              <SelectTrigger className="passenger-select-trigger border-black ring-1 ring-black">
                <SelectValue placeholder="Passengers" />
              </SelectTrigger>
              <SelectContent className="passenger-select-content">
                {[1, 2, 3, 4, 5, 6,].map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    {num} {num === 1 ? 'passenger' : 'passengers'}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Search button */}
      <Button type="submit" className="search-button bg-red-600 hover:bg-red-700">
        <Search className="mr-2 h-4 w-4" />
        Search Flights
      </Button>
    </form>
  )
}