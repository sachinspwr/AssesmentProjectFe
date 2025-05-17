export interface RolesRequestDTO {
    name: string
    isPublic: boolean
    isDefault: boolean
    tenantId: string
    permissionIds: string[]
  }
  