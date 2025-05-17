// hooks/useRazorpayCheckout.ts
import { useEffect } from 'react';
import { useUpdateUserSubscriptionOrderPaymentMutation } from 'store/slices/paymen-order.slice';

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

interface RazorpayInstance {
  open: () => void;
  close: () => void;
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  prefill: {
    email: string;
    contact: string;
  };
  handler: (response: RazorpayResponse) => void;
  modal: {
    ondismiss: () => void;
    escape: boolean;
    backdropclose: boolean;
  };
  theme: {
    color: string;
    backdrop_color: string;
    hide_topbar: boolean;
  };
}

interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
}

interface RazorpayConfig {
  orderId: string;
  amount: number;
  description?: string;
  subscriptionId: string;
  customerEmail?: string;
  customerPhone?: string;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export function useRazorpayCheckout() {
  const [updatePayment] = useUpdateUserSubscriptionOrderPaymentMutation();

  useEffect(() => {
    if (!window.Razorpay) {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    }
  }, []);

  const initiateCheckout = async (config: RazorpayConfig) => {
    if (!window.Razorpay) {
      throw new Error('Razorpay SDK not loaded');
    }

    // Store original scrollbar state
    const html = document.documentElement;
    const body = document.body;
    const originalBodyPaddingRight = body.style.paddingRight;
    const originalBodyOverflow = 'auto';
    const originalHtmlPaddingRight = html.style.paddingRight;

    // Apply scroll lock while preserving scrollbar space
    body.style.overflow = 'hidden';

    const options: RazorpayOptions = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_D4XUJVdcUiug4D',
      amount: config.amount * 100,
      currency: 'INR',
      name: 'Valt Technologies',
      description: config.description || 'Subscription Payment',
      order_id: config.orderId,
      prefill: {
        email: config.customerEmail || 'user@example.com',
        contact: config.customerPhone || '+919900000000',
      },
      handler: async (response: RazorpayResponse) => {
        try {
          await updatePayment({
            orderId: config.orderId,
            data: {
              paymentId: response.razorpay_payment_id,
              orderId: response.razorpay_order_id,
              subscriptionId: config.subscriptionId,
            },
          }).unwrap();
          config.onSuccess?.();
        } catch (error) {
          config.onError?.(error as Error);
        } finally {
          // Restore original styles
          body.style.paddingRight = originalBodyPaddingRight;
          body.style.overflow = originalBodyOverflow;
          html.style.paddingRight = originalHtmlPaddingRight;
        }
      },
      modal: {
        ondismiss: () => {
          config.onError?.(new Error('Payment cancelled by user'));
          body.style.paddingRight = originalBodyPaddingRight;
          body.style.overflow = originalBodyOverflow;
          html.style.paddingRight = originalHtmlPaddingRight;
        },
        escape: false,
        backdropclose: false,
      },
      theme: {
        color: '#0064c7', // Your theme-primary color
        backdrop_color: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black
        hide_topbar: true,
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();

    return () => {
      rzp.close();
      body.style.paddingRight = originalBodyPaddingRight;
      body.style.overflow = originalBodyOverflow;
      html.style.paddingRight = originalHtmlPaddingRight;
    };
  };

  return { initiateCheckout };
}