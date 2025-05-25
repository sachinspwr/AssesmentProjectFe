import { createMap, forMember, mapFrom, Mapper } from '@automapper/core';
import { UserRequestDTO } from '@dto/request';
import { UserResponseDTO } from '@dto/response';
import { SubscriptionResponseDTO } from '@dto/response/subscription-option-response.dto';
import { UserSubscriptionResponseDTO } from '@dto/response/user-subscription-response.dto';
import { Subscription, User, UserSubscription } from 'models';

export const userProfile = (mapper: Mapper) => {
  createMap(
    mapper,
    UserSubscriptionResponseDTO,
    UserSubscription,
    // Mapping simple fields
    forMember(
      (dest) => dest.id,
      mapFrom((src) => src.id)
    ),
    forMember(
      (dest) => dest.subscriptionId,
      mapFrom((src) => src.subscriptionId)
    ),
    forMember(
      (dest) => dest.userId,
      mapFrom((src) => src.userId)
    ),
    forMember(
      (dest) => dest.startDate,
      mapFrom((src) => src.startDate)
    ),
    forMember(
      (dest) => dest.endDate,
      mapFrom((src) => src.endDate)
    ),
    forMember(
      (dest) => dest.status,
      mapFrom((src) => src.status)
    ),
    // Mapping nested `user` field (mapping UserResponseDTO to User)
    forMember(
      (dest) => dest.user,
      mapFrom((src) => mapper.map(src.user, UserResponseDTO, User))
    ),
    // Mapping nested `subscription` field (mapping SubscriptionResponseDTO to Subscription)
    forMember(
      (dest) => dest.subscription,
      mapFrom((src) => mapper.map(src.subscription, SubscriptionResponseDTO, Subscription))
    ),
    // Mapping nested `userSubscriptionPayment` field
    forMember(
      (dest) => dest.userSubscriptionPayment,
      mapFrom((src) => src.userSubscriptionPayment)
    ),
    // Mapping `userSubscriptionLimit` field, with a fallback for `null` or custom logic if needed
    forMember(
      (dest) => dest.userSubscriptionLimit,
      mapFrom((src) => src.userSubscriptionLimit ?? null) // Defaulting to null if not defined
    ),

  );
  createMap(
    mapper,
    UserResponseDTO,
    User,
    forMember(
      (dest) => dest.id,
      mapFrom((src) => src.id ?? '')
    ),
    forMember(
      (dest) => dest.firstName,
      mapFrom((src) => src.firstName)
    ),
    forMember(
      (dest) => dest.lastName,
      mapFrom((src) => src.lastName)
    ),
    forMember(
      (dest) => dest.fullName,
      mapFrom((src) => `${src.firstName} ${src.lastName}`)
    ),
    forMember(
      (dest) => dest.gender,
      mapFrom((src) => src.gender)
    ),
    forMember(
      (dest) => dest.dateOfBirth,
      mapFrom((src) => src.dateOfBirth)
    ),
    forMember(
      (dest) => dest.email,
      mapFrom((src) => src.email)
    ),
    forMember(
      (dest) => dest.mobile,
      mapFrom((src) => src.mobile)
    ),
    forMember(
      (dest) => dest.company,
      mapFrom((src) => src.company)
    ),
    forMember(
      (dest) => dest.companyRole,
      mapFrom((src) => src.companyRole)
    ),
    forMember(
      (dest) => dest.roles,
      mapFrom((src) => src.roles ?? [])
    ),
    forMember(
      (dest) => dest.permissions,
      mapFrom((src) => src.permissions ?? [])
    ),
    forMember(
      (dest) => dest.subscriptions,
      mapFrom((src) => src.subscriptions ?? [])
    )
  );

  // for user
  createMap(
    mapper,
    User,
    UserRequestDTO,
    forMember(
      (dest) => dest.firstName,
      mapFrom((src) => src.firstName)
    ),
    forMember(
      (dest) => dest.lastName,
      mapFrom((src) => src.lastName)
    ),
    forMember(
      (dest) => dest.email,
      mapFrom((src) => src.email)
    ),
    forMember(
      (dest) => dest.mobile,
      mapFrom((src) => src.mobile)
    ),
    forMember(
      (dest) => dest.company,
      mapFrom((src) => src.company)
    ),
    forMember(
      (dest) => dest.companyRole,
      mapFrom((src) => src.companyRole)
    ),
    forMember(
      (dest) => dest.gender,
      mapFrom((src) => src.gender)
    ),
    forMember(
      (dest) => dest.dateOfBirth,
      mapFrom((src) => src.dateOfBirth)
    ),
    forMember(
      (dest) => dest.tenantId,
      mapFrom((src) => src.tenantId)
    )
  );
  createMap(
    mapper,
    UserResponseDTO,
    User,
    forMember(
      (dest) => dest.firstName,
      mapFrom((src) => src.firstName)
    ),
    forMember(
      (dest) => dest.lastName,
      mapFrom((src) => src.lastName)
    ),
    forMember(
      (dest) => dest.email,
      mapFrom((src) => src.email)
    ),
    forMember(
      (dest) => dest.mobile,
      mapFrom((src) => src.mobile)
    ),
    forMember(
      (dest) => dest.company,
      mapFrom((src) => src.company)
    ),
    forMember(
      (dest) => dest.companyRole,
      mapFrom((src) => src.companyRole)
    ),
    forMember(
      (dest) => dest.gender,
      mapFrom((src) => src.gender)
    ),
    forMember(
      (dest) => dest.dateOfBirth,
      mapFrom((src) => src.dateOfBirth)
    ),
    forMember(
      (dest) => dest.tenantId,
      mapFrom((src) => src.tenantId)
    )
  );
};
