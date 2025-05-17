export class SubscriptionPaymentOrdersResponseDTO {
  public id!: string;

  public isPublic!: boolean;

  public orderId!: string;

  public paymentId?: string | null;

  public amount!: number;

  public currency!: string;

  public method?: string | null;

  public description?: string | null;

  public status!: string;

  public subscriptionId!: string;
}
