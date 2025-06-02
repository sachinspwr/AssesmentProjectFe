import { RestrictionType } from "@dto/response/get-test-link-invitation-response.dto";
import { TestLinkType } from "@utils/enums/test-link-type.enums";


export interface TestSetting {
  testSettingOptionId: string;
  overrideValue: string;
}

export interface CreateTestLinkRequestDTO {
  id?: string;
  name?: string;
  description?: string;
  visibility?: TestLinkType; // adjust enum if needed
  maxAttempts?: number;
  maxUsages?: number;
  activeFrom?: string;  // ISO Date string
  activeUntil?: string; // ISO Date string
  timeZone?: string;
  restrictions?: LinkRestrictionRuleRequestDTO[];
  settings?: TestSetting[];
  registrationfields?:string[];
}

export class LinkRestrictionRuleRequestDTO {
  testLinkId?: string;
 
  type!: RestrictionType;
 
  value!: string;
 
  isActive!: boolean;
}