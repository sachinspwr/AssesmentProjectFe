import { BaseDTO } from "@dto/base.dto"

export interface PermissionResponseDTO extends BaseDTO{
    isPublic: boolean
    name: string
  }
  