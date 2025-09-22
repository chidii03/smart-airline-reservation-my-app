import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        { error: 'Valid email address is required' },
        { status: 400 }
      )
    }

    // Here you would typically:
    // 1. Validate the email
    // 2. Check if already subscribed
    // 3. Add to your newsletter service (Mailchimp, ConvertKit, etc.)
    // 4. Send confirmation email

    // For now, we'll simulate a successful subscription
    await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call

    return NextResponse.json({
      success: true,
      message: 'Successfully subscribed to newsletter'
    })
  } catch  {
    return NextResponse.json(
      { error: 'Failed to subscribe to newsletter' },
      { status: 500 }
    )
  }
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}