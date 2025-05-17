
import { TicketCategory, TicketPriority, TicketStatus } from '@utils/enums';
import { AuditRequestDTO } from './audit-request.dto';

 class TicketRequestDTO extends AuditRequestDTO {

  public userId!: string;

  
  public assignedToId?: string;

 
  public subject!: string;

 
  public description!: string;

  
  public priority!: TicketPriority;

  
  public status?: TicketStatus;

 
  public category!: TicketCategory;

  public contactMobile?: string;

  public lastComment?: string;

}

export {TicketRequestDTO}
