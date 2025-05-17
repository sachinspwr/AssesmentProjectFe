import { User, UserSubscription } from "models";

export class Business {
    company: string;
    address: string;
    zip: string;
    city: string;
    country: string;
};

export class InvoiceResponseDTO {
    public invoiceNumber?: string;
    public business?: Business;
    public user?: User;
    public userSubscription?: UserSubscription;
}