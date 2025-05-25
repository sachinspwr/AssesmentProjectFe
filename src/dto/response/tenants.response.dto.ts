import { AuditResponseDTO } from "./audit-response.dto"

class TenantsResponseDTO extends AuditResponseDTO{
    ownerUserId: string
    subscriptionId: string
    name: string
    slug: string
    email: string
    status: string
  }
  
  export {TenantsResponseDTO}