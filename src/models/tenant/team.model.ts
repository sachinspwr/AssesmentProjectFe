import { Audit } from "models/audit.model";

export class Team extends Audit {
    name: string;
    isPublic: boolean;
    areaOfOpration: string;
    description: string;
    tenantId: string;
}
