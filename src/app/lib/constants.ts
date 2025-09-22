// Flight related constants
export const FLIGHT_CLASSES = {
  ECONOMY: 'economy',
  PREMIUM_ECONOMY: 'premium_economy',
  BUSINESS: 'business',
  FIRST: 'first'
} as const

export const FLIGHT_STATUS = {
  SCHEDULED: 'scheduled',
  ON_TIME: 'on_time',
  DELAYED: 'delayed',
  DEPARTED: 'departed',
  ARRIVED: 'arrived',
  CANCELLED: 'cancelled',
  DIVERTED: 'diverted'
} as const

export const BAGGAGE_ALLOWANCE = {
  [FLIGHT_CLASSES.ECONOMY]: {
    carryOn: 1,
    checked: 1,
    weight: 23 // kg
  },
  [FLIGHT_CLASSES.PREMIUM_ECONOMY]: {
    carryOn: 1,
    checked: 2,
    weight: 23
  },
  [FLIGHT_CLASSES.BUSINESS]: {
    carryOn: 2,
    checked: 2,
    weight: 32
  },
  [FLIGHT_CLASSES.FIRST]: {
    carryOn: 2,
    checked: 3,
    weight: 32
  }
} as const

// Booking related constants
export const BOOKING_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  CANCELLED: 'cancelled',
  COMPLETED: 'completed'
} as const

export const PASSENGER_TYPES = {
  ADULT: 'adult',
  CHILD: 'child',
  INFANT: 'infant'
} as const

export const PASSENGER_PRICE_MULTIPLIERS = {
  [PASSENGER_TYPES.ADULT]: 1,
  [PASSENGER_TYPES.CHILD]: 0.75,
  [PASSENGER_TYPES.INFANT]: 0.1
} as const

// Payment related constants
export const PAYMENT_METHODS = {
  CREDIT_CARD: 'credit_card',
  DEBIT_CARD: 'debit_card',
  PAYPAL: 'paypal',
  BANK_TRANSFER: 'bank_transfer'
} as const

export const PAYMENT_STATUS = {
  PENDING: 'pending',
  COMPLETED: 'completed',
  FAILED: 'failed',
  REFUNDED: 'refunded'
} as const

export const CURRENCIES = {
  USD: 'USD',
  EUR: 'EUR',
  GBP: 'GBP',
  JPY: 'JPY',
  CAD: 'CAD',
  AUD: 'AUD'
} as const

// Airport related constants
export const MAJOR_AIRPORTS = {
  // North America
  JFK: 'John F. Kennedy International Airport',
  LAX: 'Los Angeles International Airport',
  ORD: 'O\'Hare International Airport',
  DFW: 'Dallas/Fort Worth International Airport',
  DEN: 'Denver International Airport',
  SFO: 'San Francisco International Airport',
  SEA: 'Seattle-Tacoma International Airport',
  MIA: 'Miami International Airport',
  
  // Europe
  LHR: 'Heathrow Airport',
  CDG: 'Charles de Gaulle Airport',
  FRA: 'Frankfurt Airport',
  AMS: 'Amsterdam Airport Schiphol',
  IST: 'Istanbul Airport',
  MAD: 'Adolfo Suárez Madrid–Barajas Airport',
  FCO: 'Leonardo da Vinci–Fiumicino Airport',
  
  // Asia
  DXB: 'Dubai International Airport',
  SIN: 'Singapore Changi Airport',
  ICN: 'Incheon International Airport',
  HND: 'Haneda Airport',
  BKK: 'Suvarnabhumi Airport',
  PEK: 'Beijing Capital International Airport',
  PVG: 'Shanghai Pudong International Airport'
} as const

// Aircraft types
export const AIRCRAFT_TYPES = {
  BOEING_737: 'Boeing 737',
  BOEING_747: 'Boeing 747',
  BOEING_777: 'Boeing 777',
  BOEING_787: 'Boeing 787',
  AIRBUS_A320: 'Airbus A320',
  AIRBUS_A330: 'Airbus A330',
  AIRBUS_A350: 'Airbus A350',
  AIRBUS_A380: 'Airbus A380'
} as const

// Seat configuration
export const SEAT_CONFIGURATIONS = {
  [AIRCRAFT_TYPES.BOEING_737]: {
    economy: '3-3',
    business: '2-2'
  },
  [AIRCRAFT_TYPES.AIRBUS_A320]: {
    economy: '3-3',
    business: '2-2'
  },
  [AIRCRAFT_TYPES.BOEING_777]: {
    economy: '3-3-3',
    premium: '2-4-2',
    business: '2-2-2',
    first: '1-2-1'
  },
  [AIRCRAFT_TYPES.AIRBUS_A350]: {
    economy: '3-3-3',
    premium: '2-4-2',
    business: '1-2-1',
    first: '1-1-1'
  }
} as const

// Time constants
export const CHECKIN_TIMES = {
  OPEN_HOURS_BEFORE: 24,
  CLOSE_MINUTES_BEFORE: 45,
  BOARDING_MINUTES_BEFORE: 30
} as const

// Price constants
export const TAX_RATES = {
  US: 0.075,
  EU: 0.20,
  ASIA: 0.10,
  DEFAULT: 0.15
} as const

export const FEE_STRUCTURE = {
  BOOKING_FEE: 15,
  SERVICE_FEE: 10,
  CONVENIENCE_FEE: 5
} as const

// API constants
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    ME: '/auth/me'
  },
  FLIGHTS: {
    SEARCH: '/flights/search',
    BY_ID: '/flights/:id',
    DEALS: '/flights/deals',
    SCHEDULE: '/flights/schedule'
  },
  BOOKINGS: {
    CREATE: '/bookings',
    BY_ID: '/bookings/:id',
    USER: '/bookings/user/:userId',
    CANCEL: '/bookings/:id/cancel'
  },
  PAYMENTS: {
    INITIATE: '/payments/initiate',
    VERIFY: '/payments/verify/:reference',
    REFUND: '/payments/refund/:id'
  },
  USERS: {
    PROFILE: '/users/:id',
    BOOKINGS: '/users/:id/bookings',
    PREFERENCES: '/users/:id/preferences'
  },
  AI: {
    PRICING: '/ai/pricing',
    DELAYS: '/ai/delays',
    RECOMMENDATIONS: '/ai/recommendations'
  }
} as const

// Local storage keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth-token',
  USER_DATA: 'user-data',
  SEARCH_HISTORY: 'search-history',
  PREFERENCES: 'user-preferences',
  CART: 'booking-cart'
} as const

// Error messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  UNAUTHORIZED: 'Please log in to continue.',
  FORBIDDEN: 'You don\'t have permission to perform this action.',
  NOT_FOUND: 'The requested resource was not found.',
  SERVER_ERROR: 'Server error. Please try again later.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  TIMEOUT: 'Request timeout. Please try again.',
  UNKNOWN: 'An unexpected error occurred.'
} as const

// Success messages
export const SUCCESS_MESSAGES = {
  BOOKING_CONFIRMED: 'Your booking has been confirmed!',
  PAYMENT_SUCCESS: 'Payment completed successfully!',
  PROFILE_UPDATED: 'Profile updated successfully!',
  PASSWORD_CHANGED: 'Password changed successfully!',
  LOGOUT_SUCCESS: 'Logged out successfully!'
} as const

// Form validation patterns
export const VALIDATION_PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^\+?[\d\s\-\(\)]{10,}$/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  NAME: /^[a-zA-ZÀ-ÿ\s'-]{2,50}$/,
  PASSPORT: /^[A-Z0-9]{6,9}$/,
  CREDIT_CARD: /^\d{16}$/,
  CVV: /^\d{3,4}$/,
  ZIP_CODE: /^\d{5}(-\d{4})?$/
} as const

// Date formats
export const DATE_FORMATS = {
  DISPLAY: 'MMM dd, yyyy',
  API: 'yyyy-MM-dd',
  TIME: 'HH:mm',
  FULL: 'MMM dd, yyyy HH:mm'
} as const

// Theme constants
export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system'
} as const

export const DEFAULT_THEME = THEMES.LIGHT

// Breakpoints for responsive design
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536
} as const

// Feature flags
export const FEATURE_FLAGS = {
  AI_PREDICTIONS: true,
  SOCIAL_LOGIN: true,
  MULTI_CURRENCY: false,
  VOICE_SEARCH: false,
  AR_VIEW: false
} as const

export default {
  FLIGHT_CLASSES,
  FLIGHT_STATUS,
  BAGGAGE_ALLOWANCE,
  BOOKING_STATUS,
  PASSENGER_TYPES,
  PAYMENT_METHODS,
  MAJOR_AIRPORTS,
  AIRCRAFT_TYPES,
  API_ENDPOINTS,
  STORAGE_KEYS,
  ERROR_MESSAGES,
  VALIDATION_PATTERNS,
  THEMES,
  BREAKPOINTS
}