import { PaymentStatus } from "@utils/enums/payment-status.enum";
import { AuditResponseDTO } from "./audit-response.dto";
import { SubscriptionResponseDTO } from "./subscription-option-response.dto";

export class UserSubscriptionOrderResponseDTO extends AuditResponseDTO {
  orderId: string;
  subscriptionId: string;
  subscription: SubscriptionResponseDTO;
  paymentId?: string | null;
  amount: string;
  currency: string;
  method?: string | null;
  description?: string | null;
  status: PaymentStatus;
  paymentModeMasterId: string;
}
