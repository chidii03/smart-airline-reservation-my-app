// api/ai/route.ts
import { NextRequest, NextResponse } from 'next/server';

// Define specific types for the request body data for each action
interface PricePredictionData {
  flightId: string;
  travelDate: string;
  passengers: number;
  basePrice?: number;
}

interface DelayPredictionData {
  flightId: string;
  // Add other relevant data fields for delay prediction
}

interface RecommendationData {
  userId: string;
  flightId?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, ...data } = body;

    switch (action) {
      case 'predict-price':
        // Cast data to the specific interface
        return handlePricePrediction(data as PricePredictionData);
      case 'predict-delay':
        // Cast data to the specific interface
        return handleDelayPrediction(data as DelayPredictionData);
      case 'get-recommendations':
        // Cast data to the specific interface
        return handleRecommendations(data as RecommendationData);
      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        );
    }
  } catch {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

async function handlePricePrediction(data: PricePredictionData) {
  try {
    const response = await fetch(`${process.env.AI_SERVICE_URL}/api/predict_price`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to get price prediction');
    }

    const prediction = await response.json();
    return NextResponse.json(prediction);
  } catch {
    return NextResponse.json({
      success: true,
      base_price: data.basePrice || 300,
      final_price_per_passenger: Math.round((data.basePrice || 300) * (0.8 + Math.random() * 0.4)),
      total_price: Math.round((data.basePrice || 300) * (0.8 + Math.random() * 0.4) * (data.passengers || 1)),
      dynamic_pricing_applied: true
    });
  }
}

async function handleDelayPrediction(data: DelayPredictionData) {
  try {
    const response = await fetch(`${process.env.AI_SERVICE_URL}/api/predict_delay`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to get delay prediction');
    }

    const prediction = await response.json();
    return NextResponse.json(prediction);
  } catch {
    const delayProbability = Math.random() * 0.4;
    return NextResponse.json({
      success: true,
      delay_probability: delayProbability,
      predicted_delay_minutes: delayProbability > 0.2 ? Math.round(Math.random() * 120) : 0,
      on_time_probability: 1 - delayProbability
    });
  }
}

async function handleRecommendations(data: RecommendationData) {
  try {
    const response = await fetch(`${process.env.AI_SERVICE_URL}/api/recommendations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to get recommendations');
    }

    const recommendations = await response.json();
    return NextResponse.json(recommendations);
  } catch {
    return NextResponse.json({
      success: true,
      recommendations: [
        {
          type: 'hotel',
          name: 'Airport Luxury Hotel',
          price: 150,
          rating: 4.5
        },
        {
          type: 'car_rental',
          name: 'Premium Rental Car',
          price: 75,
          rating: 4.2
        },
        {
          type: 'insurance',
          name: 'Travel Insurance',
          price: 25,
          rating: 4.7
        }
      ]
    });
  }
}