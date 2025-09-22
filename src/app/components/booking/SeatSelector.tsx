"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card'
import { Button } from '@/app/components/ui/button'
import { Seat } from '@/app/types/flight'

interface Passenger {
  firstName: string
  lastName: string
}

interface SeatSelectorProps {
  seats: Seat[]
  selectedSeats: string[]
  onSeatSelect: (seatId: string) => void
  passengers: Passenger[]
}

export default function SeatSelector({ seats, selectedSeats, onSeatSelect, passengers }: SeatSelectorProps) {
  const [selectedPassenger, setSelectedPassenger] = useState(0)

  const getSeatStatus = (seat: Seat) => {
    if (seat.status === 'occupied') return 'occupied'
    if (selectedSeats.includes(seat.id)) return 'selected'
    return 'available'
  }

  const handleSeatClick = (seat: Seat) => {
    if (seat.status === 'occupied') return
    
    if (selectedSeats[selectedPassenger]) {
      onSeatSelect(selectedSeats[selectedPassenger])
    }
    
    onSeatSelect(seat.id)
    
    if (selectedPassenger < passengers.length - 1) {
      setSelectedPassenger(selectedPassenger + 1)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Select Seats</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Selecting for:</label>
          <div className="flex flex-wrap gap-2">
            {passengers.map((passenger, index) => (
              <Button
                key={index}
                variant={selectedPassenger === index ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedPassenger(index)}
              >
                {passenger.firstName} {passenger.lastName}
                {selectedSeats[index] && ` (Seat ${selectedSeats[index]})`}
              </Button>
            ))}
          </div>
        </div>

        {/* Seat map */}
        <div className="text-center">
          <div className="bg-gray-200 p-2 rounded-lg mb-4">
            <span className="font-semibold">Business Class</span>
          </div>
          
          <div className="grid grid-cols-6 gap-2 mx-auto max-w-md">
            {seats.map((seat) => {
              const status = getSeatStatus(seat)
              const isSelectedForCurrent = selectedSeats[selectedPassenger] === seat.id

              return (
                <Button
                  key={seat.id}
                  variant={
                    status === 'selected' ? "default" :
                    status === 'occupied' ? "secondary" : "outline"
                  }
                  disabled={status === 'occupied'}
                  className={`w-12 h-12 p-0 ${isSelectedForCurrent ? 'ring-2 ring-primary ring-offset-2' : ''}`}
                  onClick={() => handleSeatClick(seat)}
                >
                  {seat.row}{seat.column}
                </Button>
              )
            })}
          </div>

          <div className="bg-gray-200 p-2 rounded-lg mt-4">
            <span className="font-semibold">Economy Class</span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex justify-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded"></div>
            <span>Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-500 rounded"></div>
            <span>Selected</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-400 rounded"></div>
            <span>Occupied</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
