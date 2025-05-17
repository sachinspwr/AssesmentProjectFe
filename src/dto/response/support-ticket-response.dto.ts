import { TicketCategory, TicketPriority, TicketStatus } from '@utils/enums';
import { AuditResponseDTO } from './audit-response.dto';
import { UserResponseDTO } from './user-response.dto';

export class TicketResponseDTO extends AuditResponseDTO {
    public incidentId?: string;

    public userId?: string;

    public assignedToId?: string;

    public subject!: string;

    public description?: string;

    public priority!: TicketPriority;

    public status!: TicketStatus;

    public category?: TicketCategory;

    public comment?: string;

    closedAt?: Date;

    assignedTo?: UserResponseDTO;

    contactMobile?: string;
}