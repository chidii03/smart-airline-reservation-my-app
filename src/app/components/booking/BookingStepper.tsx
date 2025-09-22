"use client"

import { Card, CardContent } from '@/app/components/ui/card'
import { Button } from '@/app/components/ui/button'
import { Check } from 'lucide-react'
import { cn } from '@/app/lib/utils'

const steps = [
  { id: 'details', title: 'Flight Details', description: 'Select flight options' },
  { id: 'passengers', title: 'Passenger Info', description: 'Enter passenger details' },
  { id: 'seats', title: 'Seat Selection', description: 'Choose your seats' },
  { id: 'payment', title: 'Payment', description: 'Complete payment' },
  { id: 'confirmation', title: 'Confirmation', description: 'Booking confirmed' },
]

interface BookingStepperProps {
  currentStep: string
  onStepChange: (step: string) => void
  children: React.ReactNode
}

export default function BookingStepper({ currentStep, onStepChange, children }: BookingStepperProps) {
  const currentIndex = steps.findIndex(step => step.id === currentStep)

  return (
    <div className="space-y-6">
      {/* Stepper */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold",
                      index < currentIndex && "bg-primary text-primary-foreground",
                      index === currentIndex && "bg-primary text-primary-foreground",
                      index > currentIndex && "bg-muted text-muted-foreground"
                    )}
                  >
                    {index < currentIndex ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      index + 1
                    )}
                  </div>
                  <div className="text-xs mt-2 text-center hidden sm:block">
                    {step.title}
                  </div>
                </div>
                
                {index < steps.length - 1 && (
                  <div
                    className={cn(
                      "w-16 h-0.5 mx-2",
                      index < currentIndex ? "bg-primary" : "bg-muted"
                    )}
                  />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Content */}
      {children}

      {/* Navigation */}
      {currentStep !== 'confirmation' && (
        <div className="flex justify-between">
          <Button
            variant="outline"
            disabled={currentIndex === 0}
            onClick={() => onStepChange(steps[currentIndex - 1]?.id)}
          >
            Previous
          </Button>
          
          <Button
            onClick={() => onStepChange(steps[currentIndex + 1]?.id)}
          >
            {currentIndex === steps.length - 2 ? 'Complete Booking' : 'Next'}
          </Button>
        </div>
      )}
    </div>
  )
}


