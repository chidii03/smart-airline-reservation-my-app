import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const bookingId = searchParams.get('bookingId')

    if (bookingId) {
      // Get specific booking
      const response = await fetch(`${process.env.BACKEND_URL}/api/bookings/${bookingId}`, {
        headers: {
          'Authorization': request.headers.get('Authorization') || '',
        },
      })

      if (!response.ok) {
        return NextResponse.json(
          { error: 'Booking not found' },
          { status: 404 }
        )
      }

      const booking = await response.json()
      return NextResponse.json(booking)
    }

    if (userId) {
      // Get user bookings
      const response = await fetch(`${process.env.BACKEND_URL}/api/bookings/user/${userId}`, {
        headers: {
          'Authorization': request.headers.get('Authorization') || '',
        },
      })

      if (!response.ok) {
        return NextResponse.json(
          { error: 'Failed to fetch bookings' },
          { status: response.status }
        )
      }

      const bookings = await response.json()
      return NextResponse.json(bookings)
    }

    return NextResponse.json(
      { error: 'User ID or Booking ID required' },
      { status: 400 }
    )
  } catch  {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const bookingData = await request.json()

    const response = await fetch(`${process.env.BACKEND_URL}/api/bookings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': request.headers.get('Authorization') || '',
      },
      body: JSON.stringify(bookingData),
    })

    if (!response.ok) {
      const error = await response.text()
      return NextResponse.json(
        { error: error || 'Failed to create booking' },
        { status: 400 }
      )
    }

    const booking = await response.json()
    return NextResponse.json(booking)
  } catch {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const bookingId = searchParams.get('id')
    const bookingData = await request.json()

    if (!bookingId) {
      return NextResponse.json(
        { error: 'Booking ID required' },
        { status: 400 }
      )
    }

    const response = await fetch(`${process.env.BACKEND_URL}/api/bookings/${bookingId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': request.headers.get('Authorization') || '',
      },
      body: JSON.stringify(bookingData),
    })

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to update booking' },
        { status: 400 }
      )
    }

    const booking = await response.json()
    return NextResponse.json(booking)
  } catch {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const bookingId = searchParams.get('id')

    if (!bookingId) {
      return NextResponse.json(
        { error: 'Booking ID required' },
        { status: 400 }
      )
    }

    const response = await fetch(`${process.env.BACKEND_URL}/api/bookings/${bookingId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': request.headers.get('Authorization') || '',
      },
    })

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to delete booking' },
        { status: 400 }
      )
    }

    return NextResponse.json({ message: 'Booking deleted successfully' })
  } catch {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}