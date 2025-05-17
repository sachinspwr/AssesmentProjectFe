import { SubscriptionResponseDTO } from "./subscription-option-response.dto";
import { UserResponseDTO } from "./user-response.dto";

/* eslint-disable @typescript-eslint/no-explicit-any */
export class UserSubscriptionResponseDTO {
  id!: string;
  subscriptionId!: string;
  userId!: string;
  startDate!: string;
  endDate!: string;
  status!: string;
  user!: UserResponseDTO;
  subscription!: SubscriptionResponseDTO;
  userSubscriptionPayment: {
    id: string;
    userSubscriptionId: string;
    userId: string;
    status: string;
    subscriptionId: string;
    subscriptionPaymentOrderId: string;
  };
  userSubscriptionLimit: any; // This can be `null` or define a more specific type, if applicable
}
