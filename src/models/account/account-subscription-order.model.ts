import { PaymentStatus } from '@utils/enums/payment-status.enum';
import { Subscription } from '../subscription';
import { Audit } from 'models/audit.model';

export class AccountSubscriptionOrderModel extends Audit {
  orderId: string;
  subscriptionId: string;
  subscription: Subscription;
  paymentId?: string | null;
  amount: string;
  currency: string;
  method?: string | null;
  description?: string | null;
  status: PaymentStatus;
  paymentModeMasterId: string;
}
