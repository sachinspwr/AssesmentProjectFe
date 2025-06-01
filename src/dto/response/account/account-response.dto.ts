import { TenantResponseDTO } from "../tenant.response.dto";
import { UserResponseDTO } from "../user-response.dto";

export class AccountResponseDTO {
  createdById: string;
  updatedById: string;
  id: string;
  isPublic: boolean;
  user: UserResponseDTO;
  tenant: TenantResponseDTO | null; // Define if needed
}
