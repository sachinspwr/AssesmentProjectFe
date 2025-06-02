import { TestLinkType } from "@utils/enums/test-link-type.enums";

export interface CreateTestLinkResponseDTO {
  id: string;
  testId: string;
  createdById: string;
  updatedById: string;
  name: string;
  description: string;
  token: string;
  url: string;
  activeFrom: string;
  activeUntil: string;
  timeZone: string;
  visibility: TestLinkType
  status: string;
  isActive: boolean;
  maxAttempts: number;
  maxUsages: number;
}
