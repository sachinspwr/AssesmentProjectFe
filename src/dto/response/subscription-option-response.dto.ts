class SubscriptionResponseDTO {
  public id!: string;

  public name!: string;

  public isDefault!: boolean;

  public priceUsd!: number;

  public type!: string;

  public subscriptionCategory!: string;

  public description?: string[];

  public isActive!: boolean;

  public order!: number;

  // subscriptionFeature?: SubscriptionFeatureResponseDTO[];

  // public createdAt!: Date;

  // public updatedAt!: Date;
}

export { SubscriptionResponseDTO };

class SubscriptionFeatureResponseDTO {
  public id!: string;

  public subscriptionId!: string;

  public featureKey!: string;

  public featureValue!: number;
}

export { SubscriptionFeatureResponseDTO };
