'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card'
import { Button } from '@/app/components/ui/button'
import { Seat, Flight } from '@/app/types/flight' // Import both Seat and Flight

interface SeatMapProps {
  flight: Flight;
}

export default function SeatMap({ flight }: SeatMapProps) {
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  const handleSeatSelect = (seatId: string) => {
    setSelectedSeats(prev => 
      prev.includes(seatId) 
        ? prev.filter(id => id !== seatId) 
        : [...prev, seatId]
    );
  };
  
  // Now flight.seats is correctly typed as Seat[]
  const rows = Math.max(...flight.seats.map(seat => parseInt(seat.row)))
  const columns = Math.max(...flight.seats.map(seat => seat.column.charCodeAt(0) - 64))

  const getSeatStatus = (seat: Seat) => {
    if (seat.status === 'occupied') return 'occupied'
    if (selectedSeats.includes(seat.id)) return 'selected'
    return 'available'
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Select Your Seats</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Cabin layout */}
          <div className="text-center">
            <div className="bg-gray-200 p-2 rounded-lg mb-4">
              <span className="font-semibold">Business Class</span>
            </div>
            
            <div className="grid gap-2" style={{ 
              gridTemplateColumns: `repeat(${columns + 1}, minmax(0, 1fr))` 
            }}>
              {/* Column headers */}
              {Array.from({ length: columns }, (_, i) => (
                <div key={i} className="text-center font-semibold p-2">
                  {String.fromCharCode(65 + i)}
                </div>
              ))}

              {/* Rows */}
              {Array.from({ length: rows }, (_, rowIndex) => (
                <>
                  <div className="text-center font-semibold p-2">
                    {rowIndex + 1}
                  </div>
                  {Array.from({ length: columns }, (_, colIndex) => {
                    const seat = flight.seats.find(s => 
                      s.row === (rowIndex + 1).toString() && 
                      s.column === String.fromCharCode(65 + colIndex)
                    )
                    
                    if (!seat) return <div key={colIndex} className="p-2" />

                    const status = getSeatStatus(seat)
                    const isAisle = colIndex === 2 // Example aisle position

                    return (
                      <div key={colIndex} className={`p-2 ${isAisle ? 'mr-4' : ''}`}>
                        <Button
                          variant={status === 'selected' ? 'default' : 'outline'}
                          disabled={status === 'occupied'}
                          onClick={() => handleSeatSelect(seat.id)}
                          className="w-12 h-12 p-0"
                        >
                          {seat.row}{seat.column}
                        </Button>
                      </div>
                    )
                  })}
                </>
              ))}
            </div>

            <div className="bg-gray-200 p-2 rounded-lg mt-4">
              <span className="font-semibold">Economy Class</span>
            </div>
          </div>

          {/* Legend */}
          <div className="flex justify-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded"></div>
              <span className="text-sm">Available</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-500 rounded"></div>
              <span className="text-sm">Selected</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-400 rounded"></div>
              <span className="text-sm">Occupied</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}