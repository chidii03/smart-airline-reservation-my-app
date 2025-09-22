import { Flight, Aircraft, Seat } from '@/app/types/flight';
import { mockAirports } from './mockAirports';

const generateAircraftRegistration = (aircraftType: string) => {
  return `${aircraftType.substring(0, 3)}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;
};

const generateRandomTime = (baseHour: number, variation: number = 2) => {
  const hour = baseHour + Math.floor(Math.random() * variation);
  const minute = Math.floor(Math.random() * 60);
  return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
};

const generateRandomPrice = (basePrice: number, variation: number = 200) => {
  return basePrice + Math.floor(Math.random() * variation);
};

const addDays = (date: Date, days: number) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

const generateSeats = (totalSeats: number, cabinClassBreakdown: { business: number; economy: number }): Seat[] => {
  const seats: Seat[] = [];
  let seatIdCounter = 1;
  const generateSeat = (cabinClass: 'business' | 'economy', row: number, column: string, basePrice: number): Seat => {
    return {
      id: `seat-${seatIdCounter++}`,
      row: row.toString(),
      column: column,
      cabinClass: cabinClass,
      status: Math.random() < 0.3 ? 'occupied' : 'available',
      price: basePrice + (cabinClass === 'business' ? 200 : 0),
    };
  };

  const alphabet = 'ABCDEFGH';
  let currentRow = 1;
  let seatsGenerated = 0;

  // Business Class
  const businessCols = ['A', 'C', 'D', 'F'];
  while (seatsGenerated < cabinClassBreakdown.business) {
    for (const col of businessCols) {
      if (seatsGenerated >= cabinClassBreakdown.business) break;
      seats.push(generateSeat('business', currentRow, col, 500));
      seatsGenerated++;
    }
    currentRow++;
  }

  // Economy Class
  const economyCols = ['A', 'B', 'C', 'D', 'E', 'F'];
  while (seatsGenerated < totalSeats) {
    for (const col of economyCols) {
      if (seatsGenerated >= totalSeats) break;
      seats.push(generateSeat('economy', currentRow, col, 200));
      seatsGenerated++;
    }
    currentRow++;
  }

  return seats;
};


export const mockAircraft: Aircraft[] = [
  {
    id: 'ac-001',
    type: 'Boeing 737',
    model: '737-800',
    capacity: 189,
    speed: 839,
    range: 5430,
    manufacturer: 'Boeing',
    year: 2018,
  },
  {
    id: 'ac-002',
    type: 'Airbus A320',
    model: 'A320neo',
    capacity: 180,
    speed: 829,
    range: 6300,
    manufacturer: 'Airbus',
    year: 2020,
  },
  {
    id: 'ac-003',
    type: 'Boeing 787',
    model: '787-9 Dreamliner',
    capacity: 290,
    speed: 903,
    range: 14140,
    manufacturer: 'Boeing',
    year: 2019,
  },
  {
    id: 'ac-004',
    type: 'Airbus A380',
    model: 'A380-800',
    capacity: 544,
    speed: 903,
    range: 15200,
    manufacturer: 'Airbus',
    year: 2017,
  },
  {
    id: 'ac-005',
    type: 'Embraer E190',
    model: 'E190-E2',
    capacity: 114,
    speed: 829,
    range: 5300,
    manufacturer: 'Embraer',
    year: 2021,
  },
];

const today = new Date();
const flightDates = Array.from({ length: 30 }, (_, i) => addDays(today, i));

export const mockFlights: Flight[] = [];

const createMockFlight = (
  flightId: string,
  flightNumber: string,
  airline: string,
  departureCode: string,
  arrivalCode: string,
  aircraftIndex: number,
  basePrice: number,
  duration: number,
  date: Date,
  isNextDayArrival: boolean = false
): Flight => {
  const departureAirport = mockAirports.find((a) => a.code === departureCode)!;
  const arrivalAirport = mockAirports.find((a) => a.code === arrivalCode)!;
  const aircraft = mockAircraft[aircraftIndex];
  const departureDate = date.toISOString().split('T')[0];
  const arrivalDate = isNextDayArrival
    ? addDays(date, 1).toISOString().split('T')[0]
    : departureDate;
  const departureTime = generateRandomTime(Math.floor(Math.random() * 24));
  const arrivalTime = generateRandomTime(Math.floor(Math.random() * 24));
  
  // Define a breakdown for business and economy seats
  const businessSeats = Math.floor(aircraft.capacity * 0.15); // 15% business class
  const economySeats = aircraft.capacity - businessSeats;

  // Now, create and return a single, valid Flight object
  return {
    id: flightId,
    flightNumber,
    airline,
    airlineCode: 'EA',
    airlineLogo: 'emirates_logo.png',
    // ADDED: The missing 'origin' property
    origin: departureAirport.code,
    // ADDED: The missing 'destination' property
    destination: arrivalAirport.code,
    departureAirport: departureAirport.name,
    departureAirportCode: departureAirport.code,
    departureCity: departureAirport.city,
    departureCountry: departureAirport.country,
    arrivalAirport: arrivalAirport.name,
    arrivalAirportCode: arrivalAirport.code,
    arrivalCity: arrivalAirport.city,
    arrivalCountry: arrivalAirport.country,
    departureTime: `${departureDate}T${departureTime}:00`,
    arrivalTime: `${arrivalDate}T${arrivalTime}:00`,
    duration,
    stops: 0,
    price: generateRandomPrice(basePrice),
    currency: 'USD',
    totalSeats: aircraft.capacity,
    availableSeats: Math.floor(Math.random() * (aircraft.capacity - 10)) + 10,
    aircraftType: aircraft.type,
    aircraftRegistration: generateAircraftRegistration(aircraft.type),
    status: 'scheduled',
    gate: 'A12',
    terminal: 'T4',
    baggageAllowance: { carryOn: 10, checked: 23 },
    amenities: {
      wifi: true,
      entertainment: true,
      powerOutlets: true,
      usbPorts: true,
      meals: true,
      drinks: true,
      extraLegroom: true,
    },
    operator: {
      name: airline,
      code: 'EA',
      iata: 'EK',
      icao: 'UAE',
    },
    distance: Math.floor(Math.random() * 10000),
    fuelEfficiency: Math.random() * 50,
    carbonEmissions: Math.random() * 5,
    sustainabilityRating: Math.floor(Math.random() * 5) + 1,
    onTimePerformance: Math.random(),
    lastUpdated: new Date().toISOString(),
    seats: generateSeats(aircraft.capacity, { business: businessSeats, economy: economySeats }),
  };
};

let flightIdCounter = 1;

flightDates.forEach((date) => {
  mockFlights.push(
    createMockFlight(
      `flight-${flightIdCounter++}`, // Use string ID
      'EA101',
      'Emirates Airlines',
      'JFK',
      'LHR',
      2,
      650,
      420,
      date
    )
  );

  mockFlights.push(
    createMockFlight(
      `flight-${flightIdCounter++}`,
      'EA202',
      'Emirates Airlines',
      'LAX',
      'DXB',
      3,
      1100,
      960,
      date,
      true
    )
  );

  mockFlights.push(
    createMockFlight(
      `flight-${flightIdCounter++}`,
      'EA303',
      'Emirates Airlines',
      'SIN',
      'SYD',
      1,
      550,
      480,
      date
    )
  );

  mockFlights.push(
    createMockFlight(
      `flight-${flightIdCounter++}`,
      'EA404',
      'Emirates Airlines',
      'CDG',
      'NRT',
      2,
      950,
      780,
      date,
      true
    )
  );

  mockFlights.push(
    createMockFlight(
      `flight-${flightIdCounter++}`,
      'EA505',
      'Emirates Airlines',
      'JFK',
      'LAX',
      0,
      350,
      300,
      date
    )
  );
});