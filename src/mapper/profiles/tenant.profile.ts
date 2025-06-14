import { createMap, forMember, mapFrom, Mapper } from '@automapper/core';
import { Tenant } from 'models/tenant/tenant.model';
import { BasicTenantDetailsRequestDTO } from '@dto/request/basic-tenant-details.dto';
import { TenantsResponseDTO } from '@dto/response/tenants.response.dto';
import { Team } from 'models/tenant/team.model';
import { TenantTeamRequestDTO } from '@dto/request/tenant-team-request.dto';
import { TenantTeamResponseDTO } from '@dto/response/tenent-team-response.dto';
import { TenantResponseDTO } from '@dto/response/tenant.response.dto';

export const tenantProfile = (mapper: Mapper) => {
  createMap(
    mapper,
    TenantResponseDTO,
    Tenant,
    forMember(
      (dest) => dest.ownerUserId,
      mapFrom((src) => src.ownerUserId)
    ),
    forMember(
      (dest) => dest.subscriptionId,
      mapFrom((src) => src.subscriptionId)
    ),
    forMember(
      (dest) => dest.id,
      mapFrom((src) => src.id)
    ),
    forMember(
      (dest) => dest.name,
      mapFrom((src) => src.name)
    ),
    forMember(
      (dest) => dest.slug,
      mapFrom((src) => src.slug)
    ),
    forMember(
      (dest) => dest.domain,
      mapFrom((src) => src.email)
    ),
    forMember(
      (dest) => dest.status,
      mapFrom((src) => src.status)
    )
  );

  // tenant  mapping
  createMap(
    mapper,
    Tenant,
    BasicTenantDetailsRequestDTO,
    forMember(
      (dest) => dest.name,
      mapFrom((src) => src.name)
    ),
    forMember(
      (dest) => dest.slug,
      mapFrom((src) => src.slug)
    ),
    forMember(
      (dest) => dest.domain,
      mapFrom((src) => src.domain)
    ),
    forMember(
      (dest) => dest.subscriptionId,
      mapFrom((src) => src.subscriptionId)
    ),
    forMember(
      (dest) => dest.status,
      mapFrom((src) => src.status)
    ),
    forMember(
      (dest) => dest.owner,
      mapFrom((src) => src.owner)
    )
  );

  createMap(
    mapper,
    TenantsResponseDTO,
    Tenant,
    forMember(
      (dest) => dest.id,
      mapFrom((src) => src.id)
    ),
    forMember(
      (dest) => dest.name,
      mapFrom((src) => src.name)
    ),
    forMember(
      (dest) => dest.slug,
      mapFrom((src) => src.slug)
    ),
    forMember(
      (dest) => dest.domain,
      mapFrom((src) => src.domain)
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
      (dest) => dest.ownerUserId,
      mapFrom((src) => src.ownerUserId)
    ),
    forMember(
      (dest) => dest.owner,
      mapFrom((src) => src.owner)
    )
  );

  // Tenant Team Mapper
  createMap(
    mapper,
    Team,
    TenantTeamRequestDTO,
    forMember(
      (dest) => dest.name,
      mapFrom((src) => src.name)
    ),
    forMember(
      (dest) => dest.areaOfOpration,
      mapFrom((src) => src.areaOfOpration)
    ),
    forMember(
      (dest) => dest.isPublic,
      mapFrom((src) => src.isPublic)
    ),
    forMember(
      (dest) => dest.description,
      mapFrom((src) => src.description)
    ),
    forMember(
      (dest) => dest.tenantId,
      mapFrom((src) => src.tenantId)
    )
  );

  createMap(
    mapper,
    TenantTeamResponseDTO,
    Team,
    forMember(
      (dest) => dest.name,
      mapFrom((src) => src.name)
    ),
    forMember(
      (dest) => dest.areaOfOpration,
      mapFrom((src) => src.areaOfOpration)
    ),
    forMember(
      (dest) => dest.isPublic,
      mapFrom((src) => src.isPublic)
    ),
    forMember(
      (dest) => dest.description,
      mapFrom((src) => src.description)
    ),
    forMember(
      (dest) => dest.tenantId,
      mapFrom((src) => src.tenantId)
    )
  );
};
