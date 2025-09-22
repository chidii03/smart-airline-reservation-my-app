"use client"

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/app/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card'
import { Input } from '@/app/components/ui/input'
import { Timer, Mail, ArrowLeft, RefreshCw } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface OTPVerificationProps {
  email: string
  onVerify: (otp: string) => Promise<void>
  onResend: () => Promise<void>
}

export default function OTPVerification({ email, onVerify, onResend }: OTPVerificationProps) {
  const router = useRouter()
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [timeLeft, setTimeLeft] = useState(60)
  const [isLoading, setIsLoading] = useState(false)
  const [isResending, setIsResending] = useState(false)
  const [error, setError] = useState('')
  const inputsRef = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    // Focus first input on mount
    if (inputsRef.current[0]) {
      inputsRef.current[0]?.focus()
    }

    // Start countdown timer
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [timeLeft])

  const focusInput = (index: number) => {
    if (inputsRef.current[index]) {
      inputsRef.current[index]?.focus()
    }
  }

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)
    setError('')

    // Auto-focus next input
    if (value && index < 5) {
      focusInput(index + 1)
    }

    // If all digits are filled, verify
    if (newOtp.every(digit => digit) && newOtp.join('').length === 6) {
      handleVerify(newOtp.join(''))
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      // Move to previous input on backspace
      focusInput(index - 1)
    } else if (e.key === 'ArrowLeft' && index > 0) {
      // Move left with arrow key
      e.preventDefault()
      focusInput(index - 1)
    } else if (e.key === 'ArrowRight' && index < 5) {
      // Move right with arrow key
      e.preventDefault()
      focusInput(index + 1)
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pasteData = e.clipboardData.getData('text').slice(0, 6)
    if (/^\d+$/.test(pasteData)) {
      const newOtp = pasteData.split('')
      setOtp([...newOtp, ...Array(6 - newOtp.length).fill('')])
      if (newOtp.length === 6) {
        handleVerify(pasteData)
      } else if (newOtp.length > 0) {
        focusInput(newOtp.length)
      }
    }
  }

  const handleVerify = async (code: string) => {
    setIsLoading(true)
    setError('')
    try {
      await onVerify(code)
    } catch (err: unknown) { // Change to 'unknown' to fix the TypeScript error
      const message = err instanceof Error ? err.message : 'Invalid verification code. Please try again.'
      setError(message)
      // Clear OTP on error
      setOtp(['', '', '', '', '', ''])
      focusInput(0)
    } finally {
      setIsLoading(false)
    }
  }

  const handleResend = async () => {
    setIsResending(true)
    setError('')
    try {
      await onResend()
      setTimeLeft(60) // Reset timer
    } catch (err: unknown) { // Change to 'unknown' to fix the TypeScript error
      const message = err instanceof Error ? err.message : 'Failed to resend code. Please try again.'
      setError(message)
    } finally {
      setIsResending(false)
    }
  }

  const maskEmail = (email: string) => {
    const [name, domain] = email.split('@')
    const maskedName = name.length > 2
      ? name[0] + '*'.repeat(name.length - 2) + name[name.length - 1]
      : name
    return `${maskedName}@${domain}`
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <div className="flex items-center gap-2 mb-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()} className="h-8 w-8">
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <CardTitle className="text-xl">Verify Your Email</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <Mail className="w-8 h-8 text-primary" />
            </div>
          </div>
          <p className="text-muted-foreground mb-2">
            We have sent a 6-digit verification code to
          </p>
          <p className="font-semibold text-lg">{maskEmail(email)}</p>
          <p className="text-sm text-muted-foreground mt-2">
            Check your inbox and enter the code below
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex justify-center gap-2">
            {otp.map((digit, index) => (
              <Input
                key={index}
                ref={(el) => {
                  inputsRef.current[index] = el
                }}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={index === 0 ? handlePaste : undefined}
                className="w-12 h-12 text-center text-lg font-semibold [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                disabled={isLoading}
                aria-label={`Digit ${index + 1} of verification code`}
              />
            ))}
          </div>
          
          {error && (
            <p className="text-sm text-destructive text-center">{error}</p>
          )}
        </div>

        <Button 
          onClick={() => handleVerify(otp.join(''))}
          className="w-full"
          disabled={isLoading || otp.some(digit => !digit)}
          size="lg"
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
              Verifying...
            </div>
          ) : (
            'Verify Code'
          )}
        </Button>

        <div className="text-center space-y-3">
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Timer className="w-4 h-4" />
            <span>Code expires in {timeLeft} seconds</span>
          </div>
          
          <Button
            variant="link"
            onClick={handleResend}
            disabled={timeLeft > 0 || isResending}
            className="h-auto p-0 text-sm"
          >
            {isResending ? (
              <div className="flex items-center gap-2">
                <RefreshCw className="w-4 h-4 animate-spin" />
                Sending...
              </div>
            ) : (
              'Resend verification code'
            )}
          </Button>
        </div>

        <div className="text-xs text-muted-foreground text-center">
          <p>Did not receive the email? Check your spam folder or</p>
          <p>ensure you entered the correct email address.</p>
        </div>
      </CardContent>
    </Card>
  )
}