import { Airport } from '@/app/types/airport';

export const mockAirports: Airport[] = [
  {
    id: 1, // Converted from 'ap-001'
    code: 'JFK',
    name: 'John F. Kennedy International Airport',
    city: 'New York',
    country: 'United States',
    countryCode: 'US',
    region: 'North America',
    timezone: 'America/New_York',
    latitude: 40.639751,
    longitude: -73.778925,
    elevation: 13,
    website: 'https://www.jfkairport.com',
    phone: '+1-718-244-4444',
    email: 'info@jfkairport.com',
    // Placeholder for AirportFacilities (requires nested types)
    airportFacilities: {
      code: 'JFK',
      terminals: [
        { code: '1', name: 'Terminal 1', gates: [{ number: 'A1', location: 'North', services: ['Check-in'] }], facilities: ['Wi-Fi'], airlines: ['Delta'] },
        { code: '2', name: 'Terminal 2', gates: [{ number: 'B1', location: 'South', services: ['Security'] }], facilities: ['Shops'], airlines: ['American'] },
        { code: '4', name: 'Terminal 4', gates: [{ number: 'C1', location: 'East', services: ['Boarding'] }], facilities: ['Dining'], airlines: ['JetBlue'] },
        { code: '5', name: 'Terminal 5', gates: [{ number: 'D1', location: 'West', services: ['Lounge'] }], facilities: ['Restrooms'], airlines: ['United'] },
        { code: '7', name: 'Terminal 7', gates: [{ number: 'E1', location: 'North', services: ['Check-in'] }], facilities: ['Charging'], airlines: ['British Airways'] },
        { code: '8', name: 'Terminal 8', gates: [{ number: 'F1', location: 'South', services: ['Security'] }], facilities: ['ATM'], airlines: ['Qantas'] },
      ],
      runways: [
        { number: '4L/22R', length: 2800, width: 60, surface: 'Asphalt', lighted: true },
      ],
      services: [
        { type: 'Information', name: 'Info Desk', location: 'Terminal 1', hours: '24/7', description: 'General inquiries' },
      ],
      lounges: [
        { name: 'Delta Sky Club', airline: 'Delta', location: 'Terminal 4', access: ['Priority'], amenities: ['Wi-Fi'], hours: '6 AM - 10 PM' },
      ],
      shopping: [
        { name: 'Duty Free', type: 'Retail', location: 'Terminal 1', hours: '9 AM - 9 PM', description: 'Tax-free shopping' },
      ],
      dining: [
        { name: 'Starbucks', cuisine: 'Coffee', location: 'Terminal 2', hours: '6 AM - 8 PM', priceRange: '$$', rating: 4.5 },
      ],
    },
  },
  {
    id: 2, // Converted from 'ap-002'
    code: 'LAX',
    name: 'Los Angeles International Airport',
    city: 'Los Angeles',
    country: 'United States',
    countryCode: 'US',
    region: 'North America',
    timezone: 'America/Los_Angeles',
    latitude: 33.942791,
    longitude: -118.410042,
    elevation: 38,
    website: 'https://www.flylax.com',
    phone: '+1-310-646-5252',
    email: 'info@laxairport.com',
    airportFacilities: {
      code: 'LAX',
      terminals: [
        { code: '1', name: 'Terminal 1', gates: [{ number: 'A1', location: 'North', services: ['Check-in'] }], facilities: ['Wi-Fi'], airlines: ['Southwest'] },
        { code: '2', name: 'Terminal 2', gates: [{ number: 'B1', location: 'South', services: ['Security'] }], facilities: ['Shops'], airlines: ['Delta'] },
        { code: '3', name: 'Terminal 3', gates: [{ number: 'C1', location: 'East', services: ['Boarding'] }], facilities: ['Dining'], airlines: ['American'] },
        { code: '4', name: 'Terminal 4', gates: [{ number: 'D1', location: 'West', services: ['Lounge'] }], facilities: ['Restrooms'], airlines: ['United'] },
        { code: '5', name: 'Terminal 5', gates: [{ number: 'E1', location: 'North', services: ['Check-in'] }], facilities: ['Charging'], airlines: ['Alaska'] },
        { code: '6', name: 'Terminal 6', gates: [{ number: 'F1', location: 'South', services: ['Security'] }], facilities: ['ATM'], airlines: ['JetBlue'] },
        { code: '7', name: 'Terminal 7', gates: [{ number: 'G1', location: 'East', services: ['Boarding'] }], facilities: ['Shops'], airlines: ['Qantas'] },
        { code: '8', name: 'Terminal 8', gates: [{ number: 'H1', location: 'West', services: ['Lounge'] }], facilities: ['Dining'], airlines: ['Virgin'] },
      ],
      runways: [
        { number: '6L/24R', length: 3000, width: 60, surface: 'Concrete', lighted: true },
      ],
      services: [
        { type: 'Information', name: 'Info Desk', location: 'Terminal 1', hours: '24/7', description: 'General inquiries' },
      ],
      lounges: [
        { name: 'United Club', airline: 'United', location: 'Terminal 7', access: ['Priority'], amenities: ['Wi-Fi'], hours: '6 AM - 10 PM' },
      ],
      shopping: [
        { name: 'Duty Free', type: 'Retail', location: 'Terminal 2', hours: '9 AM - 9 PM', description: 'Tax-free shopping' },
      ],
      dining: [
        { name: 'Panda Express', cuisine: 'Chinese', location: 'Terminal 3', hours: '6 AM - 8 PM', priceRange: '$$', rating: 4.0 },
      ],
    },
  },
  {
    id: 3, // Converted from 'ap-003'
    code: 'LHR',
    name: 'Heathrow Airport',
    city: 'London',
    country: 'United Kingdom',
    countryCode: 'GB',
    region: 'Europe',
    timezone: 'Europe/London',
    latitude: 51.470022,
    longitude: -0.454295,
    elevation: 25,
    website: 'https://www.heathrow.com',
    phone: '+44-844-335-1801',
    email: 'info@heathrow.com',
    airportFacilities: {
      code: 'LHR',
      terminals: [
        { code: '2', name: 'Terminal 2', gates: [{ number: 'A1', location: 'North', services: ['Check-in'] }], facilities: ['Wi-Fi'], airlines: ['British Airways'] },
        { code: '3', name: 'Terminal 3', gates: [{ number: 'B1', location: 'South', services: ['Security'] }], facilities: ['Shops'], airlines: ['Virgin Atlantic'] },
        { code: '4', name: 'Terminal 4', gates: [{ number: 'C1', location: 'East', services: ['Boarding'] }], facilities: ['Dining'], airlines: ['Emirates'] },
        { code: '5', name: 'Terminal 5', gates: [{ number: 'D1', location: 'West', services: ['Lounge'] }], facilities: ['Restrooms'], airlines: ['Qantas'] },
      ],
      runways: [
        { number: '9L/27R', length: 3200, width: 60, surface: 'Asphalt', lighted: true },
      ],
      services: [
        { type: 'Information', name: 'Info Desk', location: 'Terminal 2', hours: '24/7', description: 'General inquiries' },
      ],
      lounges: [
        { name: 'British Airways Lounge', airline: 'British Airways', location: 'Terminal 5', access: ['Priority'], amenities: ['Wi-Fi'], hours: '6 AM - 10 PM' },
      ],
      shopping: [
        { name: 'Harrods', type: 'Retail', location: 'Terminal 3', hours: '9 AM - 9 PM', description: 'Luxury shopping' },
      ],
      dining: [
        { name: 'Gordon Ramsay Plane Food', cuisine: 'British', location: 'Terminal 5', hours: '6 AM - 8 PM', priceRange: '$$$$', rating: 4.8 },
      ],
    },
  },
  // Add similar entries for id 4-10 with appropriate defaults...
  {
    id: 4, // Converted from 'ap-004'
    code: 'DXB',
    name: 'Dubai International Airport',
    city: 'Dubai',
    country: 'United Arab Emirates',
    countryCode: 'AE',
    region: 'Middle East',
    timezone: 'Asia/Dubai',
    latitude: 25.253174,
    longitude: 55.365673,
    elevation: 19,
    website: 'https://www.dubaiairports.ae',
    phone: '+971-4-224-5555',
    email: 'info@dubaiairport.com',
    airportFacilities: {
      code: 'DXB',
      terminals: [
        { code: '1', name: 'Terminal 1', gates: [{ number: 'A1', location: 'North', services: ['Check-in'] }], facilities: ['Wi-Fi'], airlines: ['Emirates'] },
        { code: '2', name: 'Terminal 2', gates: [{ number: 'B1', location: 'South', services: ['Security'] }], facilities: ['Shops'], airlines: ['Flydubai'] },
        { code: '3', name: 'Terminal 3', gates: [{ number: 'C1', location: 'East', services: ['Boarding'] }], facilities: ['Dining'], airlines: ['Qatar Airways'] },
      ],
      runways: [
        { number: '12L/30R', length: 4000, width: 60, surface: 'Asphalt', lighted: true },
      ],
      services: [
        { type: 'Information', name: 'Info Desk', location: 'Terminal 1', hours: '24/7', description: 'General inquiries' },
      ],
      lounges: [
        { name: 'Emirates Lounge', airline: 'Emirates', location: 'Terminal 3', access: ['Priority'], amenities: ['Wi-Fi'], hours: '6 AM - 10 PM' },
      ],
      shopping: [
        { name: 'Duty Free', type: 'Retail', location: 'Terminal 1', hours: '9 AM - 9 PM', description: 'Tax-free shopping' },
      ],
      dining: [
        { name: 'Café Nero', cuisine: 'Coffee', location: 'Terminal 2', hours: '6 AM - 8 PM', priceRange: '$$', rating: 4.2 },
      ],
    },
  },
  {
    id: 5, // Converted from 'ap-005'
    code: 'SIN',
    name: 'Singapore Changi Airport',
    city: 'Singapore',
    country: 'Singapore',
    countryCode: 'SG',
    region: 'Asia',
    timezone: 'Asia/Singapore',
    latitude: 1.36442,
    longitude: 103.991531,
    elevation: 17,
    website: 'https://www.changiairport.com',
    phone: '+65-6595-6868',
    email: 'info@changiairport.com',
    airportFacilities: {
      code: 'SIN',
      terminals: [
        { code: '1', name: 'Terminal 1', gates: [{ number: 'A1', location: 'North', services: ['Check-in'] }], facilities: ['Wi-Fi'], airlines: ['Singapore Airlines'] },
        { code: '2', name: 'Terminal 2', gates: [{ number: 'B1', location: 'South', services: ['Security'] }], facilities: ['Shops'], airlines: ['Scoot'] },
        { code: '3', name: 'Terminal 3', gates: [{ number: 'C1', location: 'East', services: ['Boarding'] }], facilities: ['Dining'], airlines: ['Qantas'] },
        { code: '4', name: 'Terminal 4', gates: [{ number: 'D1', location: 'West', services: ['Lounge'] }], facilities: ['Restrooms'], airlines: ['Jetstar'] },
      ],
      runways: [
        { number: '02L/20R', length: 4000, width: 60, surface: 'Asphalt', lighted: true },
      ],
      services: [
        { type: 'Information', name: 'Info Desk', location: 'Terminal 1', hours: '24/7', description: 'General inquiries' },
      ],
      lounges: [
        { name: 'The Haven', airline: 'Singapore Airlines', location: 'Terminal 3', access: ['Priority'], amenities: ['Wi-Fi'], hours: '6 AM - 10 PM' },
      ],
      shopping: [
        { name: 'DFS', type: 'Retail', location: 'Terminal 2', hours: '9 AM - 9 PM', description: 'Duty-free shopping' },
      ],
      dining: [
        { name: 'Din Tai Fung', cuisine: 'Chinese', location: 'Terminal 3', hours: '6 AM - 8 PM', priceRange: '$$$', rating: 4.7 },
      ],
    },
  },
  {
    id: 6, // Converted from 'ap-006'
    code: 'CDG',
    name: 'Charles de Gaulle Airport',
    city: 'Paris',
    country: 'France',
    countryCode: 'FR',
    region: 'Europe',
    timezone: 'Europe/Paris',
    latitude: 49.0097,
    longitude: 2.5479,
    elevation: 119,
    website: 'https://www.parisaeroport.fr',
    phone: '+33-1-7039-4000',
    email: 'info@parisairport.com',
    airportFacilities: {
      code: 'CDG',
      terminals: [
        { code: '1', name: 'Terminal 1', gates: [{ number: 'A1', location: 'North', services: ['Check-in'] }], facilities: ['Wi-Fi'], airlines: ['Air France'] },
        { code: '2A', name: 'Terminal 2A', gates: [{ number: 'B1', location: 'South', services: ['Security'] }], facilities: ['Shops'], airlines: ['KLM'] },
        { code: '2B', name: 'Terminal 2B', gates: [{ number: 'C1', location: 'East', services: ['Boarding'] }], facilities: ['Dining'], airlines: ['Delta'] },
        { code: '2C', name: 'Terminal 2C', gates: [{ number: 'D1', location: 'West', services: ['Lounge'] }], facilities: ['Restrooms'], airlines: ['United'] },
        { code: '2D', name: 'Terminal 2D', gates: [{ number: 'E1', location: 'North', services: ['Check-in'] }], facilities: ['Charging'], airlines: ['Lufthansa'] },
        { code: '2E', name: 'Terminal 2E', gates: [{ number: 'F1', location: 'South', services: ['Security'] }], facilities: ['ATM'], airlines: ['British Airways'] },
        { code: '2F', name: 'Terminal 2F', gates: [{ number: 'G1', location: 'East', services: ['Boarding'] }], facilities: ['Shops'], airlines: ['Qantas'] },
        { code: '3', name: 'Terminal 3', gates: [{ number: 'H1', location: 'West', services: ['Lounge'] }], facilities: ['Dining'], airlines: ['EasyJet'] },
      ],
      runways: [
        { number: '08L/26R', length: 3600, width: 60, surface: 'Asphalt', lighted: true },
      ],
      services: [
        { type: 'Information', name: 'Info Desk', location: 'Terminal 1', hours: '24/7', description: 'General inquiries' },
      ],
      lounges: [
        { name: 'Air France Lounge', airline: 'Air France', location: 'Terminal 2E', access: ['Priority'], amenities: ['Wi-Fi'], hours: '6 AM - 10 PM' },
      ],
      shopping: [
        { name: 'Hermès', type: 'Retail', location: 'Terminal 2E', hours: '9 AM - 9 PM', description: 'Luxury shopping' },
      ],
      dining: [
        { name: 'Paul', cuisine: 'French', location: 'Terminal 2F', hours: '6 AM - 8 PM', priceRange: '$$', rating: 4.3 },
      ],
    },
  },
  {
    id: 7, // Converted from 'ap-007'
    code: 'SYD',
    name: 'Sydney Kingsford Smith Airport',
    city: 'Sydney',
    country: 'Australia',
    countryCode: 'AU',
    region: 'Oceania',
    timezone: 'Australia/Sydney',
    latitude: -33.939922,
    longitude: 151.175276,
    elevation: 6,
    website: 'https://www.sydneyairport.com.au',
    phone: '+61-2-9667-9111',
    email: 'info@sydneyairport.com',
    airportFacilities: {
      code: 'SYD',
      terminals: [
        { code: '1', name: 'Terminal 1', gates: [{ number: 'A1', location: 'North', services: ['Check-in'] }], facilities: ['Wi-Fi'], airlines: ['Qantas'] },
        { code: '2', name: 'Terminal 2', gates: [{ number: 'B1', location: 'South', services: ['Security'] }], facilities: ['Shops'], airlines: ['Virgin Australia'] },
        { code: '3', name: 'Terminal 3', gates: [{ number: 'C1', location: 'East', services: ['Boarding'] }], facilities: ['Dining'], airlines: ['Jetstar'] },
      ],
      runways: [
        { number: '16R/34L', length: 3900, width: 60, surface: 'Asphalt', lighted: true },
      ],
      services: [
        { type: 'Information', name: 'Info Desk', location: 'Terminal 1', hours: '24/7', description: 'General inquiries' },
      ],
      lounges: [
        { name: 'Qantas Lounge', airline: 'Qantas', location: 'Terminal 1', access: ['Priority'], amenities: ['Wi-Fi'], hours: '6 AM - 10 PM' },
      ],
      shopping: [
        { name: 'Sephora', type: 'Retail', location: 'Terminal 1', hours: '9 AM - 9 PM', description: 'Cosmetics shopping' },
      ],
      dining: [
        { name: 'Boost Juice', cuisine: 'Juice', location: 'Terminal 2', hours: '6 AM - 8 PM', priceRange: '$', rating: 4.1 },
      ],
    },
  },
  {
    id: 8, // Converted from 'ap-008'
    code: 'NRT',
    name: 'Narita International Airport',
    city: 'Tokyo',
    country: 'Japan',
    countryCode: 'JP',
    region: 'Asia',
    timezone: 'Asia/Tokyo',
    latitude: 35.764722,
    longitude: 140.386389,
    elevation: 41,
    website: 'https://www.narita-airport.jp',
    phone: '+81-476-34-8000',
    email: 'info@narita-airport.jp',
    airportFacilities: {
      code: 'NRT',
      terminals: [
        { code: '1', name: 'Terminal 1', gates: [{ number: 'A1', location: 'North', services: ['Check-in'] }], facilities: ['Wi-Fi'], airlines: ['ANA'] },
        { code: '2', name: 'Terminal 2', gates: [{ number: 'B1', location: 'South', services: ['Security'] }], facilities: ['Shops'], airlines: ['JAL'] },
        { code: '3', name: 'Terminal 3', gates: [{ number: 'C1', location: 'East', services: ['Boarding'] }], facilities: ['Dining'], airlines: ['Delta'] },
      ],
      runways: [
        { number: '16R/34L', length: 4000, width: 60, surface: 'Asphalt', lighted: true },
      ],
      services: [
        { type: 'Information', name: 'Info Desk', location: 'Terminal 1', hours: '24/7', description: 'General inquiries' },
      ],
      lounges: [
        { name: 'ANA Lounge', airline: 'ANA', location: 'Terminal 1', access: ['Priority'], amenities: ['Wi-Fi'], hours: '6 AM - 10 PM' },
      ],
      shopping: [
        { name: 'KitKat Chocolatory', type: 'Retail', location: 'Terminal 2', hours: '9 AM - 9 PM', description: 'Specialty snacks' },
      ],
      dining: [
        { name: 'Sushi Zanmai', cuisine: 'Japanese', location: 'Terminal 3', hours: '6 AM - 8 PM', priceRange: '$$$', rating: 4.6 },
      ],
    },
  },
  {
    id: 9, // Converted from 'ap-009'
    code: 'FRA',
    name: 'Frankfurt Airport',
    city: 'Frankfurt',
    country: 'Germany',
    countryCode: 'DE',
    region: 'Europe',
    timezone: 'Europe/Berlin',
    latitude: 50.0379,
    longitude: 8.5622,
    elevation: 112,
    website: 'https://www.frankfurt-airport.com',
    phone: '+49-69-690-0',
    email: 'info@fraport.com',
    airportFacilities: {
      code: 'FRA',
      terminals: [
        { code: '1', name: 'Terminal 1', gates: [{ number: 'A1', location: 'North', services: ['Check-in'] }], facilities: ['Wi-Fi'], airlines: ['Lufthansa'] },
        { code: '2', name: 'Terminal 2', gates: [{ number: 'B1', location: 'South', services: ['Security'] }], facilities: ['Shops'], airlines: ['Condor'] },
      ],
      runways: [
        { number: '07C/25C', length: 4000, width: 60, surface: 'Asphalt', lighted: true },
      ],
      services: [
        { type: 'Information', name: 'Info Desk', location: 'Terminal 1', hours: '24/7', description: 'General inquiries' },
      ],
      lounges: [
        { name: 'Lufthansa Senator Lounge', airline: 'Lufthansa', location: 'Terminal 1', access: ['Priority'], amenities: ['Wi-Fi'], hours: '6 AM - 10 PM' },
      ],
      shopping: [
        { name: 'Duty Free', type: 'Retail', location: 'Terminal 1', hours: '9 AM - 9 PM', description: 'Tax-free shopping' },
      ],
      dining: [
        { name: 'McDonald’s', cuisine: 'Fast Food', location: 'Terminal 2', hours: '6 AM - 8 PM', priceRange: '$', rating: 3.8 },
      ],
    },
  },
  {
    id: 10, // Converted from 'ap-010'
    code: 'AMS',
    name: 'Amsterdam Airport Schiphol',
    city: 'Amsterdam',
    country: 'Netherlands',
    countryCode: 'NL',
    region: 'Europe',
    timezone: 'Europe/Amsterdam',
    latitude: 52.3086,
    longitude: 4.7639,
    elevation: -3,
    website: 'https://www.schiphol.nl',
    phone: '+31-20-794-0800',
    email: 'info@schiphol.nl',
    airportFacilities: {
      code: 'AMS',
      terminals: [
        { code: '1', name: 'Terminal 1', gates: [{ number: 'A1', location: 'North', services: ['Check-in'] }], facilities: ['Wi-Fi'], airlines: ['KLM'] },
        { code: '2', name: 'Terminal 2', gates: [{ number: 'B1', location: 'South', services: ['Security'] }], facilities: ['Shops'], airlines: ['Delta'] },
        { code: '3', name: 'Terminal 3', gates: [{ number: 'C1', location: 'East', services: ['Boarding'] }], facilities: ['Dining'], airlines: ['Air France'] },
      ],
      runways: [
        { number: '09/27', length: 3800, width: 60, surface: 'Asphalt', lighted: true },
      ],
      services: [
        { type: 'Information', name: 'Info Desk', location: 'Terminal 1', hours: '24/7', description: 'General inquiries' },
      ],
      lounges: [
        { name: 'KLM Crown Lounge', airline: 'KLM', location: 'Terminal 1', access: ['Priority'], amenities: ['Wi-Fi'], hours: '6 AM - 10 PM' },
      ],
      shopping: [
        { name: 'Heineken Shop', type: 'Retail', location: 'Terminal 2', hours: '9 AM - 9 PM', description: 'Local beverages' },
      ],
      dining: [
        { name: 'La Place', cuisine: 'Dutch', location: 'Terminal 3', hours: '6 AM - 8 PM', priceRange: '$$', rating: 4.4 },
      ],
    },
  },
];