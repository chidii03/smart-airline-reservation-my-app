'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Eye, UserPlus } from 'lucide-react';

import { useAuth } from '@/app/hooks/useAuth';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import SocialLogin from '@/app/components/auth/SocialLogin';
import PasswordStrength from '@/app/components/auth/PasswordStrength';
import { registerSchema, type RegisterFormData } from '@/app/lib/validations';
import { toast } from 'react-hot-toast';

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const { register: registerUser, loading } = useAuth();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: 'onChange'
  });

  const passwordValue = watch('password', '');
  const confirmPasswordValue = watch('confirmPassword', '');

  const onSubmit = async (data: RegisterFormData) => {
    if (data.password !== data.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    try {
      const { terms, ...rest } = data;
      const payload = {
        ...rest,
        agreeToTerms: terms,
      };

      await registerUser(payload);
      toast.success('Account created successfully!');
      router.push('/dashboard');
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message || 'Registration failed');
      } else {
        toast.error('An unknown error occurred');
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-white flex items-center justify-center p-4"
    >
      <Card className="w-full max-w-md border-0 shadow-2xl rounded-lg">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-3xl font-bold text-gray-900">Create Account</CardTitle>
          <CardDescription className="text-gray-600">Join thousands of travelers worldwide</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                  First Name
                </label>
                <Input
                  id="firstName"
                  placeholder="John"
                  {...register('firstName')}
                  className="w-full border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
                {errors.firstName && <p className="text-sm text-red-600 mt-1">{errors.firstName.message}</p>}
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name
                </label>
                <Input
                  id="lastName"
                  placeholder="Doe"
                  {...register('lastName')}
                  className="w-full border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
                {errors.lastName && <p className="text-sm text-red-600 mt-1">{errors.lastName.message}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                {...register('email')}
                className="w-full border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
              {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <Input
                id="phone"
                type="tel"
                placeholder="+1 (555) 123-4567"
                {...register('phone')}
                className="w-full border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
              {errors.phone && <p className="text-sm text-red-600 mt-1">{errors.phone.message}</p>}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Create a strong password"
                  {...register('password')}
                  className="w-full border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500 pr-10"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <Eye className="w-5 h-5" style={{ opacity: showPassword ? 0.5 : 1 }} />
                </button>
              </div>
              {errors.password && <p className="text-sm text-red-600 mt-1">{errors.password.message}</p>}
              {passwordValue && <PasswordStrength password={passwordValue} />}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                {...register('confirmPassword')}
                className="w-full border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
              {errors.confirmPassword && <p className="text-sm text-red-600 mt-1">{errors.confirmPassword.message}</p>}
              {passwordValue && confirmPasswordValue && passwordValue !== confirmPasswordValue && (
                <p className="text-sm text-red-600 mt-1">Passwords don&apos;t match</p>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <input
                id="terms"
                {...register('terms')}
                type="checkbox"
                className="h-4 w-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
              />
              <label htmlFor="terms" className="text-sm text-gray-900">
                I agree to the{' '}
                <Link href="/terms" className="text-red-600 hover:text-red-700">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="/privacy" className="text-red-600 hover:text-red-700">
                  Privacy Policy
                </Link>
              </label>
            </div>
            {errors.terms && <p className="text-sm text-red-600 mt-1">{errors.terms.message}</p>}

            <div className="flex items-center space-x-2">
              <input
                id="newsletter"
                {...register('newsletter')}
                type="checkbox"
                className="h-4 w-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
              />
              <label htmlFor="newsletter" className="text-sm text-gray-900">
                Subscribe to our newsletter for exclusive deals
              </label>
            </div>

            <Button
              type="submit"
              className="w-full bg-red-600 text-white hover:bg-red-700 focus:ring-2 focus:ring-red-500 rounded-md py-2 text-lg font-semibold transition-colors"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Creating...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <UserPlus className="w-5 h-5 mr-2" />
                  Create Account
                </div>
              )}
            </Button>
          </form>

          <div className="mt-6">
            <SocialLogin
              onGoogleLogin={() => window.location.href = '/api/auth/google'}
              onFacebookLogin={() => window.location.href = '/api/auth/facebook'}
              onTwitterLogin={() => window.location.href = '/api/auth/x'}
              onGithubLogin={() => window.location.href = '/api/auth/github'}
            />
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link href="/login" className="text-red-600 hover:text-red-700 font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}