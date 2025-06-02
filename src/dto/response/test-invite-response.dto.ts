
export class TestInvitationResponseDto {
    public maxAttempts: number;

    public maxUsages: number;

    public id: string;

    public createdById: string;

    public updatedById: string;

    public testId: string;

    public name: string;

    public description: string;

    public token: string;

    public activeFrom: string;

    public activeUntil: string;

    public timeZone: string;

    public status: string;

    public isActive: boolean;

    public visibility: string;

    public invitations: InvitationResponseDto[];
}

export class InvitationResponseDto {
    message: string;
    rejectionReason: string;
    acceptedAt: string | null;
    rejectedAt: string | null;
    id: string;
    email: string;
    status: 'Pending' | 'Accepted' | 'Rejected'; // or string if there are more statuses
    testLinkId: string;
    reminderSentAt: string ;
    testLink: string; // or specify the type if testLink can have a value
}