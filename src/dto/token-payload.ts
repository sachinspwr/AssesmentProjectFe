import { TestLinkType } from '@utils/enums';

class TokenPayload {
  id!: string;
  testId?: string;
  testLinkId?: string;
  link?: string;
  linkType?: TestLinkType;
  anonymousUserId?: string;
  firstName!: string;
  lastName!: string;
  name?: string;
  exp!: number;
}

export { TokenPayload };
