class SubscriptionResponseDTO {
  public id!: string;

  public name!: string;

  public priceUsd!: number;

  public description?: string[];

  subscriptionFeature?: SubscriptionFeatureResponseDTO[];

  public isActive!: boolean;

  public createdAt!: Date;

  public updatedAt!: Date;
}

export { SubscriptionResponseDTO };

class SubscriptionFeatureResponseDTO {
  public id!: string;

  public subscriptionId!: string;

  public featureKey!: string;

  public featureValue!: number;
}

export { SubscriptionFeatureResponseDTO };
