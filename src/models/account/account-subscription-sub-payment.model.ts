import { PaymentStatus } from '@utils/enums/payment-status.enum';
import { AccountSubscriptionOrderModel } from './account-subscription-order.model';

export class AccountSubscriptionPayment {
  id: string;
  accountSubscriptionId: string;
  accountId: string;
  status: PaymentStatus;
  subscriptionId: string;
  subscriptionPaymentOrderId: string;
  subscriptionPaymentOrder?: AccountSubscriptionOrderModel;
}
