import React, { useState, useEffect } from 'react';
import { useCreateUserSubscriptionOrderPaymentMutation } from 'store/slices/paymen-order.slice';
import { useRazorpayCheckout } from './useRazorpayCheckout';
import { VLoader } from '@components/molecules';
import { SubscriptionPlanLimitKey } from '@utils/enums/subscription-plan-limit-key.enum';
import { SubscriptionPaymentOrdersRequestDTO } from '@dto/request';
import { VModal } from '../modal/v-modal.organism';
import { VDynamicForm } from '@components/organisms';
import { VFormFieldData, VFormFields } from '@types';
import { VButton } from '@components/atoms';
// import { Navigate, useNavigate } from 'react-router-dom';
import { splitAndCapitalize } from '@utils/index';
import { AccountSubscription } from 'models/account/account-subscription.model';
// import { SubscriptionResponseDTO } from '@dto/response/subscription-option-response.dto';

interface SubscriptionPaymentProcessorProps {
  subscriptionId: string;
  onPaymentComplete: () => void;
  onError?: (error: Error) => void;
  isEnterprise?: boolean;
  subscriptions?: AccountSubscription;
}

function SubscriptionPaymentProcessor({
  subscriptionId,
  onPaymentComplete,
  onError,
  // isEnterprise = false,
  subscriptions,
}: SubscriptionPaymentProcessorProps) {
  const [createOrder, { isLoading }] = useCreateUserSubscriptionOrderPaymentMutation();
  const { initiateCheckout } = useRazorpayCheckout();
  // const navigate = useNavigate();
  console.log('subscriptionLimit from its parent', subscriptions);
  // Enterprise modal states
  const [showEnterpriseModal, setShowEnterpriseModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);


  const handleEnterpriseSubmit = async (formData: VFormFieldData) => {
    setShowEnterpriseModal(false);
    setIsProcessing(true);

    try {
      const features = Object.entries(SubscriptionPlanLimitKey).reduce((acc, [_, limitKey]) => {
        const rawValue = formData[limitKey];
        const value = Number(rawValue);

        if (!isNaN(value) && value > 0) {
          acc.push({ limitKey, value });
        }

        return acc;
      }, [] as { limitKey: SubscriptionPlanLimitKey; value: number }[]);

      const reqDto: SubscriptionPaymentOrdersRequestDTO = {
        subscriptionId,
        applyLimitPrice: true,
        features
      };

      const paymentOrder = await createOrder(reqDto).unwrap();

      if (!paymentOrder?.orderId) {
        throw new Error('Invalid payment response from API');
      }

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

  // Non-enterprise effect: direct flow on mount or subscriptionId change
  useEffect(() => {
    console.log('subscriptionLimit from its parent', subscriptions);
    if (!subscriptions) return;
    const isCustomSubscription = subscriptions?.type === 'Custom';

    if (isCustomSubscription) {
      setShowEnterpriseModal(true);
    } else {
      const handlePayment = async () => {
        try {
          setIsProcessing(true);

          const paymentOrder = await createOrder({
            subscriptionId,
            orderId: '',
            paymentId: '',
          }).unwrap();

          if (!paymentOrder?.orderId) {
            throw new Error('Invalid payment response from API');
          }

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
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subscriptionId]);


  const enterpriseFormConfig: VFormFields[] = [
    {
      type: 'group',
      position: '1 1 12',
      fields: Object.entries(SubscriptionPlanLimitKey)
        .filter(([_, limitKey]) => {
          // Exclude CREATE_USER field if plan is 'Test plan'
          return !(subscriptions?.name === 'Test Pass' && limitKey === SubscriptionPlanLimitKey.CreateUser);
        })
        .flatMap(([key, limitKey], index) => {
          const row = Math.floor(index / 2) + 1;
          const col = index % 2 === 0 ? 1 : 7;

          return [
            {
              type: 'number' as const,
              name: limitKey,
              label: `${splitAndCapitalize(key)} Value`,
              required: false,
              position: `${row} ${col} 6`,
            },
          ];
        }),
    },
    {
      type: 'custom',
      name: 'save',
      label: 'Create',
      position: `${Object.keys(SubscriptionPlanLimitKey).length } 8 5`,
      customContent: <VButton type="submit" isLoading={isLoading}>Proceed To Checkout</VButton>,
    }
  ];

  return (
    <>
      {(isLoading || isProcessing) && (
        <div className="animate-fade-in flex flex-col items-center space-y-2 text-center py-4 relative">
          <VLoader position="global-popped" />
        </div>
      )}

      {/* Enterprise Subscription Modal */}
      <VModal
        isOpen={showEnterpriseModal}
        title="Customise Your Subscription"
        onClose={() => setShowEnterpriseModal(false)}
        onSubmit={() => { }}
        okButtonLabel="Proceed to Pay"
        cancelButtonLabel="Cancel"
        showFooter={false}
      >
        <VDynamicForm
          config={enterpriseFormConfig}
          onSubmit={handleEnterpriseSubmit}
          renderMode="edit"
          contentClasses="space-y-4"
        />
      </VModal>
    </>
  );
}

export { SubscriptionPaymentProcessor };