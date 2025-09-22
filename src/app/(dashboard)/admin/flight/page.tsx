'use client'

import { useState } from 'react'
import {
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Plane,
  MapPin,
  Calendar,
  Clock,
  Users
} from 'lucide-react'

import { Button } from '@/app/components/ui/button'
import { Input } from '@/app/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/app/components/ui/dialog'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/app/components/ui/table'
import { Badge } from '@/app/components/ui/badge'

interface Flight {
  id: number;
  flightNumber: string;
  airline: string;
  departureAirport: string;
  arrivalAirport: string;
  departureTime: string;
  arrivalTime: string;
  price: number;
  totalSeats: number;
  availableSeats: number;
  status: 'scheduled' | 'boarding' | 'departed' | 'arrived' | 'delayed' | 'cancelled';
}

const mockFlights: Flight[] = [
  {
    id: 1,
    flightNumber: 'SJ101',
    airline: 'SkyJet Airways',
    departureAirport: 'JFK',
    arrivalAirport: 'LAX',
    departureTime: '2024-06-15T08:00:00',
    arrivalTime: '2024-06-15T11:30:00',
    price: 299,
    totalSeats: 180,
    availableSeats: 45,
    status: 'scheduled'
  },
  {
    id: 2,
    flightNumber: 'SJ202',
    airline: 'SkyJet Airways',
    departureAirport: 'LAX',
    arrivalAirport: 'JFK',
    departureTime: '2024-06-15T14:00:00',
    arrivalTime: '2024-06-15T22:30:00',
    price: 349,
    totalSeats: 180,
    availableSeats: 12,
    status: 'scheduled'
  },
  {
    id: 3,
    flightNumber: 'SJ303',
    airline: 'SkyJet Airways',
    departureAirport: 'ORD',
    arrivalAirport: 'MIA',
    departureTime: '2024-06-16T09:30:00',
    arrivalTime: '2024-06-16T12:45:00',
    price: 199,
    totalSeats: 150,
    availableSeats: 89,
    status: 'boarding'
  }
]

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)
}

const formatDate = (dateString: string, type: 'date' | 'time') => {
  const date = new Date(dateString)
  if (type === 'date') {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  } else {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }
}

export default function AdminFlightsPage() {
  const [flights, setFlights] = useState(mockFlights)
  const [searchTerm, setSearchTerm] = useState('')
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newFlight, setNewFlight] = useState({
    flightNumber: '',
    airline: '',
    departureAirport: '',
    arrivalAirport: '',
    departureTime: '',
    arrivalTime: '',
    price: '',
    totalSeats: ''
  })

  const filteredFlights = flights.filter(flight =>
    flight.flightNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    flight.airline.toLowerCase().includes(searchTerm.toLowerCase()) ||
    flight.departureAirport.toLowerCase().includes(searchTerm.toLowerCase()) ||
    flight.arrivalAirport.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleAddFlight = () => {
    if (newFlight.flightNumber && newFlight.airline && newFlight.departureAirport && 
        newFlight.arrivalAirport && newFlight.departureTime && newFlight.arrivalTime &&
        newFlight.price && newFlight.totalSeats) {
      const flight: Flight = {
        id: Date.now(),
        flightNumber: newFlight.flightNumber,
        airline: newFlight.airline,
        departureAirport: newFlight.departureAirport,
        arrivalAirport: newFlight.arrivalAirport,
        departureTime: newFlight.departureTime,
        arrivalTime: newFlight.arrivalTime,
        price: Number(newFlight.price),
        totalSeats: Number(newFlight.totalSeats),
        availableSeats: Number(newFlight.totalSeats),
        status: 'scheduled'
      }
      setFlights(prev => [...prev, flight])
      setNewFlight({
        flightNumber: '',
        airline: '',
        departureAirport: '',
        arrivalAirport: '',
        departureTime: '',
        arrivalTime: '',
        price: '',
        totalSeats: ''
      })
      setIsAddDialogOpen(false)
    }
  }

  const handleDeleteFlight = (id: number) => {
    setFlights(prev => prev.filter(flight => flight.id !== id))
  }

  const getStatusBadge = (status: Flight['status']) => {
    const statusConfig = {
      scheduled: { label: 'Scheduled', variant: 'default' as const },
      boarding: { label: 'Boarding', variant: 'secondary' as const },
      departed: { label: 'Departed', variant: 'outline' as const },
      arrived: { label: 'Arrived', variant: 'success' as const },
      delayed: { label: 'Delayed', variant: 'warning' as const },
      cancelled: { label: 'Cancelled', variant: 'destructive' as const }
    }
    const config = statusConfig[status] || statusConfig.scheduled
    return <Badge variant={config.variant}>{config.label}</Badge>
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Flight Management</h1>
          <p className="text-gray-600">Manage your airline flight schedule and operations</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Flight
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Flight</DialogTitle>
              <DialogDescription>
                Create a new flight schedule for your airline
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Flight Number
                  </label>
                  <Input
                    placeholder="SJ101"
                    value={newFlight.flightNumber}
                    onChange={(e) => setNewFlight({ ...newFlight, flightNumber: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Airline
                  </label>
                  <Input
                    placeholder="SkyJet Airways"
                    value={newFlight.airline}
                    onChange={(e) => setNewFlight({ ...newFlight, airline: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Departure Airport
                  </label>
                  <Input
                    placeholder="JFK"
                    value={newFlight.departureAirport}
                    onChange={(e) => setNewFlight({ ...newFlight, departureAirport: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Arrival Airport
                  </label>
                  <Input
                    placeholder="LAX"
                    value={newFlight.arrivalAirport}
                    onChange={(e) => setNewFlight({ ...newFlight, arrivalAirport: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Departure Time
                  </label>
                  <Input
                    type="datetime-local"
                    value={newFlight.departureTime}
                    onChange={(e) => setNewFlight({ ...newFlight, departureTime: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Arrival Time
                  </label>
                  <Input
                    type="datetime-local"
                    value={newFlight.arrivalTime}
                    onChange={(e) => setNewFlight({ ...newFlight, arrivalTime: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price ($)
                  </label>
                  <Input
                    type="number"
                    placeholder="299"
                    value={newFlight.price}
                    onChange={(e) => setNewFlight({ ...newFlight, price: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Total Seats
                  </label>
                  <Input
                    type="number"
                    placeholder="180"
                    value={newFlight.totalSeats}
                    onChange={(e) => setNewFlight({ ...newFlight, totalSeats: e.target.value })}
                  />
                </div>
              </div>
              <Button onClick={handleAddFlight} className="w-full">
                Add Flight
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <Input
                  placeholder="Search flights..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline">Export</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Flights Table */}
      <Card>
        <CardHeader>
          <CardTitle>Flight Schedule</CardTitle>
          <CardDescription>
            {filteredFlights.length} flights found
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Flight</TableHead>
                <TableHead>Route</TableHead>
                <TableHead>Schedule</TableHead>
                <TableHead>Seats</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredFlights.map((flight) => (
                <TableRow key={flight.id}>
                  <TableCell>
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-3">
                        <Plane className="w-4 h-4 text-red-600" />
                      </div>
                      <div>
                        <div className="font-medium">{flight.flightNumber}</div>
                        <div className="text-sm text-gray-600">{flight.airline}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="font-medium">{flight.departureAirport}</span>
                      <span className="mx-2">→</span>
                      <span className="font-medium">{flight.arrivalAirport}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                        <span className="text-sm">{formatDate(flight.departureTime, 'date')}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 text-gray-400 mr-2" />
                        <span className="text-sm">{formatDate(flight.departureTime, 'time')}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 text-gray-400 mr-2" />
                      <span>{flight.availableSeats}/{flight.totalSeats}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium text-green-600">
                      {formatCurrency(flight.price)}
                    </div>
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(flight.status)}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteFlight(flight.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredFlights.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Plane className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No flights found</h3>
              <p className="text-gray-600 mb-4">
                {searchTerm ? 'Try adjusting your search criteria' : 'Get started by adding your first flight'}
              </p>
              <Button onClick={() => setIsAddDialogOpen(true)}>
                Add Flight
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
