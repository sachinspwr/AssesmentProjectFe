import { User } from "models"
import { AuditRequestDTO } from "./audit-request.dto"

class TenantsRequestDTO extends AuditRequestDTO {
    public user: User
    public subscriptionId: string
    public name: string
    public slug: string
    public email: string
    public status: string
  }

  export {TenantsRequestDTO};
  