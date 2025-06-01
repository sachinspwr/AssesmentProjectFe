import { createMap, forMember, mapFrom, Mapper } from '@automapper/core';
import { UserRequestDTO } from '@dto/request';
import { UserResponseDTO } from '@dto/response';
import { User } from 'models';

export const userProfile = (mapper: Mapper) => {
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
      mapFrom((src) => src.role ?? [])
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
