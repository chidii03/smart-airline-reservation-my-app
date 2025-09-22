import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { apiClient, PricePredictionData } from '../lib/api';

interface PricePrediction {
  flightId: string;
  predictedPrice: number;
  confidence: number;
  trend: 'up' | 'down';
  factors: string[];
  timestamp: number;
}

interface DelayPrediction {
  flightId: string;
  probability: number;
  expectedDelay: number;
  status: 'on-time' | 'minor-delay' | 'significant-delay' | 'high-risk';
  reasons: string[];
  confidence: number;
  timestamp: number;
}

interface AIRecommendation {
  type: 'upgrade' | 'hotel' | 'activity' | 'service';
  title: string;
  description: string;
  price: number;
  relevance: number;
  features: string[];
}

interface AIState {
  pricePredictions: Record<string, PricePrediction>;
  delayPredictions: Record<string, DelayPrediction>;
  recommendations: AIRecommendation[];
  loading: {
    price: boolean;
    delay: boolean;
    recommendations: boolean;
  };
  error: string | null;
}

const initialState: AIState = {
  pricePredictions: {},
  delayPredictions: {},
  recommendations: [],
  loading: {
    price: false,
    delay: false,
    recommendations: false,
  },
  error: null,
};

// Types for API responses
type PricePredictionResponse = Omit<PricePrediction, 'flightId' | 'timestamp'>;
type DelayPredictionResponse = Omit<DelayPrediction, 'flightId' | 'timestamp'>;
type RecommendationsResponse = AIRecommendation[];

// Async thunks
export const predictPrice = createAsyncThunk<
  { flightId: string } & PricePredictionResponse,
  { flightId: string; data: PricePredictionData },
  { rejectValue: string }
>('ai/predictPrice', async ({ flightId, data }, { rejectWithValue }) => {
  try {
    const response = await apiClient.getPricePrediction(flightId, {
      flightId, // Include flightId in data
      travelDate: data.travelDate,
      bookingDate: data.bookingDate,
    });
    return {
      flightId,
      predictedPrice: response.data.predictedPrice,
      confidence: 0.9, // Placeholder, update if API provides
      trend: response.data.predictedPrice > 0 ? 'up' : 'down', // Placeholder logic
      factors: ['market trends', 'demand'], // Placeholder
    };
  } catch (error) {
    const err = error as Error;
    return rejectWithValue(err.message || 'Price prediction failed');
  }
});

export const predictDelay = createAsyncThunk<
  { flightId: string } & DelayPredictionResponse,
  string,
  { rejectValue: string }
>('ai/predictDelay', async (flightId, { rejectWithValue }) => {
  try {
    const response = await apiClient.getDelayPrediction(flightId);
    return {
      flightId,
      probability: response.data.delayProbability,
      expectedDelay: 0, // Placeholder, update if API provides
      status: response.data.delayProbability > 0.5 ? 'significant-delay' : 'on-time', // Placeholder logic
      reasons: ['weather', 'traffic'], // Placeholder
      confidence: 0.85, // Placeholder
    };
  } catch (error) {
    const err = error as Error;
    return rejectWithValue(err.message || 'Delay prediction failed');
  }
});

export const fetchRecommendations = createAsyncThunk<
  RecommendationsResponse,
  { userId: string; flightId: string },
  { rejectValue: string }
>('ai/fetchRecommendations', async ({ userId, flightId }, { rejectWithValue }) => {
  try {
    const response = await apiClient.getRecommendations(userId, flightId);
    // Map Flight[] to AIRecommendation[]
    return response.data.map((flight) => ({
      type: 'service' as const, // Placeholder, adjust based on logic
      title: `${flight.airline} Flight`, // Example mapping
      description: `Flight from ${flight.departureTime} with ${flight.stops} stops`,
      price: flight.price,
      relevance: 0.9, // Placeholder
      features: [`Duration: ${flight.duration} minutes`, `Airline: ${flight.airline}`],
    }));
  } catch (error) {
    const err = error as Error;
    return rejectWithValue(err.message || 'Failed to fetch recommendations');
  }
});

const aiSlice = createSlice({
  name: 'ai',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearPredictions: (state) => {
      state.pricePredictions = {};
      state.delayPredictions = {};
    },
    addRecommendation: (state, action: PayloadAction<AIRecommendation>) => {
      state.recommendations.push(action.payload);
    },
    removeRecommendation: (state, action: PayloadAction<number>) => {
      state.recommendations.splice(action.payload, 1);
    },
  },
  extraReducers: (builder) => {
    builder
      // Price prediction
      .addCase(predictPrice.pending, (state) => {
        state.loading.price = true;
        state.error = null;
      })
      .addCase(predictPrice.fulfilled, (state, action) => {
        state.loading.price = false;
        state.pricePredictions[action.payload.flightId] = {
          ...action.payload,
          timestamp: Date.now(),
        };
      })
      .addCase(predictPrice.rejected, (state, action) => {
        state.loading.price = false;
        state.error = action.payload || 'Unknown error';
      })

      // Delay prediction
      .addCase(predictDelay.pending, (state) => {
        state.loading.delay = true;
        state.error = null;
      })
      .addCase(predictDelay.fulfilled, (state, action) => {
        state.loading.delay = false;
        state.delayPredictions[action.payload.flightId] = {
          ...action.payload,
          timestamp: Date.now(),
        };
      })
      .addCase(predictDelay.rejected, (state, action) => {
        state.loading.delay = false;
        state.error = action.payload || 'Unknown error';
      })

      // Recommendations
      .addCase(fetchRecommendations.pending, (state) => {
        state.loading.recommendations = true;
        state.error = null;
      })
      .addCase(fetchRecommendations.fulfilled, (state, action) => {
        state.loading.recommendations = false;
        state.recommendations = action.payload;
      })
      .addCase(fetchRecommendations.rejected, (state, action) => {
        state.loading.recommendations = false;
        state.error = action.payload || 'Unknown error';
      });
  },
});

export const { clearError, clearPredictions, addRecommendation, removeRecommendation } = aiSlice.actions;

export default aiSlice.reducer;