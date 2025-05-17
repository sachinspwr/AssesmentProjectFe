import { AuditResponseDTO } from './audit-response.dto';
import { TestResultResponseDTO } from './test-result-response.dto';
import { TestResponseDTO } from './test-response.dto';
import { TestLinkType } from '@utils/enums';
import { BaseDTO } from '@dto/base.dto';

class TestLinkAnonymousUserResponseDTO extends BaseDTO {
  testLinkId!: string;

  email!: string;

  firstName?: string;

  lastName?: string;
}

class TestLinkResponseDTO extends AuditResponseDTO {
  testId!: string;

  testLinkName!: string;

  description?: string;

  link!: string;

  linkType?: TestLinkType = TestLinkType.Private;

  maxAttemptsForLink: number = 1;

  usageCountLimit: number = 1;

  expiringOn!: Date;

  testResults!: TestResultResponseDTO;

  testLinkAnonymousUsers!: TestLinkAnonymousUserResponseDTO[];

  test!: TestResponseDTO;
}

export { TestLinkResponseDTO, TestLinkAnonymousUserResponseDTO };
