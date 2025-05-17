import { TestLinkType } from '@utils/enums';
import { AuditRequestDTO } from './audit-request.dto';

class TestLinkAnonymousUserRequetDTO {
  testLinkId!: string;

  email!: string;

  firstName?: string;

  lastName?: string;
}

class TestLinkRequestDTO extends AuditRequestDTO {
  testId!: string;

  testLinkName!: string;

  description?: string;

  link!: string;

  linkType?: TestLinkType = TestLinkType.Private;

  maxAttemptsForLink!: number;

  usageCountLimit!: number;

  expiringOn!: Date;
}

export { TestLinkRequestDTO, TestLinkAnonymousUserRequetDTO };
