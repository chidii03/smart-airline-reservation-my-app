// app/flights/page.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  Plane, 
  Filter,
  MapPin,
  Calendar,
  Users,
  Star,
  Clock,
  Shield
} from 'lucide-react'
import Image from 'next/image'

import { useFlights } from '@/app/hooks/useFlights'
import { Button } from '@/app/components/ui/button'
import { Card, CardContent } from '@/app/components/ui/card'
import FlightList from '@/app/components/flights/FlightList'
import FlightFilters, { Filters } from '@/app/components/flights/FlightFilters'
import SearchForm from '@/app/components/shared/SearchForm'
import { Flight } from '@/app/types/flight'

export default function FlightsPage() {
  const router = useRouter()
  const { flights, loading } = useFlights({ autoFetch: true })
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState<Filters>({
    airlines: [],
    priceRange: [0, 2000],
    departureTime: [],
    stops: 'any',
    duration: [0, 24]
  })

  const filteredFlights = flights.filter(flight => {
    if (filters.airlines.length > 0 && !filters.airlines.includes(flight.airline)) return false
    if (flight.price < filters.priceRange[0] || flight.price > filters.priceRange[1]) return false
    if (filters.departureTime.length > 0) {
      const flightHour = new Date(flight.departureTime).getHours()
      const matchesTime = filters.departureTime.some(time => {
        if (time === 'morning') return flightHour >= 6 && flightHour < 12
        if (time === 'afternoon') return flightHour >= 12 && flightHour < 18
        if (time === 'evening') return flightHour >= 18 && flightHour < 24
        if (time === 'night') return flightHour >= 0 && flightHour < 6
        return false
      })
      if (!matchesTime) return false
    }
    return true
  })

  const handleSearch = (searchParams: Record<string, string>) => {
    router.push(`/flights/search?${new URLSearchParams(searchParams).toString()}`)
  }
  
  const features = [
    { 
      icon: <Clock className="w-8 h-8" />, 
      title: "24/7 Support", 
      description: "Our dedicated team is always here to help you, anytime, anywhere." 
    },
    { 
      icon: <Shield className="w-8 h-8" />, 
      title: "Secure Payments", 
      description: "Your transactions are protected with the highest level of security." 
    },
    { 
      icon: <Star className="w-8 h-8" />, 
      title: "Top-Rated Airlines", 
      description: "Book with confidence on flights from the world's best airlines." 
    },
    { 
      icon: <MapPin className="w-8 h-8" />, 
      title: "Global Destinations", 
      description: "Explore thousands of destinations around the globe with our extensive network." 
    },
    { 
      icon: <Users className="w-8 h-8" />, 
      title: "Easy Group Booking", 
      description: "Simple and convenient booking for groups of any size." 
    },
    { 
      icon: <Calendar className="w-8 h-8" />, 
      title: "Flexible Dates", 
      description: "Easily adjust your travel dates with flexible booking options." 
    }
  ]

  const popularDestinations = [
    {
      name: "Auckland,NewZealand",
      image: "https://images.pexels.com/photos/37650/new-zealand-lake-mountain-landscape-37650.jpeg",
      price: "$299",
    },
    {
      name: "Toronto,Canada",
      image: "https://images.pexels.com/photos/1519088/pexels-photo-1519088.jpeg",
      price: "$599",
    },
    {
      name: "UK, London",
      image: "https://images.pexels.com/photos/427679/pexels-photo-427679.jpeg",
      price: "$249",
    },
    {
      name: "Bali, Indonesia",
      image: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      price: "$499",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <Image
          src="https://worldfootprints.com/wp-content/uploads/2021/09/veligandu-island-in-Maldives-ofrers-vaccine-vacations.jpg"
          alt="Airplane flying over clouds"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-airline-red-900/70 to-airline-red-600/50"></div>
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl text-white">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold mb-4"
            >
              Discover Amazing Flights
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl mb-8"
            >
              Find the perfect flight to your dream destination with our extensive network
            </motion.p>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="container mx-auto px-4 py-8 -mt-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-2xl p-6"
        >
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Where to next?</h2>
            <p className="text-gray-600">Search for flights to anywhere in the world</p>
          </div>
          <SearchForm onSubmit={handleSearch} />
        </motion.div>
      </div>

      {/* Popular Destinations */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Popular Destinations</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our most sought-after travel destinations around the world
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {popularDestinations.map((destination, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
            >
              <Card className="overflow-hidden h-full transition-transform group-hover:shadow-xl">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={destination.image}
                    alt={destination.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="font-semibold text-lg">{destination.name}</h3>
                    <p className="text-sm">From {destination.price}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Main Content */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">All Flights</h2>
            <p className="text-gray-600">
              {filteredFlights.length} flights available
            </p>
          </div>
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center"
          >
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          {showFilters && (
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardContent className="p-6">
                  <FlightFilters
                    filters={filters}
                    onFiltersChange={setFilters}
                  />
                </CardContent>
              </Card>
            </div>
          )}

          {/* Flights List */}
          <div className={showFilters ? 'lg:col-span-3' : 'lg:col-span-4'}>
            <FlightList
              flights={filteredFlights}
              isLoading={loading}
              onSelect={(flight: Flight) => router.push(`/flights/${flight.id}`)}
            />

            {filteredFlights.length === 0 && !loading && (
              <Card>
                <CardContent className="p-12 text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Plane className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No flights found</h3>
                  <p className="text-gray-600 mb-4">
                    Try adjusting your filters or search criteria
                  </p>
                  <Button onClick={() => setFilters({
                    airlines: [],
                    priceRange: [0, 2000],
                    departureTime: [],
                    stops: 'any',
                    duration: [0, 24]
                  })}>
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Book With Us</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Experience the difference with our premium flight booking service
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6 bg-gray-50 rounded-lg hover:shadow-lg transition-shadow"
              >
                <div className="w-16 h-16 bg-airline-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="text-airline-red-600">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="font-semibold text-lg text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}