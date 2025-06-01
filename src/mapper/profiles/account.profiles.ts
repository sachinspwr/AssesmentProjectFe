import { Mapper, createMap, forMember, mapFrom } from '@automapper/core';
import { UserResponseDTO } from '@dto/response';
import { AccountResponseDTO } from '@dto/response/account/account-response.dto';
import { AccountSubscriptionLimitResponseDTO } from '@dto/response/account/account-subscription-limit-response.dto';
import { AccountSubscriptionOrderResponseDTO } from '@dto/response/account/account-subscription-order.response.dto';
import { AccountSubscriptionPaymentResponseDTO } from '@dto/response/account/account-subscription-payment.model';
import { AccountSubscriptionResponseDTO } from '@dto/response/account/account-subscription-response.dto';
import { SubscriptionResponseDTO } from '@dto/response/subscription-option-response.dto';
import { SubscriptionLimitResponseDTO } from '@dto/response/subscription/subscription-limit-response.dto';
import { TenantResponseDTO } from '@dto/response/tenant.response.dto';
import { User } from 'models';
import { AccountSubscriptionOrderModel } from 'models/account';
import { AccountSubscriptionLimit } from 'models/account/account-subscription-limit.model';
import { AccountSubscriptionPayment } from 'models/account/account-subscription-sub-payment.model';
import { AccountSubscription } from 'models/account/account-subscription.model';
import { Account } from 'models/account/account.model';
import { Subscription } from 'models/subscription';
import { SubscriptionLimit } from 'models/subscription/subscription-limit-model';
import { Tenant } from 'models/tenant/tenant.model';

export const accountProfile = (mapper: Mapper) => {
  createMap(
    mapper,
    AccountResponseDTO,
    Account,
    forMember(
      (dest) => dest.createdById,
      mapFrom((src) => src.createdById)
    ),
    forMember(
      (dest) => dest.updatedById,
      mapFrom((src) => src.updatedById)
    ),
    forMember(
      (dest) => dest.id,
      mapFrom((src) => src.id)
    ),
    forMember(
      (dest) => dest.isPublic,
      mapFrom((src) => src.isPublic)
    ),
    forMember(
      (dest) => dest.user,
      mapFrom((src) => mapper.map(src.user, UserResponseDTO, User))
    ),
    forMember(
      (dest) => dest.tenant,
      mapFrom((src) => (src.tenant ? mapper.map(src.tenant, TenantResponseDTO, Tenant) : null))
    )
  );

  createMap(
    mapper,
    AccountSubscriptionOrderResponseDTO,
    AccountSubscriptionOrderModel,
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
    )
  );

  createMap(
    mapper,
    AccountSubscriptionLimitResponseDTO,
    AccountSubscriptionLimit,

    forMember(
      (dest) => dest.id,
      mapFrom((src) => src.id)
    ),
    forMember(
      (dest) => dest.value,
      mapFrom((src) => src.value)
    ),
    forMember(
      (dest) => dest.subscriptionLimit,
      mapFrom((src) => mapper.map(src.subscriptionLimit, SubscriptionLimitResponseDTO, SubscriptionLimit))
    )
  );

  createMap(
    mapper,
    AccountSubscriptionPaymentResponseDTO,
    AccountSubscriptionPayment,
    forMember(
      (dest) => dest.id,
      mapFrom((src) => src.id)
    ),
    forMember(
      (dest) => dest.accountSubscriptionId,
      mapFrom((src) => src.accountSubscriptionId)
    ),
    forMember(
      (dest) => dest.accountId,
      mapFrom((src) => src.accountId)
    ),
    forMember(
      (dest) => dest.status,
      mapFrom((src) => src.status)
    ),
    forMember(
      (dest) => dest.subscriptionId,
      mapFrom((src) => src.subscriptionId)
    ),
    forMember(
      (dest) => dest.subscriptionPaymentOrderId,
      mapFrom((src) => src.subscriptionPaymentOrderId)
    ),
    forMember(
      (dest) => dest.subscriptionPaymentOrder,
      mapFrom((src) =>
        src.subscriptionPaymentOrder
          ? mapper.map(src.subscriptionPaymentOrder, AccountSubscriptionOrderResponseDTO, AccountSubscriptionOrderModel)
          : undefined
      )
    )
  );

  createMap(
    mapper,
    AccountSubscriptionResponseDTO,
    AccountSubscription,

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
      (dest) => dest.accountId,
      mapFrom((src) => src.accountId)
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
    forMember(
      (dest) => dest.isPrimary,
      mapFrom((src) => src.isPrimary)
    ),

    // Mapping nested `account` field
    forMember(
      (dest) => dest.account,
      mapFrom((src) => mapper.map(src.account, AccountResponseDTO, Account))
    ),

    // Mapping nested `subscription` field
    forMember(
      (dest) => dest.subscription,
      mapFrom((src) => mapper.map(src.subscription, SubscriptionResponseDTO, Subscription))
    ),

    // Mapping nested `accountSubscriptionPayment` field
    forMember(
      (dest) => dest.accountSubscriptionPayment,
      mapFrom((src) =>
        src.accountSubscriptionPayment
          ? mapper.map(
              src.accountSubscriptionPayment,
              AccountSubscriptionPaymentResponseDTO,
              AccountSubscriptionPayment
            )
          : null
      )
    ),

    // Mapping nested array `accountSubscriptionLimit`
    forMember(
      (dest) => dest.accountSubscriptionLimit,
      mapFrom((src) =>
        src.accountSubscriptionLimit
          ? mapper.mapArray(src.accountSubscriptionLimit, AccountSubscriptionLimitResponseDTO, AccountSubscriptionLimit)
          : []
      )
    )
  );
};
