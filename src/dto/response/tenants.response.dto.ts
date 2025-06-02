import { User } from "models"
import { AuditResponseDTO } from "./audit-response.dto"

class TenantsResponseDTO extends AuditResponseDTO{
    ownerUserId: string
    subscriptionId: string
    name: string
    slug: string
    domain: string
    status: string
    owner: User
  }
  
  export {TenantsResponseDTO}