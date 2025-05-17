import { Domain } from "models";

export class DomainRole {
    name!: string;
    description?: string;
    
    domainId!: string;
    public domain!: Domain;
}