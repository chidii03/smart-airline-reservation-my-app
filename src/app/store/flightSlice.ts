import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { apiClient } from '@/app/lib/api';

// Define interfaces
interface FlightSearchParams {
  origin: string;
  destination: string;
  departureDate: string;
  returnDate?: string;
  passengers: number;
}

interface Flight {
  id: string;
  airline: string;
  price: number;
  stops: number;
  departureTime: string;
  arrivalTime: string;
  duration: number;
}

interface FlightState {
  flights: Flight[];
  filteredFlights: Flight[];
  currentFlight: Flight | null;
  loading: boolean;
  error: string | null;
  searchParams: FlightSearchParams | null;
  filters: {
    airlines: string[];
    priceRange: [number, number];
    stops: number[];
    times: string[];
  };
}

const initialState: FlightState = {
  flights: [],
  filteredFlights: [],
  currentFlight: null,
  loading: false,
  error: null,
  searchParams: null,
  filters: {
    airlines: [],
    priceRange: [0, 5000],
    stops: [],
    times: [],
  },
};

// Async thunks
export const searchFlights = createAsyncThunk<Flight[], FlightSearchParams>(
  'flights/search',
  async (params, { rejectWithValue }) => {
    try {
      const response = await apiClient.searchFlights(params);
      // Ensure response.data is typed as Flight[]
      return response.data as Flight[];
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Flight search failed');
    }
  }
);

export const fetchFlightById = createAsyncThunk<Flight, string>(
  'flights/fetchById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await apiClient.getFlightById(id);
      // Ensure response.data is typed as Flight
      return response.data as Flight;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch flight');
    }
  }
);

export const fetchSpecialDeals = createAsyncThunk<Flight[], void>(
  'flights/specialDeals',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.getSpecialDeals();
      // Ensure response.data is typed as Flight[]
      return response.data as Flight[];
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch special deals');
    }
  }
);

const flightSlice = createSlice({
  name: 'flights',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setFilters: (state, action: PayloadAction<Partial<FlightState['filters']>>) => {
      state.filters = { ...state.filters, ...action.payload };
      // Apply filters
      state.filteredFlights = state.flights.filter((flight) => {
        // Airline filter
        if (state.filters.airlines.length > 0 && !state.filters.airlines.includes(flight.airline)) {
          return false;
        }

        // Price filter
        if (flight.price < state.filters.priceRange[0] || flight.price > state.filters.priceRange[1]) {
          return false;
        }

        // Stops filter
        if (state.filters.stops.length > 0 && !state.filters.stops.includes(flight.stops)) {
          return false;
        }

        // Time filter
        if (state.filters.times.length > 0) {
          const departureHour = new Date(flight.departureTime).getHours();
          let timeCategory = '';
          
          if (departureHour >= 6 && departureHour < 12) timeCategory = 'morning';
          else if (departureHour >= 12 && departureHour < 18) timeCategory = 'afternoon';
          else if (departureHour >= 18 && departureHour < 24) timeCategory = 'evening';
          else timeCategory = 'night';

          if (!state.filters.times.includes(timeCategory)) {
            return false;
          }
        }

        return true;
      });
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
      state.filteredFlights = state.flights;
    },
    sortFlights: (state, action: PayloadAction<{ key: string; direction: 'asc' | 'desc' }>) => {
      const { key, direction } = action.payload;
      const flightsToSort = [...state.filteredFlights];

      flightsToSort.sort((a, b) => {
        let aValue: number, bValue: number;

        switch (key) {
          case 'price':
            aValue = a.price;
            bValue = b.price;
            break;
          case 'duration':
            aValue = a.duration;
            bValue = b.duration;
            break;
          case 'departure':
            aValue = new Date(a.departureTime).getTime();
            bValue = new Date(b.departureTime).getTime();
            break;
          case 'arrival':
            aValue = new Date(a.arrivalTime).getTime();
            bValue = new Date(b.arrivalTime).getTime();
            break;
          default:
            return 0;
        }

        if (direction === 'asc') {
          return aValue > bValue ? 1 : -1;
        } else {
          return aValue < bValue ? 1 : -1;
        }
      });

      state.filteredFlights = flightsToSort;
    },
  },
  extraReducers: (builder) => {
    builder
      // Search flights
      .addCase(searchFlights.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchFlights.fulfilled, (state, action) => {
        state.loading = false;
        state.flights = action.payload;
        state.filteredFlights = action.payload;
        state.error = null;
      })
      .addCase(searchFlights.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.flights = [];
        state.filteredFlights = [];
      })
      // Fetch flight by ID
      .addCase(fetchFlightById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFlightById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentFlight = action.payload;
        state.error = null;
      })
      .addCase(fetchFlightById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.currentFlight = null;
      })
      // Special deals
      .addCase(fetchSpecialDeals.fulfilled, (state, action) => {
        state.flights = action.payload;
        state.filteredFlights = action.payload;
      });
  },
});

export const { clearError, setFilters, clearFilters, sortFlights } = flightSlice.actions;
export default flightSlice;
