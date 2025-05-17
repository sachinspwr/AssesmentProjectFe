import { DomainRole, Industry } from "models";

export class Domain {
    name!: string;
    description?: string;

    industryId!: string;
    industry!: Industry;
    
    domainRoles?:DomainRole[]
}