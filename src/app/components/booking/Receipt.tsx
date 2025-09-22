"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import type { Booking } from "@/app/types/booking";

type ReceiptProps = {
  booking: Booking;
};

export default function Receipt({ booking }: ReceiptProps) {
  return (
    <Card className="border rounded-xl shadow-sm bg-white">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          Booking Receipt
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-sm text-gray-700">
        {/* Receipt ID */}
        <div>
          <span className="font-medium">Receipt ID:</span> {booking.id}
        </div>

        {/* Flight Info */}
        <div>
          <span className="font-medium">Flight:</span>{" "}
          {booking.flight?.flightNumber} — {booking.flight?.departureCity} to{" "}
          {booking.flight?.arrivalCity}
        </div>

        {/* Passengers */}
        <div>
          <span className="font-medium">Passengers:</span>
          <ul className="list-disc list-inside">
            {booking.passengers.map((p, i) => (
              <li key={i}>
                {p.firstName} {p.lastName}
              </li>
            ))}
          </ul>
        </div>

        {/* Selected Seats */}
        <div>
          <span className="font-medium">Seats:</span>{" "}
          {booking.selectedSeats.map((s) => s.seatNumber).join(", ")}
        </div>

        {/* Total Price */}
        <div>
          <span className="font-medium">Total Price:</span> $
          {booking.totalPrice.toFixed(2)}
        </div>

        {/* Issue Date */}
        <div>
          <span className="font-medium">Issued On:</span>{" "}
          {new Date().toLocaleDateString()}
        </div>
      </CardContent>
    </Card>
  );
}
