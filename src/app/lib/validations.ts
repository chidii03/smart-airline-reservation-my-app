import { z, ZodError } from 'zod'
import { VALIDATION_PATTERNS } from './constants'

// Common validation schemas
export const emailSchema = z.string().email('Please enter a valid email address')
export const passwordSchema = z.string()
  .min(8, 'Password must be at least 8 characters')
  .regex(
    VALIDATION_PATTERNS.PASSWORD,
    'Password must contain uppercase, lowercase, number, and special character'
  )

export const nameSchema = z.string()
  .min(2, 'Name must be at least 2 characters')
  .regex(
    VALIDATION_PATTERNS.NAME,
    'Name can only contain letters, spaces, hyphens, and apostrophes'
  )

export const phoneSchema = z.string().regex(VALIDATION_PATTERNS.PHONE, 'Please enter a valid phone number')
export const passportSchema = z.string().regex(VALIDATION_PATTERNS.PASSPORT, 'Please enter a valid passport number')

// Flight search validation
export const flightSearchSchema = z.object({
  origin: z.string().min(3, 'Please select origin airport'),
  destination: z.string().min(3, 'Please select destination airport'),
  departureDate: z.string().min(1, 'Please select departure date'),
  returnDate: z.string().optional(),
  passengers: z.number().min(1).max(9),
  class: z.enum(['economy', 'premium', 'business', 'first'])
})

export const forgotPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
})

// Forgot Password Form Data Type
export type ForgotPasswordFormData = {
  email: string
}

// Login form data type
export type LoginFormData = {
  email: string
  password: string
}

// Passenger information validation
export const passengerSchema = z.object({
  firstName: nameSchema,
  lastName: nameSchema,
  email: emailSchema,
  phone: phoneSchema,
  dateOfBirth: z.string().min(1, 'Please enter date of birth'),
  gender: z.enum(['male', 'female', 'other']),
  nationality: z.string().min(1, 'Please select nationality'),
  passportNumber: passportSchema,
  passportExpiry: z.string().min(1, 'Please enter passport expiry date')
})

// Payment validation
export const paymentSchema = z.object({
  cardNumber: z.string().regex(VALIDATION_PATTERNS.CREDIT_CARD, 'Please enter a valid card number'),
  cardHolder: nameSchema,
  expiryMonth: z.string().length(2, 'Please select expiry month'),
  expiryYear: z.string().length(4, 'Please select expiry year'),
  cvv: z.string().regex(VALIDATION_PATTERNS.CVV, 'Please enter a valid CVV')
})

// User registration validation
export const registerSchema = z.object({
  firstName: nameSchema,
  lastName: nameSchema,
  email: emailSchema,
  phone: phoneSchema, // Added phone field
  password: passwordSchema,
  confirmPassword: z.string(),
  terms: z.boolean().refine(val => val, {
    message: 'You must accept the terms and conditions',
  }), // Added terms field
  newsletter: z.boolean().optional(), // Added optional newsletter field
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
})

// Exporting the RegisterFormData type
export type RegisterFormData = z.infer<typeof registerSchema>

// User login validation
export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Password is required')
})

// Booking validation
export const bookingSchema = z.object({
  flightId: z.string().uuid('Invalid flight selection'),
  passengers: z.array(passengerSchema).min(1, 'At least one passenger is required'),
  seats: z.array(z.string()).optional(),
  insurance: z.boolean().optional(),
  baggage: z.array(
    z.object({
      passengerIndex: z.number(),
      option: z.string()
    })
  ).optional()
})

// Utility validation functions
export const validateEmail = (email: string): boolean => VALIDATION_PATTERNS.EMAIL.test(email)
export const validatePhone = (phone: string): boolean => VALIDATION_PATTERNS.PHONE.test(phone)

export const validatePassword = (password: string): { isValid: boolean; errors: string[] } => {
  const errors: string[] = []

  if (password.length < 8) errors.push('Password must be at least 8 characters')
  if (!/[a-z]/.test(password)) errors.push('Password must contain at least one lowercase letter')
  if (!/[A-Z]/.test(password)) errors.push('Password must contain at least one uppercase letter')
  if (!/\d/.test(password)) errors.push('Password must contain at least one number')
  if (!/[@$!%*?&]/.test(password)) errors.push('Password must contain at least one special character (@$!%*?&)')

  return { isValid: errors.length === 0, errors }
}

export const validateCreditCard = (cardNumber: string): boolean => {
  let sum = 0
  let isEven = false
  const cleaned = cardNumber.replace(/\D/g, '')

  for (let i = cleaned.length - 1; i >= 0; i--) {
    let digit = parseInt(cleaned.charAt(i), 10)
    if (isEven) {
      digit *= 2
      if (digit > 9) digit -= 9
    }
    sum += digit
    isEven = !isEven
  }

  return sum % 10 === 0
}

export const validateExpiryDate = (month: string, year: string): boolean => {
  const now = new Date()
  const currentYear = now.getFullYear()
  const currentMonth = now.getMonth() + 1

  const expYear = parseInt(year, 10)
  const expMonth = parseInt(month, 10)

  if (expYear < currentYear) return false
  if (expYear === currentYear && expMonth < currentMonth) return false
  if (expMonth < 1 || expMonth > 12) return false

  return true
}

export const validatePassport = (passportNumber: string): boolean =>
  VALIDATION_PATTERNS.PASSPORT.test(passportNumber)

export const validateDateOfBirth = (dateString: string): { isValid: boolean; age?: number; error?: string } => {
  const birthDate = new Date(dateString)
  const today = new Date()
  let age = today.getFullYear() - birthDate.getFullYear()
  const monthDiff = today.getMonth() - birthDate.getMonth()
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) age--

  if (age < 0) return { isValid: false, error: 'Date of birth cannot be in the future' }
  if (age < 2) return { isValid: false, error: 'Passenger must be at least 2 years old' }
  if (age > 120) return { isValid: false, error: 'Please enter a valid date of birth' }

  return { isValid: true, age }
}

// Form validation helpers
export const createValidator = <T>(schema: z.ZodSchema<T>) => {
  return (data: unknown): { isValid: boolean; errors?: Record<string, string> } => {
    try {
      schema.parse(data)
      return { isValid: true }
    } catch (error) {
      if (error instanceof ZodError) {
        const errors: Record<string, string> = {}
        error.issues.forEach((issue) => {
          if (issue.path.length > 0) {
            errors[issue.path[0].toString()] = issue.message
          }
        })
        return { isValid: false, errors }
      }
      return { isValid: false, errors: { _form: 'Validation failed' } }
    }
  }
}

// Async validation for unique fields
export const validateUniqueEmail = async (email: string): Promise<boolean> => {
  await new Promise((resolve) => setTimeout(resolve, 500))
  const takenEmails = ['test@example.com', 'user@example.com']
  return !takenEmails.includes(email)
}

// Async flight availability check (now uses passengers)
export const validateFlightAvailability = async (flightId: string, passengers: number): Promise<boolean> => {
  await new Promise((resolve) => setTimeout(resolve, 300))

  const flightCapacity = 180 // example
  const bookedSeats = Math.floor(Math.random() * 160)

  return passengers <= flightCapacity - bookedSeats
}

// Named export for ESLint compliance
const validations = {
  emailSchema,
  passwordSchema,
  nameSchema,
  phoneSchema,
  passportSchema,
  flightSearchSchema,
  passengerSchema,
  paymentSchema,
  registerSchema,
  loginSchema,
  bookingSchema,
  validateEmail,
  validatePhone,
  validatePassword,
  validateCreditCard,
  validateExpiryDate,
  validatePassport,
  validateDateOfBirth,
  createValidator,
  validateUniqueEmail,
  validateFlightAvailability
}

export default validations