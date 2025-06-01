import { SubscriptionLimitResponseDTO } from "../subscription/subscription-limit-response.dto";

export class AccountSubscriptionLimitResponseDTO {
  id: string;
  subscriptionLimit: SubscriptionLimitResponseDTO;
  value: number;
}
