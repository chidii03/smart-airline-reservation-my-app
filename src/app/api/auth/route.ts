import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password, action } = body

    // Handle different auth actions
    switch (action) {
      case 'login':
        return handleLogin(email, password)
      case 'register':
        return handleRegister(body)
      case 'forgot-password':
        return handleForgotPassword(email)
      case 'reset-password':
        return handleResetPassword(body)
      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        )
    }
  } catch {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

async function handleLogin(email: string, password: string) {
  // Validate credentials against your backend
  const response = await fetch(`${process.env.BACKEND_URL}/api/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })

  if (!response.ok) {
    return NextResponse.json(
      { error: 'Invalid credentials' },
      { status: 401 }
    )
  }

  const data = await response.json()
  return NextResponse.json(data)
}

async function handleRegister(userData: unknown) {
  const response = await fetch(`${process.env.BACKEND_URL}/api/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  })

  if (!response.ok) {
    const error = await response.text()
    return NextResponse.json(
      { error: error || 'Registration failed' },
      { status: 400 }
    )
  }

  const data = await response.json()
  return NextResponse.json(data)
}

async function handleForgotPassword(email: string) {
  const response = await fetch(`${process.env.BACKEND_URL}/api/auth/forgot-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  })

  if (!response.ok) {
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 400 }
    )
  }

  return NextResponse.json({ message: 'Reset instructions sent to your email' })
}

async function handleResetPassword(resetData: unknown) {
  const response = await fetch(`${process.env.BACKEND_URL}/api/auth/reset-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(resetData),
  })

  if (!response.ok) {
    return NextResponse.json(
      { error: 'Failed to reset password' },
      { status: 400 }
    )
  }

  return NextResponse.json({ message: 'Password reset successfully' })
}