'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Eye, LogIn } from 'lucide-react';

import { useAuth } from '@/app/hooks/useAuth';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import SocialLogin from '@/app/components/auth/SocialLogin';
import { loginSchema, type LoginFormData } from '@/app/lib/validations';
import { toast } from 'react-hot-toast';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const { login, loading } = useAuth();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data);
      toast.success('Welcome back!');
      router.push('/dashboard');
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message || 'Login failed');
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
          <CardTitle className="text-3xl font-bold text-gray-900">Welcome Back</CardTitle>
          <CardDescription className="text-gray-600">Sign in to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                {...register('email')}
                className="w-full border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
              {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
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
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                />
                <label htmlFor="remember-me" className="text-sm text-gray-600">
                  Remember me
                </label>
              </div>
              <Link
                href="/forgot-password"
                className="text-sm text-red-600 hover:text-red-700"
              >
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full bg-red-600 text-white hover:bg-red-700 focus:ring-2 focus:ring-red-500 rounded-md py-2 text-lg font-semibold transition-colors"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Signing in...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <LogIn className="w-5 h-5 mr-2" />
                  Sign In
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
              Don’t have an account?{' '}
              <Link href="/register" className="text-red-600 hover:text-red-700 font-medium">
                Sign up
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}