"use client"

import React from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Flight } from "@/app/types/flight"

// Schema
const bookingSchema = z.object({
  tripType: z.enum(["one-way", "round-trip"]),
  passengers: z.number().min(1).max(9), 
  class: z.enum(["economy", "premium", "business", "first"]),
})

export type BookingFormValues = z.infer<typeof bookingSchema>

interface BookingFormProps {
  flight: Flight
  onSubmit: (data: BookingFormValues) => void
}

export default function BookingForm({ flight, onSubmit }: BookingFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      tripType: "one-way",
      passengers: 1,
      class: "economy",
    },
  })

  const passengers = watch("passengers") || 1
  const totalPrice = (flight?.price || 0) * passengers

  const onSubmitHandler: SubmitHandler<BookingFormValues> = (data) => {
    onSubmit(data)
  }

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-md shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Book Flight</h3>

      <form onSubmit={handleSubmit(onSubmitHandler)} className="space-y-4">
        {/* Trip type */}
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="tripType">
            Trip Type
          </label>
          <select
            id="tripType"
            {...register("tripType")}
            className="w-full border rounded px-3 py-2"
          >
            <option value="one-way">One Way</option>
            <option value="round-trip">Round Trip</option>
          </select>
          {errors.tripType && (
            <p className="text-sm text-red-600 mt-1">{errors.tripType.message}</p>
          )}
        </div>

        {/* Passengers */}
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="passengers">
            Passengers
          </label>
          <input
            id="passengers"
            type="number"
            min={1}
            max={9}
            {...register("passengers", { valueAsNumber: true })} // ✅ ensures number
            className="w-full border rounded px-3 py-2"
          />
          {errors.passengers && (
            <p className="text-sm text-red-600 mt-1">{errors.passengers.message}</p>
          )}
        </div>

        {/* Class */}
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="class">
            Class
          </label>
          <select
            id="class"
            {...register("class")}
            className="w-full border rounded px-3 py-2"
          >
            <option value="economy">Economy</option>
            <option value="premium">Premium Economy</option>
            <option value="business">Business</option>
            <option value="first">First Class</option>
          </select>
          {errors.class && (
            <p className="text-sm text-red-600 mt-1">{errors.class.message}</p>
          )}
        </div>

        {/* Price */}
        <div className="bg-gray-50 p-3 rounded">
          <div className="flex justify-between items-center">
            <span className="font-medium">Total Price</span>
            <span className="text-xl font-bold">${totalPrice.toFixed(2)}</span>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-red-600 text-white py-2 rounded disabled:opacity-60"
          disabled={isSubmitting}
        >
          Continue to Passenger Details
        </button>
      </form>
    </div>
  )
}
