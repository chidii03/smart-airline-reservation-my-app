"use client"

import { useForm } from 'react-hook-form'
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

const passengerSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  gender: z.enum(['male', 'female', 'other']),
  nationality: z.string().min(1, 'Nationality is required'),
  passportNumber: z.string().min(1, 'Passport number is required'),
  passportExpiry: z.string().min(1, 'Passport expiry date is required'),
})

interface PassengerFormProps {
  passengerCount: number
  onSubmit: (data: z.infer<typeof passengerSchema>[]) => void
}

export default function PassengerForm({ passengerCount, onSubmit }: PassengerFormProps) {
  const form = useForm<z.infer<typeof passengerSchema>[]>({
    defaultValues: Array.from({ length: passengerCount }, () => ({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      dateOfBirth: '',
      gender: 'male',
      nationality: '',
      passportNumber: '',
      passportExpiry: '',
    }))
  })

  const handleSubmit = (data: z.infer<typeof passengerSchema>[]) => {
    onSubmit(data)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Passenger Information</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            {Array.from({ length: passengerCount }, (_, index) => (
              <div key={index} className="space-y-4 border-b pb-6 last:border-b-0">
                <h3 className="font-semibold">Passenger {index + 1}</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name={`${index}.firstName`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input placeholder="First name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`${index}.lastName`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Last name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`${index}.email`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="Email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`${index}.phone`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="Phone number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`${index}.dateOfBirth`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date of Birth</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`${index}.gender`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Gender</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select gender" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`${index}.nationality`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nationality</FormLabel>
                        <FormControl>
                          <Input placeholder="Nationality" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`${index}.passportNumber`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Passport Number</FormLabel>
                        <FormControl>
                          <Input placeholder="Passport number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`${index}.passportExpiry`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Passport Expiry</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            ))}

            <Button type="submit" className="w-full">
              Continue to Seat Selection
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}