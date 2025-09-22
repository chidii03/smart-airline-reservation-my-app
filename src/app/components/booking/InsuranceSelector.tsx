"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card'
import { Button } from '@/app/components/ui/button'
import { Checkbox } from '@/app/components/ui/checkbox'
import { Label } from '@/app/components/ui/label'
import { Shield, Info } from 'lucide-react'

interface InsuranceOption {
  id: string
  name: string
  price: number
  coverage: string
  description: string
  features: string[]
}

interface InsuranceSelectorProps {
  onSelection: (insurance: InsuranceOption | null) => void
}

const insuranceOptions: InsuranceOption[] = [
  {
    id: 'basic',
    name: 'Basic Insurance',
    price: 15,
    coverage: 'Up to $1,000',
    description: 'Essential coverage for trip cancellations and delays',
    features: [
      'Trip cancellation coverage',
      'Flight delay protection',
      'Baggage delay coverage'
    ]
  },
  {
    id: 'premium',
    name: 'Premium Insurance',
    price: 30,
    coverage: 'Up to $5,000',
    description: 'Comprehensive coverage including medical emergencies',
    features: [
      'All basic features',
      'Emergency medical coverage',
      'Trip interruption protection',
      'Lost luggage compensation'
    ]
  },
  {
    id: 'elite',
    name: 'Elite Insurance',
    price: 50,
    coverage: 'Up to $10,000',
    description: 'Maximum protection for peace of mind',
    features: [
      'All premium features',
      'Cancel for any reason',
      'Emergency evacuation',
      '24/7 travel assistance'
    ]
  }
]

export default function InsuranceSelector({ onSelection }: InsuranceSelectorProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null)

  const handleSelection = (optionId: string | null) => {
    setSelectedOption(optionId)
  }

  const handleConfirm = () => {
    const option = insuranceOptions.find(opt => opt.id === selectedOption) || null
    onSelection(option)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Travel Insurance</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          {/* No insurance option */}
          <div className="border rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <Checkbox
                id="none"
                checked={selectedOption === null}
                onCheckedChange={() => handleSelection(null)}
              />
              <Label htmlFor="none" className="flex-1 cursor-pointer">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">No Insurance</span>
                  <span className="text-muted-foreground">$0</span>
                </div>
              </Label>
            </div>
          </div>

          {/* Insurance options */}
          {insuranceOptions.map((option) => (
            <div key={option.id} className="border rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Checkbox
                  id={option.id}
                  checked={selectedOption === option.id}
                  onCheckedChange={() => handleSelection(option.id)}
                />
                <Label htmlFor={option.id} className="flex-1 cursor-pointer space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-semibold">{option.name}</div>
                      <div className="text-sm text-muted-foreground">{option.coverage}</div>
                    </div>
                    <div className="font-semibold">${option.price}</div>
                  </div>
                  
                  <p className="text-sm">{option.description}</p>
                  
                  <div className="space-y-1">
                    {option.features.map((feature, index) => (
                      <div key={index} className="flex items-center text-sm text-muted-foreground">
                        <Shield className="w-3 h-3 mr-2" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </Label>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-red-600 mt-0.5" />
            <div className="text-sm text-red-800">
              <p className="font-semibold">Why consider travel insurance?</p>
              <p>Protect your investment against unexpected events like trip cancellations, medical emergencies, and travel disruptions.</p>
            </div>
          </div>
        </div>

        <Button onClick={handleConfirm} className="w-full">
          Confirm Insurance Selection
        </Button>
      </CardContent>
    </Card>
  )
}