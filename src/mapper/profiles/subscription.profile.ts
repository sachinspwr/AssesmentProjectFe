import { createMap, forMember, mapFrom, Mapper } from '@automapper/core';
import {
  SubscriptionFeatureResponseDTO,
  SubscriptionResponseDTO,
} from '@dto/response/subscription-option-response.dto';
import { UserSubscriptionOrderResponseDTO } from '@dto/response/user-subscription-order.response.dto';
import { Subscription, SubscriptionFeature, UserSubscriptionOrderModel } from 'models';

export const subscriptionProfile = (mapper: Mapper) => {
  createMap(
    mapper,
    SubscriptionFeatureResponseDTO,
    SubscriptionFeature,
    // Mapping fields for SubscriptionFeature
    forMember(
      (dest) => dest.id,
      mapFrom((src) => src.id)
    ),
    forMember(
      (dest) => dest.subscriptionId,
      mapFrom((src) => src.subscriptionId)
    ),
    forMember(
      (dest) => dest.featureKey,
      mapFrom((src) => src.featureKey)
    ),
    forMember(
      (dest) => dest.featureValue,
      mapFrom((src) => src.featureValue)
    )
  );

  createMap(
    mapper,
    SubscriptionResponseDTO,
    Subscription,
    // Mapping simple fields
    forMember(
      (dest) => dest.id,
      mapFrom((src) => src.id)
    ),
    forMember(
      (dest) => dest.name,
      mapFrom((src) => src.name)
    ),
    forMember(
      (dest) => dest.priceUsd,
      mapFrom((src) => src.priceUsd)
    ),
    forMember(
      (dest) => dest.description,
      mapFrom((src) => src.description)
    ),
    forMember(
      (dest) => dest.isActive,
      mapFrom((src) => src.isActive)
    ),
    forMember(
      (dest) => dest.createdAt,
      mapFrom((src) => src.createdAt)
    ),
    forMember(
      (dest) => dest.updatedAt,
      mapFrom((src) => src.updatedAt)
    ),
    // Mapping subscription features (nested array of SubscriptionFeatureResponseDTO)
    forMember(
      (dest) => dest.features,
      mapFrom((src) =>
        src.subscriptionFeature
          ? src.subscriptionFeature.map((feature: SubscriptionFeatureResponseDTO) =>
              mapper.map(feature, SubscriptionFeatureResponseDTO, SubscriptionFeature)
            )
          : []
      )
    )
  );

  createMap(
    mapper,
    UserSubscriptionOrderResponseDTO,
    UserSubscriptionOrderModel,
    forMember(
      (dest) => dest.orderId,
      mapFrom((src) => src.orderId)
    ),
    forMember(
      (dest) => dest.subscriptionId,
      mapFrom((src) => src.subscriptionId)
    ),
    forMember(
      (dest) => dest.paymentId,
      mapFrom((src) => src.paymentId)
    ),
    forMember(
      (dest) => dest.amount,
      mapFrom((src) => src.amount)
    ),
    forMember(
      (dest) => dest.currency,
      mapFrom((src) => src.currency)
    ),
    forMember(
      (dest) => dest.method,
      mapFrom((src) => src.method)
    ),
    forMember(
      (dest) => dest.description,
      mapFrom((src) => src.description)
    ),
    forMember(
      (dest) => dest.status,
      mapFrom((src) => src.status)
    ),
    forMember(
      (dest) => dest.paymentModeMasterId,
      mapFrom((src) => src.paymentModeMasterId)
    ),
    forMember(
      (dest) => dest.createdAt,
      mapFrom((src) => src.createdAt)
    ),
    forMember(
      (dest) => dest.subscription,
      mapFrom((src) => src.subscription)
    )
  );
  
};
