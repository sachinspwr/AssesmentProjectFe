import { PaymentStatus } from '@utils/enums/payment-status.enum';
import { SubscriptionStatus } from '@utils/enums/subscription-status.enum';

export class UserSubscriptionRequestDTO {
  public subscriptionId!: string;
  public status!: SubscriptionStatus;
  public paymentId!: string;
  public orderId!: string;
  public paymentStatus!: PaymentStatus;
}
