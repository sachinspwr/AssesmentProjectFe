export interface TestInvitationRequestDTO {
  testLinkId: string;
  testId: string;
  email: string;
  message: string;
  status: string;
  isPersonal: boolean;
  testLink: TestLink;
}

export interface TestLink {
  activeFrom: string;
  activeUntil: string;
  timeZone: string;
}
