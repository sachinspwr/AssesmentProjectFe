import { User } from "models"
import { AuditRequestDTO } from "./audit-request.dto"

class TenantsRequestDTO extends AuditRequestDTO {
    public owner: User
    public subscriptionId: string
    public name: string
    public slug: string
    public domain: string
    public status: string
  }

  export {TenantsRequestDTO};
  