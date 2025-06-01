/* eslint-disable @typescript-eslint/no-explicit-any */
import { Subscription } from 'models/subscription';
import { AccountSubscriptionLimit } from './account-subscription-limit.model';
import { AccountSubscriptionPayment } from './account-subscription-sub-payment.model';
import { Account } from './account.model';

export class AccountSubscription {
  id: string;
  subscriptionId: string;
  accountId: string;
  startDate: string;
  endDate: string;
  status: string;
  isPrimary: boolean;
  account: Account;
  subscription: Subscription;
  accountSubscriptionPayment: AccountSubscriptionPayment | null;
  accountSubscriptionLimit: AccountSubscriptionLimit[];
}
