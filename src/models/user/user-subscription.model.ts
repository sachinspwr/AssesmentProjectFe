/* eslint-disable @typescript-eslint/no-explicit-any */
import { User } from './user.model'; 
import { Subscription } from './subscription.model';
import { UserSubscriptionOrderModel } from './user-subscription-order.model';

export class UserSubscription {
  id: string;
  subscriptionId: string;
  userId: string;
  startDate: string;
  endDate: string;
  status: string;
  user: User; 
  subscription: Subscription; 
  userSubscriptionPayment: UserSubscriptionPayment;
  userSubscriptionLimit: any; 
}

export interface UserSubscriptionPayment {
  id: string;
  userSubscriptionId: string;
  userId: string;
  status: string;
  subscriptionId: string;
  subscriptionPaymentOrderId: string;
  subscriptionPaymentOrder?: UserSubscriptionOrderModel;
}
