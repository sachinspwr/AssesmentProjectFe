import React, { useEffect } from 'react';
import { useUpdateUserSubscriptionOrderPaymentMutation } from 'store/slices/paymen-order.slice';

interface RazorpayCheckoutProps {
  orderId: string;
  amount: number;
  subscriptionId: string;
  description?: string;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

// eslint-disable-next-line react/function-component-definition
const RazorpayCheckout: React.FC<RazorpayCheckoutProps> = ({
  orderId,
  amount,
  subscriptionId,
  description = 'Subscription Payment',
  onSuccess,
  onError,
}) => {
  const [updatePayment] = useUpdateUserSubscriptionOrderPaymentMutation();

  useEffect(() => {
    if (!orderId || !window.Razorpay) return;

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: amount * 100,
      currency: 'INR',
      description,
      order_id: orderId,
      handler: async (response: { 
        razorpay_payment_id: string; 
        razorpay_order_id: string 
      }) => {
        try {
          await updatePayment({
            orderId,
            data: {
              paymentId: response.razorpay_payment_id,
              orderId: response.razorpay_order_id,
            },
          }).unwrap();
          onSuccess?.();
        } catch (error) {
          onError?.(error as Error);
        }
      },
      modal: {
        ondismiss: () => {
          if (confirm('Are you sure you want to cancel this payment?')) {
            onError?.(new Error('Payment cancelled by user'));
          }
        },
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();

    return () => rzp.close();
  }, [orderId, amount, description, subscriptionId, updatePayment, onSuccess, onError]);

  return null;
};

export default RazorpayCheckout;