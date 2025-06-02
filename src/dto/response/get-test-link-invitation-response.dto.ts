import { TestLinkType } from "@utils/enums";
import { LinkRegistrationUserResponseDto } from "./link-registration-response.dto";

export interface GetTestInvitationResponseDTO {
  id: string;
  testId: string;
  name: string;
  description: string;
  token: string;
  activeFrom: string;
  activeUntil: string;
  timeZone: string;
  maxAttempts: number;
  maxUsages: number;
  createdById: string;
  updatedById: string;
  isActive: boolean;
  visibility: TestLinkType; // Extend as needed
  status: 'Active' | 'Inactive'; // Adjust according to backend types
  restrictions?: LinkRestrictionRuleResponseDTO[];
  url: string;
  linkRegistrations?: LinkRegistrationUserResponseDto[]; // Assuming this is an array of strings, adjust as needed
}

export class LinkRestrictionRuleResponseDTO {
  public id: string;

  testLinkId?: string;

  type!: RestrictionType;

  value!: string;

  isActive: boolean;
}

export class RestrictionType {
  DOMAIN = 'DOMAIN';
  EMAIL = 'EMAIL';
  IP = 'IP';
}