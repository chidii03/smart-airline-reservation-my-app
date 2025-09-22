import { Flight } from '@/app/types/flight';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

interface ApiResponse<T> {
  id: unknown;
  data: T;
  status: number;
  message?: string;
}

interface ApiError {
  message: string;
  status: number;
  errors?: Record<string, string[]>;
}

// Define interfaces for API payloads
interface BookingData {
  flightId: string;
  userId: string;
  passengers: number;
  seatSelection?: string[];
  bookingDate?: string;
}

interface PaymentData {
  bookingId: string;
  amount: number;
  paymentMethod: string;
  currency?: string;
}

interface ProfileData {
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
}

export interface PricePredictionData {
  flightId: string;
  travelDate?: string;
  bookingDate?: string;
}

class ApiClient {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  sendReceiptEmail(id: unknown, _contactEmail: unknown) {
    throw new Error('Method not implemented.');
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  processPayment(_arg0: { amount: unknown; email: string; cardNumber: string; expiryDate: string; cvv: string; cardholderName: string; }) {
    throw new Error('Method not implemented.');
  }
  getAllFlights() {
    throw new Error('Method not implemented.');
  }
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${API_BASE_URL}${endpoint}`;
    // Use Record<string, string> for headers to align with HeadersInit
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string> | undefined),
    };

    // Add auth token if available
    const token = localStorage.getItem('auth-token');
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw {
          message: data?.message || 'An error occurred',
          status: response.status,
          errors: data?.errors,
        } as ApiError;
      }

      return {
        id: data?.id ?? null,
        data,
        status: response.status,
        message: data?.message,
      };
    } catch (error) {
      if (error instanceof TypeError) {
        throw {
          message: 'Network error. Please check your connection.',
          status: 0,
        } as ApiError;
      }
      throw error;
    }
  }

  // Auth endpoints
  async login(credentials: { email: string; password: string }) {
    return this.request<{ token: string; userId: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async register(userData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) {
    return this.request<{ token: string; userId: string }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async logout() {
    return this.request<void>('/auth/logout', {
      method: 'POST',
    });
  }

  async getCurrentUser() {
    return this.request<{ id: string; email: string; firstName: string; lastName: string }>('/auth/me');
  }

  // Flight endpoints
  async searchFlights(params: {
    origin: string;
    destination: string;
    departureDate: string;
    returnDate?: string;
    passengers: number;
  }) {
    const queryParams = new URLSearchParams({
      origin: params.origin,
      destination: params.destination,
      departureDate: params.departureDate,
      passengers: params.passengers.toString(),
      ...(params.returnDate && { returnDate: params.returnDate }),
    });

    return this.request<Flight[]>(`/flights/search?${queryParams}`);
  }

  async getFlightById(id: string) {
    return this.request<Flight>(`/flights/${id}`);
  }

  async getSpecialDeals() {
    return this.request<Flight[]>('/flights/deals');
  }

  // Booking endpoints
  async createBooking(bookingData: BookingData) {
    return this.request<{
      reference: string; id: string; status: string; flightId: string; userId: string 
}>(
      '/bookings',
      {
        method: 'POST',
        body: JSON.stringify(bookingData),
      }
    );
  }

  async getBookings(userId: string) {
    return this.request<{ id: string; flightId: string; status: string }[]>(`/bookings/user/${userId}`);
  }

  async getBookingById(id: string) {
    return this.request<{
      passengers: never[];
      userId: string; id: string; flightId: string; status: string 
}>(`/bookings/${id}`);
  }

  async cancelBooking(id: string) {
    return this.request<void>(`/bookings/${id}/cancel`, {
      method: 'POST',
    });
  }

  // Payment endpoints
  async initiatePayment(paymentData: PaymentData) {
    return this.request<{ paymentId: string; redirectUrl: string; status: string }>(
      '/payments/initiate',
      {
        method: 'POST',
        body: JSON.stringify(paymentData),
      }
    );
  }

  async verifyPayment(reference: string) {
    return this.request<{ status: string; paymentId: string }>(`/payments/verify/${reference}`);
  }

  // User endpoints
  async updateProfile(userId: string, profileData: ProfileData) {
    return this.request<{ id: string; email: string; firstName: string; lastName: string }>(
      `/users/${userId}`,
      {
        method: 'PUT',
        body: JSON.stringify(profileData),
      }
    );
  }

  async getBookingHistory(userId: string) {
    return this.request<{ id: string; flightId: string; status: string }[]>(`/users/${userId}/bookings`);
  }

  // AI endpoints
  async getPricePrediction(flightId: string, data: PricePredictionData) {
    return this.request<{ predictedPrice: number }>(`/ai/pricing/predict/${flightId}`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getDelayPrediction(flightId: string) {
    return this.request<{ delayProbability: number }>(`/ai/delays/predict/${flightId}`);
  }

  async getRecommendations(userId: string, flightId: string) {
    return this.request<Flight[]>(`/ai/recommendations/${userId}/${flightId}`);
  }
}

export const apiClient = new ApiClient();

// Utility function for handling API errors
export function handleApiError(error: unknown): string {
  if (typeof error === 'object' && error !== null && 'message' in error) {
    return (error as { message: string }).message;
  }
  return 'An unexpected error occurred';
}

// Utility function for handling form errors
export function formatFormErrors(errors: Record<string, string[]>): string[] {
  return Object.entries(errors).flatMap(([field, messages]) =>
    messages.map((message) => `${field}: ${message}`)
  );
}