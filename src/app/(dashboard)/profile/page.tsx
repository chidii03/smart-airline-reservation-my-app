"use client"

import { useState, forwardRef, ReactNode, useEffect } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Save,
  Edit,
  Camera
} from 'lucide-react'

// --- Utility Functions (Local) ---
// This function is included directly to avoid external imports.
function cn(...classNames: unknown[]): string {
  const classes = [];
  for (const arg of classNames) {
    if (typeof arg === 'string' && arg.length > 0) {
      classes.push(arg);
    } else if (Array.isArray(arg)) {
      classes.push(...arg.filter(Boolean));
    } else if (typeof arg === 'object' && arg !== null) {
      Object.keys(arg).forEach(key => {
        if ((arg as Record<string, unknown>)[key]) {
          classes.push(key);
        }
      });
    }
  }
  return classes.join(' ');
}


// --- DUMMY DATA & COMPONENTS (Consolidated to fix errors) ---

// Corrected interface to match the zod schema's optional fields
interface ProfileFormData {
  firstName: string
  lastName: string
  email: string
  phone?: string
  dateOfBirth?: string
  address?: string
  city?: string
  country?: string
  postalCode?: string
}

const profileSchema = z.object({
  firstName: z.string().min(1, 'First Name is required'),
  lastName: z.string().min(1, 'Last Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional().or(z.literal('')),
  dateOfBirth: z.string().optional().or(z.literal('')),
  address: z.string().optional().or(z.literal('')),
  city: z.string().optional().or(z.literal('')),
  country: z.string().optional().or(z.literal('')),
  postalCode: z.string().optional().or(z.literal('')),
})

interface DummyUser {
  firstName: string
  lastName: string
  email: string
  phone?: string
  dateOfBirth?: string
  address?: string
  city?: string
  country?: string
  postalCode?: string
}

interface UseAuthReturn {
  user: DummyUser | null;
  updateProfile: (data: ProfileFormData) => Promise<void>;
}

function useAuth(): UseAuthReturn {
  const [user, setUser] = useState<DummyUser | null>({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '555-123-4567',
    dateOfBirth: '1990-05-20',
    address: '123 Main St',
    city: 'Anytown',
    country: 'USA',
    postalCode: '12345'
  });

  const updateProfile = async (data: ProfileFormData) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        console.log('Profile updated with data:', data);
        setUser({ ...user, ...data });
        resolve();
      }, 1000);
    });
  };

  return { user, updateProfile };
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant = 'default', size = 'default', ...props }, ref) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none'
  
  // FIX: Explicitly typing the class objects to fix the indexing error
  const sizeClasses: Record<'default' | 'sm', string> = {
    default: 'h-10 px-4 py-2',
    sm: 'h-9 px-3',
  }
  const variantClasses: Record<'default' | 'outline' | 'ghost', string> = {
    default: 'bg-blue-600 text-white hover:bg-blue-700',
    outline: 'border border-gray-300 bg-white hover:bg-gray-100',
    ghost: 'hover:bg-gray-100 hover:text-gray-900',
  }

  return (
    <button
      className={cn(baseClasses, sizeClasses[size], variantClasses[variant], className)}
      ref={ref}
      {...props}
    />
  )
})
Button.displayName = 'Button'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactNode
  error?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ className, icon, error, ...props }, ref) => {
  return (
    <div className="relative">
      {icon && <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">{icon}</div>}
      <input
        className={cn(
          "flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:opacity-50",
          icon ? 'pl-10' : '',
          error ? 'border-red-500' : '',
          className
        )}
        ref={ref}
        {...props}
      />
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  )
})
Input.displayName = 'Input'

type CardProps = React.HTMLAttributes<HTMLDivElement>
const Card = forwardRef<HTMLDivElement, CardProps>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-white shadow-sm",
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

type CardHeaderProps = React.HTMLAttributes<HTMLDivElement>
const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

type CardTitleProps = React.HTMLAttributes<HTMLParagraphElement>
const CardTitle = forwardRef<HTMLParagraphElement, CardTitleProps>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

type CardDescriptionProps = React.HTMLAttributes<HTMLParagraphElement>
const CardDescription = forwardRef<HTMLParagraphElement, CardDescriptionProps>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-gray-500", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

type CardContentProps = React.HTMLAttributes<HTMLDivElement>
const CardContent = forwardRef<HTMLDivElement, CardContentProps>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

// --- END OF DUMMY COMPONENTS ---

export default function ProfilePage() {
  const { user, updateProfile } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<{ text: string, type: 'success' | 'error' } | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
      phone: user?.phone || '',
      dateOfBirth: user?.dateOfBirth || '',
      address: user?.address || '',
      city: user?.city || '',
      country: user?.country || '',
      postalCode: user?.postalCode || '',
    }
  })

  useEffect(() => {
    if (user) {
      reset({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        dateOfBirth: user.dateOfBirth,
        address: user.address,
        city: user.city,
        country: user.country,
        postalCode: user.postalCode,
      })
    }
  }, [user, reset])

  const onSubmit: SubmitHandler<ProfileFormData> = async (data) => {
    setIsLoading(true)
    setMessage(null)
    try {
      await updateProfile(data)
      setIsEditing(false)
      setMessage({ text: 'Profile updated successfully!', type: 'success' })
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update profile'
      setMessage({ text: errorMessage, type: 'error' })
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    reset()
    setIsEditing(false)
  }

  return (
    <div className="space-y-6 p-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile Settings</h1>
        <p className="text-gray-600">Manage your account information and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {message && (
            <div className={`p-4 rounded-md ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {message.text}
            </div>
          )}
          {/* Personal Information Card */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Update your personal details</CardDescription>
                </div>
                {!isEditing && (
                  <Button
                    variant="outline"
                    onClick={() => setIsEditing(true)}
                    className="flex items-center"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                      First Name
                    </label>
                    <Input
                      id="firstName"
                      {...register('firstName')}
                      disabled={!isEditing}
                      error={errors.firstName?.message}
                      icon={<User className="w-4 h-4" />}
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name
                    </label>
                    <Input
                      id="lastName"
                      {...register('lastName')}
                      disabled={!isEditing}
                      error={errors.lastName?.message}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <Input
                      id="email"
                      type="email"
                      {...register('email')}
                      disabled={!isEditing}
                      error={errors.email?.message}
                      icon={<Mail className="w-4 h-4" />}
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <Input
                      id="phone"
                      type="tel"
                      {...register('phone')}
                      disabled={!isEditing}
                      error={errors.phone?.message}
                      icon={<Phone className="w-4 h-4" />}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 mb-1">
                    Date of Birth
                  </label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    {...register('dateOfBirth')}
                    disabled={!isEditing}
                    error={errors.dateOfBirth?.message}
                    icon={<Calendar className="w-4 h-4" />}
                  />
                </div>

                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  <Input
                    id="address"
                    {...register('address')}
                    disabled={!isEditing}
                    error={errors.address?.message}
                    icon={<MapPin className="w-4 h-4" />}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                      City
                    </label>
                    <Input
                      id="city"
                      {...register('city')}
                      disabled={!isEditing}
                      error={errors.city?.message}
                    />
                  </div>
                  <div>
                    <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                      Country
                    </label>
                    <Input
                      id="country"
                      {...register('country')}
                      disabled={!isEditing}
                      error={errors.country?.message}
                    />
                  </div>
                  <div>
                    <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-1">
                      Postal Code
                    </label>
                    <Input
                      id="postalCode"
                      {...register('postalCode')}
                      disabled={!isEditing}
                      error={errors.postalCode?.message}
                    />
                  </div>
                </div>

                {isEditing && (
                  <div className="flex gap-3 pt-4">
                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? (
                        <div className="flex items-center">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                          Saving...
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <Save className="w-4 h-4 mr-2" />
                          Save Changes
                        </div>
                      )}
                    </Button>
                    <Button type="button" variant="outline" onClick={handleCancel}>
                      Cancel
                    </Button>
                  </div>
                )}
              </form>
            </CardContent>
          </Card>

          {/* Preferences Card */}
          <Card>
            <CardHeader>
              <CardTitle>Preferences</CardTitle>
              <CardDescription>Manage your travel preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Seat Preference</h4>
                    <p className="text-sm text-gray-600">Window seat preferred</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Change
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Meal Preference</h4>
                    <p className="text-sm text-gray-600">Vegetarian</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Change
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Notifications</h4>
                    <p className="text-sm text-gray-600">Email and push notifications enabled</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Manage
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Profile Photo Card */}
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <div className="relative inline-block">
                  <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 text-2xl font-bold mb-4">
                    <User className="w-12 h-12" />
                  </div>
                  <button className="absolute bottom-2 right-2 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white">
                    <Camera className="w-4 h-4" />
                  </button>
                </div>
                <h3 className="text-lg font-semibold">
                  {user?.firstName} {user?.lastName}
                </h3>
                <p className="text-gray-600">{user?.email}</p>
                <p className="text-sm text-gray-500 mt-2">Member since {new Date().getFullYear()}</p>
              </div>
            </CardContent>
          </Card>

          {/* Account Status Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Account Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Email Verified</span>
                  <span className="text-green-600 text-sm font-medium">Verified</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Phone Verified</span>
                  <span className="text-gray-600 text-sm">Pending</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Account Status</span>
                  <span className="text-green-600 text-sm font-medium">Active</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Loyalty Tier</span>
                  <span className="text-blue-600 text-sm font-medium">Gold</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Security Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Security</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  Change Password
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Two-Factor Authentication
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Connected Devices
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
