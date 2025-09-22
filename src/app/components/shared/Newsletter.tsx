'use client';

import { useState } from 'react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { useToast } from '@/app/components/ui/use-toast';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: 'Success!',
          description: 'You have been subscribed to our newsletter.',
        });
        setEmail('');
      } else {
        toast({
          title: 'Error',
          description: data.error || 'Failed to subscribe to newsletter',
          variant: 'destructive',
        });
      }
    } catch  {
      toast({
        title: 'Error',
        description: 'Failed to subscribe to newsletter',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="bg-gray-100 py-12 px-4 md:px-8">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Stay Updated</h2>
            <p className="text-gray-600 mt-2">
              Subscribe to our newsletter for exclusive deals and travel tips
            </p>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1"
            />
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Subscribing...' : 'Subscribe'}
            </Button>
          </form>
          <p className="text-xs text-gray-500 mt-4 text-center">
            By subscribing, you agree to our Privacy Policy and consent to receive
            updates from our airline.
          </p>
        </div>
      </div>
    </section>
  );
}