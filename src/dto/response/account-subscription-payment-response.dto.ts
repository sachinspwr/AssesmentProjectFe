export class SubscriptionPaymentResponseDTO {
    public id: string;
    public accountSubscriptionId: string;
    public accountId: string;
    public status: string;
    public subscriptionId: string;
    public subscriptionPaymentOrder: SubscriptionPaymentOrderDTO;
}

export class SubscriptionPaymentOrderDTO {
    public isPublic: boolean;
    public createdById: string;
    public updatedById: string;
    public id: string;
    public orderId: string;
    public subscriptionId: string;
    public paymentId: string;
    public amount: string;
    public currency: string;
    public method: string;
    public description: string;
    public status: string;
    public paymentModeMasterId: string;
    public features: SubscriptionFeatureDTO[];
    public orderValidationTokan: string;
}

export class SubscriptionFeatureDTO {
    public value: number;
    public limitKey: string;
}