export class LinkRegistrationResponseDto {
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

    public linkRegistrations: LinkRegistrationUserResponseDto[];
}

export class LinkRegistrationUserResponseDto {
    id?: string;

    testLinkId?: string;

    email!: string;

    firstName!: string;

    lastName!: string;

    status!: RegistrationStatus;

    registeredAt?: Date;
}

export enum RegistrationStatus {
    Pending = 'Pending',
    Registered = 'Registered',
    Cancelled = 'Cancelled',
    Expired = 'Expired',
}