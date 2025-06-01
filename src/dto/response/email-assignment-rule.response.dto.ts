import { BaseDTO } from "@dto/base.dto"

export interface EmailAssignmentRuleResponseDTO extends BaseDTO{
    isPublic: boolean
    key: string
    value: string
    category: string
  }
  