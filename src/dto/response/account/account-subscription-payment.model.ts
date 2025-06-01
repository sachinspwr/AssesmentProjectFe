import { AccountSubscriptionOrderResponseDTO } from "./account-subscription-order.response.dto";

export class AccountSubscriptionPaymentResponseDTO {
  id: string;
  accountSubscriptionId: string;
  accountId: string;
  status: string;
  subscriptionId: string;
  subscriptionPaymentOrderId: string;
  subscriptionPaymentOrder?: AccountSubscriptionOrderResponseDTO;
}
