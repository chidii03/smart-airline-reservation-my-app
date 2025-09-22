'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Mail, ArrowLeft } from 'lucide-react';

import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { forgotPasswordSchema, type ForgotPasswordFormData } from '@/app/lib/validations';
import { toast } from 'react-hot-toast';

export default function ForgotPasswordPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Password reset requested for:', data.email);
      setIsSubmitted(true);
      toast.success('Password reset instructions sent to your email');
    } catch {
      toast.error('Failed to send reset instructions');
    }
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen bg-white flex items-center justify-center p-4"
      >
        <Card className="w-full max-w-md border-0 shadow-2xl rounded-lg">
          <CardHeader className="text-center space-y-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <Mail className="w-8 h-8 text-green-600" />
            </div>
            <CardTitle className="text-3xl font-bold text-gray-900">Check Your Email</CardTitle>
            <CardDescription className="text-gray-600">
              We have sent password reset instructions to your email address
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <p className="text-gray-600">
              If you do not see the email, check your spam folder or try resending.
            </p>
            <div className="space-y-3">
              <Button
                onClick={() => setIsSubmitted(false)}
                variant="outline"
                className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 rounded-md"
              >
                Try a different email
              </Button>
              <Link href="/login">
                <Button variant="ghost" className="w-full text-gray-700 hover:bg-gray-50 rounded-md">
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Back to login
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-white flex items-center justify-center p-4"
    >
      <Card className="w-full max-w-md border-0 shadow-2xl rounded-lg">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-3xl font-bold text-gray-900">Reset Password</CardTitle>
          <CardDescription className="text-gray-600">
            Enter your email address to receive reset instructions
          </CardDescription>
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
                placeholder="Enter your email address"
                {...register('email')}
                className="w-full border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
              {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>}
            </div>

            <Button
              type="submit"
              className="w-full bg-red-600 text-white hover:bg-red-700 focus:ring-2 focus:ring-red-500 rounded-md py-2 text-lg font-semibold transition-colors"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Sending...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <Mail className="w-5 h-5 mr-2" />
                  Send Reset Instructions
                </div>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <Link href="/login">
              <Button variant="ghost" className="text-gray-700 hover:bg-gray-50 rounded-md">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to login
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}