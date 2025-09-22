"use client"

import { useState, useEffect, useCallback } from 'react'
import { apiClient } from '@/app/lib/api'
import { Flight, FlightSearchParams } from '@/app/types/flight'

interface UseFlightsProps {
  initialFlights?: Flight[]
  autoFetch?: boolean
}

interface UseFlightsReturn {
  flights: Flight[]
  loading: boolean
  error: string | null
  searchFlights: (params: FlightSearchParams) => Promise<void>
  getFlightById: (id: string) => Promise<Flight | null>
  refreshFlights: () => void
  filters: {
    airlines: string[]
    priceRange: [number, number]
    stops: number[]
    times: string[]
  }
  setFilters: (filters: Partial<UseFlightsReturn['filters']>) => void
  filteredFlights: Flight[]
}

export function useFlights({ initialFlights = [], autoFetch = false }: UseFlightsProps = {}): UseFlightsReturn {
  const [flights, setFlights] = useState<Flight[]>(initialFlights)
  const [filteredFlights, setFilteredFlights] = useState<Flight[]>(initialFlights)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [filters, setFiltersState] = useState({
    airlines: [] as string[],
    priceRange: [0, 5000] as [number, number],
    stops: [] as number[],
    times: [] as string[],
  })

  const applyFilters = useCallback((flightsList: Flight[], currentFilters: typeof filters) => {
    return flightsList.filter(flight => {
      // Airline filter
      if (currentFilters.airlines.length > 0 && !currentFilters.airlines.includes(flight.airline)) {
        return false
      }

      // Price filter
      if (flight.price < currentFilters.priceRange[0] || flight.price > currentFilters.priceRange[1]) {
        return false
      }

      // Stops filter
      if (currentFilters.stops.length > 0 && !currentFilters.stops.includes(flight.stops)) {
        return false
      }

      // Time filter
      if (currentFilters.times.length > 0) {
        const departureHour = new Date(flight.departureTime).getHours()
        let timeCategory = ''
        
        if (departureHour >= 6 && departureHour < 12) timeCategory = 'morning'
        else if (departureHour >= 12 && departureHour < 18) timeCategory = 'afternoon'
        else if (departureHour >= 18 && departureHour < 24) timeCategory = 'evening'
        else timeCategory = 'night'

        if (!currentFilters.times.includes(timeCategory)) {
          return false
        }
      }

      return true
    })
  }, [])

  const searchFlights = useCallback(async (params: FlightSearchParams) => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await apiClient.searchFlights(params)
      setFlights(response.data)
      setFilteredFlights(applyFilters(response.data, filters))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to search flights')
      setFlights([])
      setFilteredFlights([])
    } finally {
      setLoading(false)
    }
  }, [applyFilters, filters])

  const getFlightById = useCallback(async (id: string): Promise<Flight | null> => {
    try {
      const response = await apiClient.getFlightById(id)
      return response.data
    } catch {
      return null
    }
  }, [])

  const refreshFlights = useCallback(() => {
    setFilteredFlights(applyFilters(flights, filters))
  }, [flights, filters, applyFilters])

  const setFilters = useCallback((newFilters: Partial<typeof filters>) => {
    setFiltersState(prev => {
      const updated = { ...prev, ...newFilters }
      setFilteredFlights(applyFilters(flights, updated))
      return updated
    })
  }, [flights, applyFilters])

  // Auto-fetch flights on mount if enabled
  useEffect(() => {
    if (autoFetch && flights.length === 0) {
      searchFlights({
        origin: '',
        destination: '',
        departureDate: new Date().toISOString().split('T')[0],
        passengers: 1
      })
    }
  }, [autoFetch, flights.length, searchFlights])

  return {
    flights,
    filteredFlights,
    loading,
    error,
    searchFlights,
    getFlightById,
    refreshFlights,
    filters,
    setFilters
  }
}

// Hook for flight details
export function useFlight(flightId?: string) {
  const [flight, setFlight] = useState<Flight | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!flightId) {
      setLoading(false)
      return
    }

    const fetchFlight = async () => {
      try {
        setLoading(true)
        const response = await apiClient.getFlightById(flightId)
        setFlight(response.data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch flight details')
      } finally {
        setLoading(false)
      }
    }

    fetchFlight()
  }, [flightId])

  return { flight, loading, error }
}

// Hook for special deals
export function useSpecialDeals() {
  const [deals, setDeals] = useState<Flight[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        setLoading(true)
        const response = await apiClient.getSpecialDeals()
        setDeals(response.data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch special deals')
      } finally {
        setLoading(false)
      }
    }

    fetchDeals()
  }, [])

  return { deals, loading, error }
}