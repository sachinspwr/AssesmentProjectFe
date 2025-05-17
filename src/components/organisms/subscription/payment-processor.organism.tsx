import React, { useState, useEffect } from 'react';
import { useCreateUserSubscriptionOrderPaymentMutation } from 'store/slices/paymen-order.slice';
import { useRazorpayCheckout } from './useRazorpayCheckout';
import { VLoader } from '@components/molecules/index';

interface SubscriptionPaymentProcessorProps {
  subscriptionId: string;
  onPaymentComplete: () => void;
  onError?: (error: Error) => void;
}

function SubscriptionPaymentProcessor({ subscriptionId, onPaymentComplete, onError }: SubscriptionPaymentProcessorProps) {
  const [createOrder, { isLoading }] = useCreateUserSubscriptionOrderPaymentMutation();
  const { initiateCheckout } = useRazorpayCheckout();
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const handlePayment = async () => {
      try {
        setIsProcessing(true);

        // 1. Create payment order
        const paymentOrder = await createOrder({
          subscriptionId,
          orderId: '',
          paymentId: '',
        }).unwrap();

        if (!paymentOrder?.orderId) {
          throw new Error('Invalid payment response from API');
        }

        // 2. Launch Razorpay checkout
        await initiateCheckout({
          orderId: paymentOrder.orderId,
          amount: paymentOrder.amount,
          subscriptionId: paymentOrder.subscriptionId,
          onSuccess: () => {
            onPaymentComplete();
            setIsProcessing(false);
          },
          onError: (error) => {
            onError?.(error);
            setIsProcessing(false);
          },
        });
      } catch (error) {
        console.error('Payment process failed:', error);
        onError?.(error as Error);
        setIsProcessing(false);
      }
    };

    handlePayment();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subscriptionId]);

  return (
    <div className="text-center py-4 relative">
    {(isLoading || isProcessing) && (
      <div
        className="animate-fade-in flex flex-col items-center space-y-2"
      >
        <VLoader position='global-popped' />
      </div>
    )}
  </div>
  
  );
}

export { SubscriptionPaymentProcessor };
