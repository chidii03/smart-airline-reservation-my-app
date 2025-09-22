export interface Airport {
  id: number;
  code: string;
  name: string;
  city: string;
  country: string;
  countryCode: string;
  region: string;
  timezone: string;
  latitude: number;
  longitude: number;
  elevation: number;
  website: string;
  phone: string;
  email: string;
  airportFacilities: AirportFacilities;
}

export interface AirportFacilities {
  code: string;
  terminals: Terminal[];
  runways: Runway[];
  services: Service[];
  lounges: Lounge[];
  shopping: Shop[];
  dining: Restaurant[];
}

export interface Terminal {
  code: string;
  name: string;
  gates: Gate[];
  facilities: string[];
  airlines: string[];
}

export interface Gate {
  number: string;
  location: string;
  services: string[];
}

export interface Runway {
  number: string;
  length: number;
  width: number;
  surface: string;
  lighted: boolean;
}

export interface Service {
  type: string;
  name: string;
  location: string;
  hours: string;
  description: string;
}

export interface Lounge {
  name: string;
  airline: string;
  location: string;
  access: string[];
  amenities: string[];
  hours: string;
}

export interface Shop {
  name: string;
  type: string;
  location: string;
  hours: string;
  description: string;
}

export interface Restaurant {
  name: string;
  cuisine: string;
  location: string;
  hours: string;
  priceRange: string;
  rating: number;
}

export interface AirportConnection {
  from: string;
  to: string;
  distance: number;
  flightTime: number;
  commonAirlines: string[];
  dailyFlights: number;
}

export interface AirportStatistics {
  code: string;
  passengers: number;
  movements: number;
  cargo: number;
  ranking: number;
  busiestRoutes: string[];
  topAirlines: string[];
}

export interface AirportWeather {
  code: string;
  temperature: number;
  condition: string;
  wind: {
    speed: number;
    direction: string;
  };
  visibility: number;
  humidity: number;
  pressure: number;
  forecast: WeatherForecast[];
}

export interface WeatherForecast {
  time: string;
  temperature: number;
  condition: string;
  precipitation: number;
}

export interface AirportTransport {
  type: string;
  name: string;
  toCity: string;
  duration: number;
  cost: number;
  frequency: string;
}

export type AirportSize = 'small' | 'medium' | 'large' | 'hub';