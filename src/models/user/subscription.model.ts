// models/subscription.model.ts

export class Subscription {
  id!: string;
  name!: string;
  priceUsd!: number;
  description?: string[];
  features?: SubscriptionFeature[];
  isActive!: boolean;
  createdAt!: Date;
  updatedAt!: Date;
}

export class SubscriptionFeature {
  id: string;
  subscriptionId: string;
  featureKey: string;
  featureValue: number;
}
