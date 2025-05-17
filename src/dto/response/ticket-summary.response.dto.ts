import { TicketResponseDTO } from "./support-ticket-response.dto";
import { UserResponseDTO } from "./user-response.dto";

export interface TicketSummaryResponseDTO {
    summary: {
      totalTickets: number;
      open: number;
      inProgress: number;
      closed: number;
    };
    staffSummary: UserResponseDTO[];
    recentTickets: TicketResponseDTO[];
  }
  