import { SubscriptionPlanLimitKey } from "@utils/enums/subscription-plan-limit-key.enum";

export class SubscriptionPaymentOrdersRequestDTO {
  subscriptionId?: string;
  orderId?: string;
  paymentId?: string;
  applyLimitPrice?: boolean;
  features?: features[];
}

class features {
  limitKey?: SubscriptionPlanLimitKey;
  value?: number;
}