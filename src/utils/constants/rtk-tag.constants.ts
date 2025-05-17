import { Tag } from "types/tag-type";

export const USER_SUBSCRIPTION_TAG = 'UserSubscriptions' as const;
export const PAYMENTS_TAG = 'Payments' as const;

export type SubscriptionTag = Tag<typeof USER_SUBSCRIPTION_TAG>;
export type PaymentTag = Tag<typeof PAYMENTS_TAG>;

