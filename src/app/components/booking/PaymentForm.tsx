// components/booking/PaymentForm.tsx
"use client"

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card'
import { CreditCard, Lock } from 'lucide-react'

export type PaymentFormData = z.infer<typeof paymentSchema>

const paymentSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  cardNumber: z.string().min(16, 'Card number must be 16 digits').max(16),
  cardHolder: z.string().min(2, 'Card holder name is required'),
  expiryMonth: z.string().min(2, 'Month is required'),
  expiryYear: z.string().min(4, 'Year is required'),
  cvv: z.string().min(3, 'CVV must be 3 digits').max(3),
})

interface PaymentFormProps {
  totalAmount: number
  onSubmit: (data: PaymentFormData) => void
  isLoading?: boolean
}

export default function PaymentForm({ totalAmount, onSubmit, isLoading = false }: PaymentFormProps) {
  const form = useForm<PaymentFormData>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      email: '',
      cardNumber: '',
      cardHolder: '',
      expiryMonth: '',
      expiryYear: '',
      cvv: '',
    },
  })

  const handleSubmit = async (data: PaymentFormData) => {
    await onSubmit(data)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Details</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <div className="bg-muted p-4 rounded-lg mb-6">
              <div className="flex justify-between items-center">
                <span className="font-semibold">Total Amount</span>
                <span className="text-2xl font-bold text-primary">${totalAmount}</span>
              </div>
            </div>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="your@email.com" type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cardNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Card Number</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <CreditCard className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="1234 5678 9012 3456"
                        className="pl-10"
                        maxLength={16}
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cardHolder"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Card Holder Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="expiryMonth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Expiry Month</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="MM" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Array.from({ length: 12 }, (_, i) => (
                          <SelectItem key={i + 1} value={(i + 1).toString().padStart(2, '0')}>
                            {(i + 1).toString().padStart(2, '0')}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="expiryYear"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Expiry Year</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="YYYY" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Array.from({ length: 10 }, (_, i) => {
                          const year = new Date().getFullYear() + i
                          return (
                            <SelectItem key={year} value={year.toString()}>
                              {year}
                            </SelectItem>
                          )
                        })}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="cvv"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CVV</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="123"
                      type="password"
                      maxLength={3}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full"
              disabled={form.formState.isSubmitting || isLoading}
            >
              {form.formState.isSubmitting || isLoading ? (
                <>
                  <Lock className="mr-2 h-4 w-4" />
                  Processing...
                </>
              ) : (
                <>
                  <Lock className="mr-2 h-4 w-4" />
                  Pay ${totalAmount}
                </>
              )}
            </Button>

            <div className="flex items-center justify-center text-sm text-muted-foreground">
              <Lock className="mr-2 h-4 w-4" />
              Your payment is secure and encrypted
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}