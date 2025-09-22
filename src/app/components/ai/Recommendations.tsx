"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card'
import { Button } from '@/app/components/ui/button'
import { Badge } from '@/app/components/ui/badge'
import { Plane, Hotel, MapPin, Star, Luggage, Clock } from 'lucide-react'

interface Recommendation {
  id: string
  type: 'flight' | 'hotel' | 'activity' | 'upgrade' | 'service'
  title: string
  description: string
  price: number
  originalPrice?: number
  rating: number
  reviewCount: number
  image: string
  features: string[]
  relevance: number
  duration?: string
  location?: string
  discount?: number
}

interface RecommendationFlightData {
  price: number;

}

interface RecommendationsProps {
  flight: RecommendationFlightData;
  passengerCount: number;
  travelDates: { start: string; end: string };
  destination: string;
  budget?: number;
}



export default function Recommendations({ flight, passengerCount, travelDates, destination, budget }: RecommendationsProps) {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate AI recommendations based on flight details
    const generateRecommendations = () => {
      setIsLoading(true)
      
      setTimeout(() => {
        const mockRecommendations: Recommendation[] = [
          {
            id: 'upgrade-1',
            type: 'upgrade',
            title: 'Premium Economy Upgrade',
            description: 'Enjoy extra legroom, priority boarding, and enhanced services for a more comfortable journey',
            price: 150 * passengerCount,
            originalPrice: 200 * passengerCount,
            discount: 25,
            rating: 4.8,
            reviewCount: 1247,
            image: '/images/recommendations/premium-economy.jpg',
            features: ['Extra legroom (38")', 'Priority check-in', 'Enhanced meal service', 'Premium entertainment'],
            relevance: 95
          },
          {
            id: 'hotel-1',
            type: 'hotel',
            title: 'Airport Luxury Hotel',
            description: '4-star hotel with free airport shuttle, perfect for early departures or layovers',
            price: 189,
            originalPrice: 229,
            discount: 17,
            rating: 4.5,
            reviewCount: 892,
            image: '/images/recommendations/hotel-airport.jpg',
            features: ['Free airport shuttle', '24-hour reception', 'Fitness center', 'Complimentary breakfast'],
            relevance: 88,
            location: 'Airport Area',
            duration: '1 night'
          },
          {
            id: 'activity-1',
            type: 'activity',
            title: 'City Highlights Tour',
            description: 'Discover the best of the city with our expert local guide during your layover',
            price: 75,
            rating: 4.7,
            reviewCount: 567,
            image: '/images/recommendations/city-tour.jpg',
            features: ['4-hour guided tour', 'Transportation included', 'Local cuisine tasting', 'Photo opportunities'],
            relevance: 82,
            location: destination,
            duration: '4 hours'
          },
          {
            id: 'service-1',
            type: 'service',
            title: 'Priority Baggage Service',
            description: 'Your luggage will be among the first to arrive on the carousel',
            price: 25 * passengerCount,
            rating: 4.6,
            reviewCount: 2341,
            image: '/images/recommendations/priority-baggage.jpg',
            features: ['First baggage delivery', 'Tracking available', 'Damage protection', '24/7 support'],
            relevance: 91
          },
          {
            id: 'hotel-2',
            type: 'hotel',
            title: 'Downtown Business Hotel',
            description: 'Modern hotel in the heart of the city with excellent transport links',
            price: 145,
            originalPrice: 175,
            discount: 17,
            rating: 4.3,
            reviewCount: 456,
            image: '/images/recommendations/hotel-downtown.jpg',
            features: ['City center location', 'Business center', 'Restaurant & bar', 'Free WiFi'],
            relevance: 79,
            location: 'City Center',
            duration: '1 night'
          },
          {
            id: 'flight-1',
            type: 'flight',
            title: 'Return Flight Discount',
            description: 'Special offer on return flights when you book round trip',
            price: flight.price * 0.9 * passengerCount,
            originalPrice: flight.price * passengerCount,
            discount: 10,
            rating: 4.9,
            reviewCount: 3124,
            image: '/images/recommendations/return-flight.jpg',
            features: ['Round trip savings', 'Flexible dates', 'Same airline benefits'],
            relevance: 96
          }
        ]

        // Sort by relevance
        mockRecommendations.sort((a, b) => b.relevance - a.relevance)
        setRecommendations(mockRecommendations)
        setIsLoading(false)
      }, 1500)
    }

    generateRecommendations()
  }, [flight, passengerCount, travelDates, destination, budget])

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'flight': return <Plane className="w-4 h-4" />
      case 'hotel': return <Hotel className="w-4 h-4" />
      case 'activity': return <MapPin className="w-4 h-4" />
      case 'upgrade': return <Star className="w-4 h-4" />
      case 'service': return <Luggage className="w-4 h-4" />
      default: return <Star className="w-4 h-4" />
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'flight': return 'Flight'
      case 'hotel': return 'Hotel'
      case 'activity': return 'Activity'
      case 'upgrade': return 'Upgrade'
      case 'service': return 'Service'
      default: return 'Offer'
    }
  }

  const filteredRecommendations = selectedCategory === 'all' 
    ? recommendations 
    : recommendations.filter(rec => rec.type === selectedCategory)

  const categories = [
    { id: 'all', label: 'All Recommendations', icon: Star },
    { id: 'upgrade', label: 'Flight Upgrades', icon: Plane },
    { id: 'hotel', label: 'Hotels', icon: Hotel },
    { id: 'activity', label: 'Activities', icon: MapPin },
    { id: 'service', label: 'Services', icon: Luggage }
  ]

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Personalized Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex gap-4">
                <div className="w-20 h-20 bg-muted rounded"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-muted rounded w-3/4"></div>
                  <div className="h-4 bg-muted rounded w-1/2"></div>
                  <div className="h-4 bg-muted rounded w-1/4"></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI-Powered Recommendations</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Category filter */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className="flex items-center gap-2"
              >
                <Icon className="w-4 h-4" />
                {category.label}
              </Button>
            )
          })}
        </div>

        {/* Recommendations list */}
        <div className="space-y-4">
          {filteredRecommendations.map((recommendation) => (
            <div key={recommendation.id} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  {getTypeIcon(recommendation.type)}
                  <Badge variant="outline" className="capitalize">
                    {getTypeLabel(recommendation.type)}
                  </Badge>
                  <span className="font-semibold">{recommendation.title}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm">{recommendation.rating}</span>
                  <span className="text-sm text-muted-foreground">({recommendation.reviewCount})</span>
                </div>
              </div>

              <p className="text-sm text-muted-foreground">{recommendation.description}</p>

              {(recommendation.location || recommendation.duration) && (
                <div className="flex items-center gap-4 text-sm">
                  {recommendation.location && (
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span>{recommendation.location}</span>
                    </div>
                  )}
                  {recommendation.duration && (
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span>{recommendation.duration}</span>
                    </div>
                  )}
                </div>
              )}

              <div className="space-y-2">
                {recommendation.features.map((feature, index) => (
                  <div key={index} className="flex items-center text-sm">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></div>
                    {feature}
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-primary">
                    ${recommendation.price}
                    {passengerCount > 1 && recommendation.type !== 'hotel' && ' total'}
                  </span>
                  {recommendation.originalPrice && (
                    <span className="text-sm text-muted-foreground line-through">
                      ${recommendation.originalPrice}
                    </span>
                  )}
                  {recommendation.discount && (
                    <Badge variant="secondary" className="ml-2">
                      Save {recommendation.discount}%
                    </Badge>
                  )}
                </div>
                <Button size="sm">
                  Add to Booking
                </Button>
              </div>
            </div>
          ))}
        </div>

        {filteredRecommendations.length === 0 && (
          <div className="text-center text-muted-foreground py-8">
            No recommendations found for this category.
          </div>
        )}

        <div className="text-xs text-muted-foreground">
          * Recommendations are personalized using AI based on your flight details, 
          travel preferences, and current availability. Prices are subject to change.
        </div>
      </CardContent>
    </Card>
  )
}
