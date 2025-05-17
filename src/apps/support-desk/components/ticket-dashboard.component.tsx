import { VButton } from '@components/atoms';
import React, { useState } from 'react';
import { VLoader, VSummaryCard } from '@components/molecules/index';
import { VModal } from '@components/organisms';
import TicketForm from '@components/organisms/support/tickets-form.organism';
import { TicketList } from '@components/organisms/support/tickets-list.organism';
import { VTypography } from '@components/molecules/typography/v-typography.mol';

import {
  FaHourglassHalf, // For "In Progress"
  FaCheckCircle, // For "Resolved"
  FaBoxOpen, // Optional for trends
} from 'react-icons/fa';
import { TbSum } from 'react-icons/tb';
import { TicketResponseDTO } from '@dto/response/support-ticket-response.dto';
import { ActivityLogs } from '@components/organisms/support/activity-logs.organism';
import { defaultFormatDtTm, getFullName } from '@utils/functions';
import { useFetchTicketSummaryQuery } from 'store/slices/support.slice';

function SupportDashboard() {
  const [isCreateTicketModalOpen, setIsCreateTicketModalOpen] = useState(false);
  const [currentlyViewedTicket, setCurrentlyViewedTicket] = useState<TicketResponseDTO | null>(null);
  const { data: summaryData, isLoading: isFetching, refetch: refetchSummary } = useFetchTicketSummaryQuery();

  const toggleCreateTicketModal = () => {
    setIsCreateTicketModalOpen((prev) => !prev);
  };

  const handleViewTicketActivity = (ticket: TicketResponseDTO) => {
    setCurrentlyViewedTicket(ticket);
    refetchSummary();
  };

  const handleReturnToTicketList = () => {
    setCurrentlyViewedTicket(null);
    refetchSummary();
  };

  const {
    summary: ticketSummary = { totalTickets: 0, open: 0, inProgress: 0, closed: 0 },
    recentTickets = []
  } = summaryData ?? {};

  const renderTicketListContent = () => {
    return <TicketList tickets={recentTickets} isLoading={false} onViewActivity={handleViewTicketActivity} />;
  };

  if (isFetching) {
    return (
      <div className="flex justify-center items-center h-full">
        <VLoader />
      </div>
    );
  }

  const renderTicketActivityView = () => {
    if (!currentlyViewedTicket) return null;

    const {
      id,
      incidentId,
      createdBy,
      status,
      subject,
      creationAt,
      assignedTo,
      description,
    } = currentlyViewedTicket;

    return (
      <ActivityLogs
        incidentId={incidentId}
        ticketId={id}
        status={status}
        createdBy={getFullName(createdBy)}
        subject={subject}
        onBackClick={handleReturnToTicketList}
        createdDate={defaultFormatDtTm(creationAt) ?? "Invalid Date"}
        assignedTo={getFullName(assignedTo)}
        description={description}
        allowUpdate
      />
    );
  };

  return currentlyViewedTicket ? (
    renderTicketActivityView()
  ) : (
    <>
      {/* Dashboard Header */}
      <div className="flex justify-between items-center mb-6">
        <VTypography as="h3" className="text-2xl font-semibold">
          Support Dashboard
        </VTypography>
        <VButton onClick={toggleCreateTicketModal} className="!w-56">
          Create Ticket
        </VButton>
      </div>

      <hr className="mt-4 mb-4 border-theme-default"></hr>

      {/* Status Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        <VSummaryCard
          title="Open Tickets"
          value={ticketSummary.open}
          icon={FaBoxOpen}
          variant="warning"
          helperText="Unresolved issues"
        />

        <VSummaryCard
          title="In Progress"
          value={ticketSummary.inProgress}
          icon={FaHourglassHalf}
          variant="primary"

          helperText="Active work items"
        />

        <VSummaryCard
          title="Resolved"
          value={ticketSummary.closed}
          icon={FaCheckCircle}
          variant="positive"
          helperText="Completed this period"
        />

        <VSummaryCard
          title="Total Tickets"
          value={ticketSummary.totalTickets}
          icon={TbSum} // More semantically correct
          variant="default" // Neutral variant for totals
          helperText="All tracked items"
        />
      </div>

      {/* Ticket Table */}
      <div className="bg-white shadow rounded-lg">{renderTicketListContent()}</div>

      <VModal
        isOpen={isCreateTicketModalOpen}
        hideCloseButton={true}
        title="Create Ticket"
        width={40}
        showFooter={false}
      >
        <TicketForm onCancel={() => setIsCreateTicketModalOpen(false)} />
      </VModal>
    </>
  );
}

export default SupportDashboard;
