import { SubscriptionResponseDTO } from "../subscription-option-response.dto";
import { AccountResponseDTO } from "./account-response.dto";
import { AccountSubscriptionLimitResponseDTO } from "./account-subscription-limit-response.dto";

/* eslint-disable @typescript-eslint/no-explicit-any */
export class AccountSubscriptionResponseDTO {
  id: string;
  subscriptionId: string;
  accountId: string;
  startDate: string;
  endDate: string;
  status: 'Active' | 'Inactive' | string;
  isPrimary: boolean;
  account: AccountResponseDTO;
  subscription: SubscriptionResponseDTO;
  accountSubscriptionPayment: any | null; // Define properly if needed
  accountSubscriptionLimit: AccountSubscriptionLimitResponseDTO[];
}