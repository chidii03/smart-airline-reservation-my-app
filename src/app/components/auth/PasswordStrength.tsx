"use client"

import { useEffect, useState } from 'react'
import { Check, X } from 'lucide-react'
import { cn } from '@/app/lib/utils'

interface PasswordStrengthProps {
  password: string
  className?: string
}

interface StrengthIndicator {
  label: string
  strength: number
  color: string
}

export default function PasswordStrength({ password, className }: PasswordStrengthProps) {
  const [strength, setStrength] = useState(0)
  const [checks, setChecks] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
  })

  useEffect(() => {
    const calculateStrength = () => {
      let newStrength = 0
      const newChecks = {
        length: password.length >= 8,
        uppercase: /[A-Z]/.test(password),
        lowercase: /[a-z]/.test(password),
        number: /[0-9]/.test(password),
        special: /[^A-Za-z0-9]/.test(password),
      }

      // Calculate strength score (0-100)
      if (newChecks.length) newStrength += 20
      if (newChecks.uppercase) newStrength += 20
      if (newChecks.lowercase) newStrength += 20
      if (newChecks.number) newStrength += 20
      if (newChecks.special) newStrength += 20

      setChecks(newChecks)
      setStrength(newStrength)
    }

    calculateStrength()
  }, [password])

  const getStrengthLabel = (): StrengthIndicator => {
    if (strength >= 80) return { label: 'Strong', strength: 4, color: 'bg-green-500' }
    if (strength >= 60) return { label: 'Good', strength: 3, color: 'bg-blue-500' }
    if (strength >= 40) return { label: 'Fair', strength: 2, color: 'bg-yellow-500' }
    if (strength >= 20) return { label: 'Weak', strength: 1, color: 'bg-orange-500' }
    return { label: 'Very Weak', strength: 0, color: 'bg-red-500' }
  }

  const strengthInfo = getStrengthLabel()

  const requirements = [
    { key: 'length', label: 'At least 8 characters' },
    { key: 'uppercase', label: 'One uppercase letter' },
    { key: 'lowercase', label: 'One lowercase letter' },
    { key: 'number', label: 'One number' },
    { key: 'special', label: 'One special character' },
  ]

  return (
    <div className={cn("space-y-3", className)}>
      {/* Strength meter */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">Password strength</span>
          <span className="text-sm text-muted-foreground">{strengthInfo.label}</span>
        </div>
        <div className="flex gap-1">
          {[1, 2, 3, 4].map((level) => (
            <div
              key={level}
              className={cn(
                "h-1 flex-1 rounded-full bg-muted",
                level <= strengthInfo.strength && strengthInfo.color
              )}
            />
          ))}
        </div>
      </div>

      {/* Requirements list */}
      <div className="space-y-2">
        {requirements.map((req) => (
          <div key={req.key} className="flex items-center gap-2">
            {checks[req.key as keyof typeof checks] ? (
              <Check className="w-4 h-4 text-green-500" />
            ) : (
              <X className="w-4 h-4 text-muted-foreground" />
            )}
            <span className={cn(
              "text-sm",
              checks[req.key as keyof typeof checks] ? "text-green-600" : "text-muted-foreground"
            )}>
              {req.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}