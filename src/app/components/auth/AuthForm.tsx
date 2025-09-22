"use client"

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/app/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/app/components/ui/form'
import { Input } from '@/app/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card'
import SocialLogin from './SocialLogin'
import PasswordStrength from './PasswordStrength'

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

const registerSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

type LoginFormData = z.infer<typeof loginSchema>
type RegisterFormData = z.infer<typeof registerSchema>

interface AuthFormProps {
  mode: 'login' | 'register'
  onSubmit: (data: LoginFormData | RegisterFormData) => Promise<void>
  onSocialLogin: (provider: string) => void
  isLoading?: boolean
}

export default function AuthForm({ mode, onSubmit, onSocialLogin, isLoading = false }: AuthFormProps) {
  const [password, setPassword] = useState('')

  const form = useForm<LoginFormData | RegisterFormData>({
    resolver: zodResolver(mode === 'login' ? loginSchema : registerSchema),
    defaultValues: mode === 'login' ? {
      email: '',
      password: '',
    } : {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  const handleSubmit = async (data: LoginFormData | RegisterFormData) => {
    try {
      await onSubmit(data)
    } catch {
      // Error handling is done in the parent component
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-center">
          {mode === 'login' ? 'Sign In to Your Account' : 'Create New Account'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            {mode === 'register' && (
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="email@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input 
                      type="password" 
                      placeholder="••••••" 
                      {...field}
                      onChange={(e) => {
                        field.onChange(e)
                        setPassword(e.target.value)
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {mode === 'register' && (
              <>
                <PasswordStrength password={password} />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="••••••" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading}
              size="lg"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
                  {mode === 'login' ? 'Signing in...' : 'Creating account...'}
                </div>
              ) : (
                mode === 'login' ? 'Sign In' : 'Create Account'
              )}
            </Button>
          </form>
        </Form>

        <SocialLogin
          onGoogleLogin={() => onSocialLogin('google')}
          onFacebookLogin={() => onSocialLogin('facebook')}
          onTwitterLogin={() => onSocialLogin('twitter')}
          onGithubLogin={() => onSocialLogin('github')}
          isLoading={isLoading}
        />

        <div className="text-center text-sm text-muted-foreground mt-4">
          {mode === 'login' ? (
            <>
              Do not have an account?{' '}
              <Button variant="link" className="p-0" asChild>
                <a href="/register">Sign up</a>
              </Button>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <Button variant="link" className="p-0" asChild>
                <a href="/login">Sign in</a>
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  )
}