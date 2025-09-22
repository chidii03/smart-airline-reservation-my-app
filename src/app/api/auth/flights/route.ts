
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const origin = searchParams.get('origin');
    const destination = searchParams.get('destination');
    const departureDate = searchParams.get('departureDate');
    const returnDate = searchParams.get('returnDate');
    const passengers = searchParams.get('passengers');

    // Build query string for backend
    const queryParams = new URLSearchParams();
    if (origin) queryParams.append('origin', origin);
    if (destination) queryParams.append('destination', destination);
    if (departureDate) queryParams.append('departureDate', departureDate);
    if (returnDate) queryParams.append('returnDate', returnDate);
    if (passengers) queryParams.append('passengers', passengers);

    // Call your Spring Boot backend
    const backendResponse = await fetch(
      `${process.env.BACKEND_URL}/api/flights?${queryParams}`,
      {
        headers: {
          'Authorization': `Bearer ${getAuthToken(request)}`,
        },
      }
    );

    if (backendResponse.ok) {
      const flights = await backendResponse.json();
      return NextResponse.json(flights);
    } else {
      return NextResponse.json(
        { error: 'Failed to fetch flights' },
        { status: backendResponse.status }
      );
    }
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch flights' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // For creating new flights (admin functionality)
    const flightData = await request.json();
    const token = getAuthToken(request);

    const backendResponse = await fetch(`${process.env.BACKEND_URL}/api/flights`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(flightData),
    });

    if (backendResponse.ok) {
      const newFlight = await backendResponse.json();
      return NextResponse.json(newFlight, { status: 201 });
    } else {
      return NextResponse.json(
        { error: 'Failed to create flight' },
        { status: backendResponse.status }
      );
    }
  } catch {
    return NextResponse.json(
      { error: 'Failed to create flight' },
      { status: 500 }
    );
  }
}

function getAuthToken(request: NextRequest): string {
  return request.cookies.get('auth-token')?.value || '';
}