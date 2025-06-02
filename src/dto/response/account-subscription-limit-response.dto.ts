export class SubscriptionLimitResponseDTO {
    public id!: string;
    public subscriptionLimit!: SubscriptionLimit;
    public value!: number;
}

export class SubscriptionLimit {
    public id!: string;
    public isPublic!: boolean;
    public createdById!: string;
    public updatedById!: string;
    public pricePerUnit!: number;
    public enterpriseDiscount!: number;
    public individualDiscount!: number;
    public subscriptionId!: string;
    public key!: string;
    public value!: number;
}