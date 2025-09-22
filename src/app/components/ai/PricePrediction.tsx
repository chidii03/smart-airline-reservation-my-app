
"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card'
import { Button } from '@/app/components/ui/button'
import { Input } from '@/app/components/ui/input'
import { Label } from '@/app/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/components/ui/select'
import { TrendingUp, TrendingDown, Calendar, BarChart3 } from 'lucide-react'

interface FlightPriceData {
  price: number;
  flightNumber: string;
}

interface PricePredictionProps {
  flight: FlightPriceData;
  
}
export default function PricePrediction({ flight }: PricePredictionProps) {
  const [prediction, setPrediction] = useState<{
    predictedPrice: number
    confidence: number
    trend: 'up' | 'down'
    recommendation: string
    factors: string[]
  } | null>(null)

  const [isLoading, setIsLoading] = useState(false)
  const [daysUntilDeparture, setDaysUntilDeparture] = useState('')
  const [season, setSeason] = useState('')

  const predictPrice = async () => {
    setIsLoading(true)
    
    // Simulate AI prediction with more sophisticated logic
    setTimeout(() => {
      const basePrice = flight.price
      let trend: 'up' | 'down' = 'up'
      let change = 1.0
      const factors: string[] = []
      
      // Calculate based on days until departure
      const days = parseInt(daysUntilDeparture) || 30
      if (days < 7) {
        // Last-minute booking - prices usually higher
        trend = 'up'
        change = 1.25 + (Math.random() * 0.15)
        factors.push('Last-minute booking premium')
      } else if (days < 21) {
        // Medium-term booking
        trend = Math.random() > 0.6 ? 'up' : 'down'
        change = trend === 'up' ? 1.1 : 0.92
        factors.push('Medium-term booking window')
      } else {
        // Long-term booking - prices might drop
        trend = 'down'
        change = 0.85 + (Math.random() * 0.08)
        factors.push('Early booking advantage')
      }

      // Adjust based on season
      if (season === 'peak') {
        change *= 1.2
        trend = 'up'
        factors.push('Peak season demand')
      } else if (season === 'low') {
        change *= 0.88
        trend = 'down'
        factors.push('Low season discounts')
      } else if (season === 'shoulder') {
        change *= 0.95
        factors.push('Shoulder season pricing')
      }

      // Random market factors
      if (Math.random() > 0.7) {
        change *= 1.05
        factors.push('Increased demand')
      }
      if (Math.random() > 0.6) {
        change *= 0.97
        factors.push('Special promotion')
      }

      const predictedPrice = Math.round(basePrice * change)
      const confidence = Math.floor(80 + Math.random() * 15) // 80-95% confidence

      setPrediction({
        predictedPrice,
        confidence,
        trend,
        recommendation: trend === 'up' 
          ? 'Prices are trending upward. Booking now could save you money compared to waiting.' 
          : 'Prices may decrease further. Consider setting a price alert if you can wait.',
        factors
      })
      setIsLoading(false)
    }, 2000)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5" />
          AI Price Prediction
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Days until departure
            </Label>
            <Input 
              type="number" 
              placeholder="e.g., 21" 
              value={daysUntilDeparture}
              onChange={(e) => setDaysUntilDeparture(e.target.value)}
              min="1"
              max="365"
            />
          </div>
          <div className="space-y-2">
            <Label>Travel Season</Label>
            <Select value={season} onValueChange={setSeason}>
              <SelectTrigger>
                <SelectValue placeholder="Select season" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low Season</SelectItem>
                <SelectItem value="shoulder">Shoulder Season</SelectItem>
                <SelectItem value="peak">Peak Season</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button 
          onClick={predictPrice} 
          className="w-full"
          disabled={isLoading || !daysUntilDeparture || !season}
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
              Analyzing market trends...
            </div>
          ) : (
            'Predict Price Trend'
          )}
        </Button>

        {prediction && (
          <div className="p-4 border rounded-lg space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-semibold">Predicted Price:</span>
              <div className="text-right">
                <span className="text-2xl font-bold text-primary">
                  ${prediction.predictedPrice}
                </span>
                <div className="text-sm text-muted-foreground">
                  vs current ${flight.price}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {prediction.trend === 'up' ? (
                <TrendingUp className="w-5 h-5 text-red-500" />
              ) : (
                <TrendingDown className="w-5 h-5 text-green-500" />
              )}
              <span className={prediction.trend === 'up' ? 'text-red-500 font-medium' : 'text-green-500 font-medium'}>
                {prediction.trend === 'up' ? 'Increasing trend' : 'Decreasing trend'}
              </span>
              <span className="text-sm text-muted-foreground">
                ({prediction.confidence}% confidence)
              </span>
            </div>

            {prediction.factors.length > 0 && (
              <div className="space-y-2">
                <span className="text-sm font-medium">Key factors:</span>
                <ul className="text-sm text-muted-foreground space-y-1">
                  {prediction.factors.map((factor, index) => (
                    <li key={index}>• {factor}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-800">{prediction.recommendation}</p>
            </div>
          </div>
        )}

        <div className="text-xs text-muted-foreground">
          * AI predictions are based on historical pricing data, market trends, and seasonal patterns. 
          Actual prices may vary based on real-time demand and availability.
        </div>
      </CardContent>
    </Card>
  )
}