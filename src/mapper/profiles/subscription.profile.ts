import { createMap, forMember, mapFrom, Mapper } from '@automapper/core';
import {
  SubscriptionFeatureResponseDTO,
  SubscriptionResponseDTO,
} from '@dto/response/subscription-option-response.dto';
import { SubscriptionLimitResponseDTO } from '@dto/response/subscription/subscription-limit-response.dto';
import { Subscription, SubscriptionFeature } from 'models/subscription';
import { SubscriptionLimit } from 'models/subscription/subscription-limit-model';

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
    SubscriptionLimitResponseDTO,
    SubscriptionLimit,

    forMember(
      (dest) => dest.id,
      mapFrom((src) => src.id)
    ),
    forMember(
      (dest) => dest.isPublic,
      mapFrom((src) => src.isPublic)
    ),
    forMember(
      (dest) => dest.createdById,
      mapFrom((src) => src.createdById)
    ),
    forMember(
      (dest) => dest.updatedById,
      mapFrom((src) => src.updatedById)
    ),
    forMember(
      (dest) => dest.pricePerUnit,
      mapFrom((src) => src.pricePerUnit)
    ),
    forMember(
      (dest) => dest.enterpriseDiscount,
      mapFrom((src) => src.enterpriseDiscount)
    ),
    forMember(
      (dest) => dest.individualDiscount,
      mapFrom((src) => src.individualDiscount)
    ),
    forMember(
      (dest) => dest.subscriptionId,
      mapFrom((src) => src.subscriptionId)
    ),
    forMember(
      (dest) => dest.key,
      mapFrom((src) => src.key)
    ),
    forMember(
      (dest) => dest.value,
      mapFrom((src) => src.value)
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
};
