import { SubscriptionLimitResponseDTO } from "./account-subscription-limit-response.dto";
import { SubscriptionPaymentResponseDTO } from "./account-subscription-payment-response.dto";
import { SubscriptionAccountUserResponseDTO } from "./subscription-account-user-response.dto";
import { SubscriptionResponseDTO } from "./subscription-option-response.dto";

/* eslint-disable @typescript-eslint/no-explicit-any */
export class AccountSubscriptionResponseDTO {
  id!: string;
  subscriptionId!: string;
  accountId!: string;
  startDate!: string;
  endDate!: string;
  status!: string;
  isPrimary!: boolean;
  account!: SubscriptionAccountUserResponseDTO;
  subscription!: SubscriptionResponseDTO;
  accountSubscriptionPayment: SubscriptionPaymentResponseDTO;
  accountSubscriptionLimit: SubscriptionLimitResponseDTO[]; 
}
