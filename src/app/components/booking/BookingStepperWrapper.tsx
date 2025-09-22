// src/app/components/booking/BookingStepperWrapper.tsx
'use client';

import { useState } from 'react';
import BookingStepper from './BookingStepper';
import { Flight } from '@/app/types/flight'; 

// This component will be responsible for managing the state of the booking steps.
export default function BookingStepperWrapper({ flight }: { flight: Flight }) {
  const [currentStep, setCurrentStep] = useState('details');

  
  const renderStepContent = () => {
    switch (currentStep) {
      case 'details':
        return <div>Flight Details for {flight.flightNumber}</div>;
      case 'passengers':
        return <div>Passenger Info Form</div>;
      case 'seats':
        return <div>Seat Selection UI</div>;
      case 'payment':
        return <div>Payment Gateway</div>;
      case 'confirmation':
        return <div>Booking Confirmed!</div>;
      default:
        return null;
    }
  };

  return (
    <BookingStepper currentStep={currentStep} onStepChange={setCurrentStep}>
      {renderStepContent()}
    </BookingStepper>
  );
}