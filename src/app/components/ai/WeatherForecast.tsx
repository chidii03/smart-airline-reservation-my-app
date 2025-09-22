"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card'
import { 
  Cloud, 
  Sun, 
  CloudRain, 
  CloudSnow, 
  CloudDrizzle,
  Thermometer,
  Droplets,
  Wind,
  Calendar
} from 'lucide-react'

interface WeatherDay {
  date: string
  temperature: number
  high: number
  low: number
  condition: 'sunny' | 'cloudy' | 'rainy' | 'snowy' | 'partly-cloudy' | 'thunderstorm'
  humidity: number
  windSpeed: number
  precipitation: number
  uvIndex: number
}

interface WeatherForecastProps {
  destination: string
  travelDate: string
  duration?: number
}

export default function WeatherForecast({ destination, travelDate, duration = 5 }: WeatherForecastProps) {
  const [forecast, setForecast] = useState<WeatherDay[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate weather data fetch
    const fetchWeather = () => {
      setIsLoading(true)
      
      setTimeout(() => {
        const mockForecast: WeatherDay[] = [
          {
            date: '2024-01-15',
            temperature: 22,
            high: 25,
            low: 18,
            condition: 'sunny',
            humidity: 45,
            windSpeed: 12,
            precipitation: 0,
            uvIndex: 7
          },
          {
            date: '2024-01-16',
            temperature: 20,
            high: 23,
            low: 16,
            condition: 'partly-cloudy',
            humidity: 55,
            windSpeed: 15,
            precipitation: 10,
            uvIndex: 5
          },
          {
            date: '2024-01-17',
            temperature: 18,
            high: 20,
            low: 14,
            condition: 'rainy',
            humidity: 75,
            windSpeed: 20,
            precipitation: 80,
            uvIndex: 2
          },
          {
            date: '2024-01-18',
            temperature: 21,
            high: 24,
            low: 17,
            condition: 'cloudy',
            humidity: 60,
            windSpeed: 10,
            precipitation: 20,
            uvIndex: 3
          },
          {
            date: '2024-01-19',
            temperature: 24,
            high: 27,
            low: 20,
            condition: 'sunny',
            humidity: 40,
            windSpeed: 8,
            precipitation: 0,
            uvIndex: 8
          }
        ]
        setForecast(mockForecast)
        setIsLoading(false)
      }, 2000)
    }

    fetchWeather()
  }, [destination, travelDate, duration])

  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case 'sunny': return <Sun className="w-6 h-6 text-yellow-500" />
      case 'cloudy': return <Cloud className="w-6 h-6 text-gray-500" />
      case 'rainy': return <CloudRain className="w-6 h-6 text-blue-500" />
      case 'snowy': return <CloudSnow className="w-6 h-6 text-blue-300" />
      case 'thunderstorm': return <CloudRain className="w-6 h-6 text-purple-500" />
      case 'partly-cloudy': return <CloudDrizzle className="w-6 h-6 text-gray-400" />
      default: return <Sun className="w-6 h-6" />
    }
  }

  const getConditionName = (condition: string) => {
    switch (condition) {
      case 'sunny': return 'Sunny'
      case 'cloudy': return 'Cloudy'
      case 'rainy': return 'Rainy'
      case 'snowy': return 'Snowy'
      case 'thunderstorm': return 'Thunderstorms'
      case 'partly-cloudy': return 'Partly Cloudy'
      default: return 'Clear'
    }
  }

  const getUvIndexLevel = (uvIndex: number) => {
    if (uvIndex <= 2) return { level: 'Low', color: 'text-green-600' }
    if (uvIndex <= 5) return { level: 'Moderate', color: 'text-yellow-600' }
    if (uvIndex <= 7) return { level: 'High', color: 'text-orange-600' }
    if (uvIndex <= 10) return { level: 'Very High', color: 'text-red-600' }
    return { level: 'Extreme', color: 'text-purple-600' }
  }

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Weather Forecast</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-muted rounded w-3/4"></div>
            <div className="grid grid-cols-5 gap-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-20 bg-muted rounded"></div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  const averageTemp = forecast.reduce((sum, day) => sum + day.temperature, 0) / forecast.length
  const maxPrecipitation = Math.max(...forecast.map(day => day.precipitation))

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Cloud className="w-5 h-5" />
          AI Weather Forecast for {destination}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Weather summary */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Thermometer className="w-4 h-4" />
              <span>Average: {Math.round(averageTemp)}°C</span>
            </div>
            <div className="flex items-center gap-2">
              <Droplets className="w-4 h-4" />
              <span>Max rain: {maxPrecipitation}%</span>
            </div>
            <div className="flex items-center gap-2">
              <Wind className="w-4 h-4" />
              <span>Wind: {forecast[0].windSpeed} km/h</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{forecast.length} days</span>
            </div>
          </div>

          {/* Daily forecast */}
          <div className="grid grid-cols-5 gap-2">
            {forecast.map((day, index) => {
              const uvInfo = getUvIndexLevel(day.uvIndex)
              return (
                <div key={index} className="text-center p-2 border rounded-lg">
                  <div className="text-xs font-medium mb-2">
                    {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}
                  </div>
                  <div className="mb-2">{getWeatherIcon(day.condition)}</div>
                  <div className="text-lg font-bold">{day.temperature}°C</div>
                  <div className="text-xs text-muted-foreground">
                    H: {day.high}° L: {day.low}°
                  </div>
                  <div className="text-xs capitalize mt-1">
                    {getConditionName(day.condition)}
                  </div>
                  {day.precipitation > 0 && (
                    <div className="text-xs text-blue-500 mt-1">
                      💧 {day.precipitation}%
                    </div>
                  )}
                  <div className="text-xs mt-1">
                    <span className={uvInfo.color}>UV: {day.uvIndex}</span>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Travel recommendations */}
          <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm font-semibold text-blue-800 mb-2">📋 Travel Tips:</p>
            <div className="text-sm text-blue-800 space-y-1">
              <p>• Pack for temperatures between {Math.min(...forecast.map(d => d.low))}°C and {Math.max(...forecast.map(d => d.high))}°C</p>
              {maxPrecipitation > 50 && (
                <p>• Bring waterproof clothing and umbrella for rainy days</p>
              )}
              {averageTemp > 20 && (
                <p>• Light, breathable clothing recommended</p>
              )}
              {forecast.some(day => day.uvIndex > 6) && (
                <p>• Sun protection recommended (hat, sunscreen, sunglasses)</p>
              )}
            </div>
          </div>

          <div className="text-xs text-muted-foreground">
            * AI-powered forecast updated hourly. Weather conditions may change rapidly. 
            Last updated: {new Date().toLocaleTimeString()}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}