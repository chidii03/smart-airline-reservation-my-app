"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card'
import { Button } from '@/app/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/app/components/ui/radio-group'
import { Label } from '@/app/components/ui/label'
import { Luggage } from 'lucide-react'

interface BaggageOption {
  id: string
  weight: number
  price: number
  description: string
}

interface BaggageSelectorProps {
  onSelection: (baggage: BaggageOption[]) => void
}

const baggageOptions: BaggageOption[] = [
  { id: 'none', weight: 0, price: 0, description: 'No checked baggage' },
  { id: 'basic', weight: 20, price: 30, description: '20kg checked baggage' },
  { id: 'standard', weight: 30, price: 50, description: '30kg checked baggage' },
  { id: 'premium', weight: 40, price: 70, description: '40kg checked baggage' },
]

export default function BaggageSelector({ onSelection }: BaggageSelectorProps) {
  const [selectedOptions, setSelectedOptions] = useState<{[key: number]: string}>({})

  const handleOptionChange = (passengerIndex: number, optionId: string) => {
    setSelectedOptions(prev => ({
      ...prev,
      [passengerIndex]: optionId
    }))
  }

  const getTotalPrice = () => {
    return Object.values(selectedOptions).reduce((total, optionId) => {
      const option = baggageOptions.find(opt => opt.id === optionId)
      return total + (option?.price || 0)
    }, 0)
  }

  const handleConfirm = () => {
    const selectedBaggage = Object.entries(selectedOptions).map(([, optionId]) => {
      return baggageOptions.find(opt => opt.id === optionId)!
    })
    onSelection(selectedBaggage)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Baggage Selection</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          {[0, 1, 2].map((passengerIndex) => (
            <div key={passengerIndex} className="border rounded-lg p-4">
              <h3 className="font-semibold mb-4">Passenger {passengerIndex + 1}</h3>
              
              <RadioGroup
                value={selectedOptions[passengerIndex] || 'none'}
                onValueChange={(value: string) => handleOptionChange(passengerIndex, value)}
                className="space-y-3"
              >
                {baggageOptions.map((option) => (
                  <div key={option.id} className="flex items-center space-x-3">
                    <RadioGroupItem value={option.id} id={`p${passengerIndex}-${option.id}`} />
                    <Label htmlFor={`p${passengerIndex}-${option.id}`} className="flex-1 cursor-pointer">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Luggage className="w-4 h-4" />
                          <span>{option.description}</span>
                        </div>
                        <span className="font-semibold">${option.price}</span>
                      </div>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          ))}
        </div>

        <div className="bg-muted p-4 rounded-lg">
          <div className="flex justify-between items-center font-semibold">
            <span>Total Baggage Cost</span>
            <span>${getTotalPrice()}</span>
          </div>
        </div>

        <Button onClick={handleConfirm} className="w-full">
          Confirm Baggage Selection
        </Button>
      </CardContent>
    </Card>
  )
}