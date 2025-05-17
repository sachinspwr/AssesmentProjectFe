export type SubscriptionPlanResponseDTO = SubscriptionPlan[]

export interface SubscriptionPlan {
  id: string
  name: string
  priceUsd: number
  description: string
  isActive: boolean
  subscriptionFeature: SubscriptionFeature[]
}

export interface SubscriptionFeature {
  id: string
  subscriptionId: string
  featureKey: string
  featureValue: number
}
