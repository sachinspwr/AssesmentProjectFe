import { AuditResponseDTO } from './audit-response.dto';
import { UserResponseDTO } from './user-response.dto';

export class ActivityLogResponseDTO extends AuditResponseDTO {

    public ticketId?: string;

    public concernPerson!: string;

    public actionType?: string;

    public description!: string;

    public updatedAt!: string;

    public comment!: string;

    public user?: UserResponseDTO;
}
