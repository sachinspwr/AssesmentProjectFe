// TicketList.tsx
import { useState, useMemo } from 'react';
import { VImage, VSwitch } from '@components/atoms';
import { VLabelledDropdown } from '@components/molecules/index';
import { VTypography } from '@components/molecules/typography/v-typography.mol';
import VTable, { VTableColumn } from '@components/organisms/table/v-table.organism';
import { TicketResponseDTO } from '@dto/response/support-ticket-response.dto';
import { getFullName } from '@utils/functions';
import { AiOutlineEye } from 'react-icons/ai';
import { TicketStatus } from '@utils/enums/ticket-status.enum';

const TICKET_STATUS_OPTIONS = [
  { value: 'all', label: 'All Statuses' },
  ...Object.values(TicketStatus).map(status => ({
    value: status,
    label: status,
  }))
];

type TicketListProps = {
  tickets: TicketResponseDTO[];
  isLoading: boolean;
  onViewActivity: (ticket: TicketResponseDTO) => void;
};

function TicketList({
  tickets = [],
  isLoading,
  onViewActivity,
}: TicketListProps) {
  const [selectedTicketStatus, setSelectedTicketStatus] = useState<string>('all');
  const [showOpenTickets, setShowOpenTickets] = useState(false);
  const [showResolvedTickets, setShowResolvedTickets] = useState(false);

  const filteredTickets = useMemo(() => {
    if (!tickets.length) return [];

    let result = [...tickets];

    // Apply status dropdown filter first
    if (selectedTicketStatus !== 'all') {
      result = result.filter(ticket => ticket.status === selectedTicketStatus);
    }

    // Then apply switch filters if any are active
    if (showOpenTickets || showResolvedTickets) {
      const statuses: TicketStatus[] = [];
      if (showOpenTickets) statuses.push(TicketStatus.Open);
      if (showResolvedTickets) statuses.push(TicketStatus.Resolved);
      result = result.filter(ticket => statuses.includes(ticket.status));
    }

    return result;
  }, [tickets, selectedTicketStatus, showOpenTickets, showResolvedTickets]);

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'critical':
        return 'text-theme-negative';
      case 'high':
        return 'text-theme-negative opacity-60';
      case 'medium':
        return 'text-theme-warning';
      case 'low':
        return 'text-theme-positive';
      default:
        return 'text-theme-secondary';
    }
  };

  const handleTicketStatusFilterChange = (statusValue: string | string[]) => {
    const newStatus = Array.isArray(statusValue) ? statusValue[0] || 'all' : statusValue;
    setSelectedTicketStatus(newStatus);

    // Reset both switches when selecting any status
    setShowOpenTickets(false);
    setShowResolvedTickets(false);

    // Only auto-set switches for specific statuses
    if (newStatus === TicketStatus.Open) {
      setShowOpenTickets(true);
    } else if (newStatus === TicketStatus.Resolved) {
      setShowResolvedTickets(true);
    }
  };

  const handleTicketVisibilityToggle = (statusType: 'open' | 'resolved') => {
    if (statusType === 'open') {
      const newValue = !showOpenTickets;
      setShowOpenTickets(newValue);
      if (newValue) {
        setShowResolvedTickets(false);
        setSelectedTicketStatus(TicketStatus.Open);
      } else {
        setSelectedTicketStatus('all');
      }
    } else {
      const newValue = !showResolvedTickets;
      setShowResolvedTickets(newValue);
      if (newValue) {
        setShowOpenTickets(false);
        setSelectedTicketStatus(TicketStatus.Resolved);
      } else {
        setSelectedTicketStatus('all');
      }
    }
  };

  const columns: VTableColumn<TicketResponseDTO>[] = [
    {
      key: 'incidentId',
      label: 'Ticket ID',
      sortable: true,
    },
    {
      key: 'subject',
      label: 'Subject',
      sortable: true,
    },
    {
      key: 'priority',
      label: 'Priority',
      sortable: true,
      customRender: (row) => <span className={getPriorityColor(row.priority)}>{row.priority}</span>,
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
    },
    {
      key: 'assignedToId',
      label: 'Assignee',
      customRender: (row) => (row.assignedTo ? getFullName(row.assignedTo) : 'Unassigned'),
      sortable: true,
    },
    {
      key: 'createdBy',
      label: 'View Logs',
      customRender: (row) => (
        <div className="ml-8 cursor-pointer hover:text-theme-primary" onClick={() => onViewActivity(row)}>
          <AiOutlineEye size={20} />
        </div>
      ),
    },
  ];

  const hasNoTickets = !isLoading && tickets.length === 0;
  const hasNoMatches = !isLoading && tickets.length > 0 && filteredTickets.length === 0;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-8 items-center">
        <div className="w-1/4">
          <VLabelledDropdown
            options={TICKET_STATUS_OPTIONS}
            value={selectedTicketStatus}
            onChange={handleTicketStatusFilterChange}
            placeholder="Select Status"
            name="status"
            label="Select Status"
          />
        </div>
        <VSwitch
          label="Open"
          className="mt-8"
          checked={showOpenTickets}
          onChange={() => handleTicketVisibilityToggle('open')}
        />
        <VSwitch
          label="Resolved"
          className="mt-8"
          checked={showResolvedTickets}
          onChange={() => handleTicketVisibilityToggle('resolved')}
        />
      </div>

      {hasNoTickets ? (
        <div className="mt-4 flex-1 flex flex-col items-center justify-center">
          <VImage src="../../src/assets/svgs/no-tickets.svg" className="max-w-96 h-auto" />
          <VTypography className="my-8" as="h5">
            No incidents found — feel free to open a new ticket.
          </VTypography>
        </div>
      ) : (
        <VTable
          title={`Total Incidents (${filteredTickets.length})`}
          data={filteredTickets}
          columns={columns}
          emptyState={
            hasNoMatches ? (
              <div>
                <VTypography as="p" className="text-theme-secondary">
                  No tickets match the current filters
                </VTypography>
              </div>
            ) : undefined
          }
          loading={isLoading}
          itemsPerviewMode={6}
        />
      )}
    </div>
  );
}

export { TicketList };