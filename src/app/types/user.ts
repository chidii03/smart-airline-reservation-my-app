export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth?: string;
  gender?: 'male' | 'female' | 'other';
  phoneNumber?: string;
  nationality?: string;
  passportNumber?: string;
  passportExpiry?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
  };
  preferences?: {
    seat: 'window' | 'aisle' | 'middle';
    meal: 'vegetarian' | 'non-vegetarian' | 'vegan' | 'gluten-free';
    notifications: {
      email: boolean;
      sms: boolean;
      push: boolean;
    };
    language: string;
    currency: string;
  };
  loyalty?: {
    program: string;
    number: string;
    points: number;
    tier: 'basic' | 'silver' | 'gold' | 'platinum';
  };
  paymentMethods?: PaymentMethod[];
  emergencyContact?: {
    name: string;
    relationship: string;
    phone: string;
    email: string;
  };
  role: 'user' | 'admin' | 'agent';
  status: 'active' | 'inactive' | 'suspended';
  createdAt: string;
  updatedAt: string;
  lastLogin?: string;
  avatar?: string;
  emailVerified: boolean;
  phoneVerified: boolean;
}

export interface LoginData {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}

export interface UpdateProfileData {
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  gender?: string;
  phoneNumber?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
  };
  preferences?: {
    seat?: string;
    meal?: string;
    notifications?: {
      email: boolean;
      sms: boolean;
      push: boolean;
    };
  };
}

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface PaymentMethod {
  id: string;
  type: 'credit-card' | 'debit-card' | 'paypal';
  last4?: string;
  expiryMonth?: number;
  expiryYear?: number;
  brand?: string;
  isDefault: boolean;
  paypalEmail?: string;
}

export interface LoyaltyTier {
  name: string;
  level: number;
  pointsRequired: number;
  benefits: string[];
}

export interface UserStats {
  totalBookings: number;
  completedBookings: number;
  cancelledBookings: number;
  totalSpent: number;
  favoriteDestination: string;
  averageBookingValue: number;
  loyaltyPoints: number;
  tier: string;
}

export interface NotificationPreference {
  type: string;
  email: boolean;
  sms: boolean;
  push: boolean;
}

export interface Document {
  type: 'passport' | 'id-card' | 'visa';
  number: string;
  expiryDate: string;
  country: string;
  fileUrl?: string;
}

export type UserRole = 'user' | 'admin' | 'agent';
export type UserStatus = 'active' | 'inactive' | 'suspended';