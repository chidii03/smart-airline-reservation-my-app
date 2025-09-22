// PayStack payment integration utilities
import { apiClient } from './api';
import { PaymentData }from './paymentdata';

export interface PaystackConfig {
  publicKey: string;
  currency: string;
  channels: string[];
}

export interface PaymentResponse {
  status: boolean;
  message: string;
  data: {
    authorization_url: string;
    access_code: string;
    reference: string;
  };
}

export interface VerificationResponse {
  status: boolean;
  message: string;
  data: {
    amount: number;
    currency: string;
    transaction_date: string;
    status: 'success' | 'failed' | 'abandoned';
    reference: string;
    metadata: Record<string, unknown>;
    customer: {
      email: string;
      first_name?: string;
      last_name?: string;
    };
  };
}

// Typing for PaystackPop inline script
interface PaystackInlineHandler {
  openIframe: () => void;
}

interface PaystackPop {
  setup: (options: {
    key: string;
    email: string;
    amount: number;
    currency?: string;
    ref: string;
    metadata?: Record<string, unknown>;
    channels?: string[];
    callback: (response: PaymentResponse['data']) => void;
    onClose?: () => void;
  }) => PaystackInlineHandler;
}

declare global {
  interface Window {
    PaystackPop?: PaystackPop;
  }
}

class PaystackService {
  private config: PaystackConfig;
  private isInitialized = false;

  constructor() {
    this.config = {
      publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || '',
      currency: 'NGN',
      channels: ['card', 'bank', 'ussd', 'qr', 'mobile_money'],
    };
  }

  initialize(publicKey?: string): boolean {
    if (this.isInitialized) return true;
    const key = publicKey || this.config.publicKey;
    if (!key) {
      console.error('PayStack public key is required');
      return false;
    }
    this.config.publicKey = key;
    this.isInitialized = true;
    return true;
  }

  async loadPaystackScript(): Promise<boolean> {
    return new Promise((resolve) => {
      if (typeof window === 'undefined') return resolve(false);
      if (window.PaystackPop) return resolve(true);

      const script = document.createElement('script');
      script.src = 'https://js.paystack.co/v1/inline.js';
      script.async = true;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.head.appendChild(script);
    });
  }

  async initializePayment(paymentData: PaymentData): Promise<PaymentResponse> {
    if (!this.isInitialized) {
      throw new Error('PayStack not initialized. Call initialize() first.');
    }

    try {
      const paymentPayload: PaymentData = {
        bookingId: paymentData.bookingId,
        amount: paymentData.amount,
        paymentMethod: paymentData.paymentMethod,
        currency: paymentData.currency || this.config.currency,
        reference: paymentData.reference || this.generateReference(),
        metadata: paymentData.metadata,
        callback_url: paymentData.callback_url,
      };

      // Only include email if provided
      if (paymentData.email) {
        paymentPayload.email = paymentData.email;
      }

      const response = await apiClient.initiatePayment(paymentPayload);

      // Map apiClient.initiatePayment response to Paystack PaymentResponse
      return {
        status: response.data.status === 'success',
        message: response.data.status === 'success' ? 'Payment initialized successfully' : 'Payment initialization failed',
        data: {
          authorization_url: response.data.redirectUrl,
          access_code: response.data.paymentId, // Assuming paymentId as access_code
          reference: paymentPayload.reference || this.generateReference(),
        },
      };
    } catch (error: unknown) {
      console.error('Payment initialization failed:', error);
      throw new Error('Failed to initialize payment');
    }
  }

  async openPaymentModal(
    paymentData: PaymentData,
    onSuccess: (response: PaymentResponse['data']) => void,
    onClose: () => void = () => {},
  ): Promise<void> {
    if (typeof window === 'undefined') return;

    const scriptLoaded = await this.loadPaystackScript();
    if (!scriptLoaded) throw new Error('Failed to load PayStack script');

    const PaystackPop = window.PaystackPop;
    if (!PaystackPop) throw new Error('PayStack not available');

    const handler = PaystackPop.setup({
      key: this.config.publicKey,
      email: paymentData.email || '',
      amount: paymentData.amount * 100, // Convert to kobo for Paystack
      currency: paymentData.currency || this.config.currency,
      ref: paymentData.reference || this.generateReference(),
      metadata: paymentData.metadata,
      channels: this.config.channels,
      callback: onSuccess,
      onClose,
    });

    handler.openIframe();
  }

  async verifyPayment(reference: string): Promise<VerificationResponse> {
    try {
      const response = await apiClient.verifyPayment(reference);

      // Map apiClient.verifyPayment response to Paystack VerificationResponse
      return {
        status: response.data.status === 'success',
        message: response.data.status === 'success' ? 'Payment verified successfully' : 'Payment verification failed',
        data: {
          amount: 0, // Update if API provides amount
          currency: this.config.currency,
          transaction_date: new Date().toISOString(), // Update if API provides date
          status: response.data.status as 'success' | 'failed' | 'abandoned',
          reference,
          metadata: {}, // Update if API provides metadata
          customer: {
            email: '', // Update if API provides email
          },
        },
      };
    } catch (error: unknown) {
      console.error('Payment verification failed:', error);
      throw new Error('Failed to verify payment');
    }
  }

  generateReference(prefix: string = 'PSK'): string {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 10);
    return `${prefix}_${timestamp}_${random}`.toUpperCase();
  }

  formatAmount(amount: number, currency: string = 'NGN'): string {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency,
      minimumFractionDigits: 2,
    }).format(amount);
  }

  validatePaymentData(paymentData: PaymentData): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!paymentData.email) errors.push('Email is required');
    else if (!/\S+@\S+\.\S+/.test(paymentData.email)) errors.push('Invalid email format');

    if (!paymentData.amount || paymentData.amount <= 0) errors.push('Amount must be greater than 0');
    if (!paymentData.reference) errors.push('Payment reference is required');
    if (!paymentData.bookingId) errors.push('Booking ID is required');
    if (!paymentData.paymentMethod) errors.push('Payment method is required');

    return { isValid: errors.length === 0, errors };
  }

  getAvailableChannels(amount: number): string[] {
    let channels = [...this.config.channels];
    if (amount < 100) channels = channels.filter((c) => c !== 'ussd');
    if (!['GHS', 'KES'].includes(this.config.currency)) channels = channels.filter((c) => c !== 'mobile_money');
    return channels;
  }

  async handlePaymentCallback(reference: string): Promise<{
    success: boolean;
    data?: VerificationResponse['data'];
    error?: string;
  }> {
    try {
      const verification = await this.verifyPayment(reference);
      if (verification.status && verification.data.status === 'success') {
        return { success: true, data: verification.data };
      }
      return { success: false, error: verification.message || 'Payment failed' };
    } catch (error: unknown) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Payment verification failed',
      };
    }
  }

  getPaymentStatusText(status: string): string {
    switch (status) {
      case 'success':
        return 'Payment Successful';
      case 'failed':
        return 'Payment Failed';
      case 'abandoned':
        return 'Payment Abandoned';
      default:
        return 'Payment Pending';
    }
  }

  getPaymentStatusColor(status: string): string {
    switch (status) {
      case 'success':
        return 'text-green-600 bg-green-100';
      case 'failed':
        return 'text-red-600 bg-red-100';
      case 'abandoned':
        return 'text-yellow-600 bg-yellow-100';
      default:
        return 'text-blue-600 bg-blue-100';
    }
  }
}

export const paystackService = new PaystackService();

export const usePaystack = () => {
  const initialize = (publicKey?: string) => paystackService.initialize(publicKey);

  const makePayment = async (
    paymentData: PaymentData,
    onSuccess: (response: PaymentResponse['data']) => void,
    onClose: () => void = () => {},
  ) => paystackService.openPaymentModal(paymentData, onSuccess, onClose);

  const verifyPayment = (reference: string) => paystackService.verifyPayment(reference);
  const generateReference = (prefix?: string) => paystackService.generateReference(prefix);

  return {
    initialize,
    makePayment,
    verifyPayment,
    generateReference,
    formatAmount: paystackService.formatAmount,
    validatePaymentData: paystackService.validatePaymentData,
  };
};

export default paystackService;