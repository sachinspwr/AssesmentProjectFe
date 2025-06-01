import { BaseDTO } from "@dto/base.dto"

export interface TestReviewResponseDTO extends BaseDTO{
    createdById: string
    updatedById: string
    reviewerId: string
    isPublic: boolean
    testId: string
    comment: string
    status: string
  }
  