// models/subscription.model.ts

export class Subscription {
  id!: string;
  name!: string;
  isDefault!: boolean;
  priceUsd!: number;
  type!: string;
  subscriptionCategory!: string;
  description?: string[];
  isActive!: boolean;
  order!: number;
  // features?: SubscriptionFeature[];
  // createdAt!: Date;
  // updatedAt!: Date;
}

export class SubscriptionFeature {
  id: string;
  subscriptionId: string;
  featureKey: string;
  featureValue: number;
}
