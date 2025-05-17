// SupportPage.tsx
import { useState } from 'react';
import { useFetchTicketsQuery } from 'store/slices/support.slice';
import { TicketResponseDTO } from '@dto/response/support-ticket-response.dto';
import { VButton, VImage } from '@components/atoms';
import { VRadioButtonGroup } from '@components/molecules/index';
import { VTypography } from '@components/molecules/typography/v-typography.mol';
import { VModal } from '@components/organisms/modal/v-modal.organism';
import { ActivityLogs } from '@components/organisms/support/activity-logs.organism';
import CreateTicketPage from '@components/organisms/support/tickets-form.organism';
import { TicketList } from '@components/organisms/support/tickets-list.organism';
import { defaultFormatDtTm, getFullName } from '@utils/functions';

type SupportLayoutProps = {
  className?: string;
};

type SupportViewMode = 'list' | 'activity';
type SupportTabType = 'incidents' | 'articles';

const SUPPORT_TAB_OPTIONS = [
  { label: 'Incidents', value: 'incidents' },
  { label: 'Articles', value: 'articles' },
];

export function SupportPage({ className = '' }: SupportLayoutProps) {
  const [isCreateTicketModalOpen, setIsCreateTicketModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<SupportTabType>('incidents');
  const [currentView, setCurrentView] = useState<SupportViewMode>('list');
  const [currentlyViewedTicket, setCurrentlyViewedTicket] = useState<TicketResponseDTO | null>(null);

  const { data: tickets = [], isLoading: isLoadingTickets } = useFetchTicketsQuery();

  const handleTabChange = (selectedValue: string) => {
    setActiveTab(selectedValue as SupportTabType);
  };

  const handleViewTicketActivity = (ticket: TicketResponseDTO) => {
    setCurrentlyViewedTicket(ticket);
    setCurrentView('activity');
  };

  const handleReturnToTicketList = () => {
    setCurrentView('list');
    setCurrentlyViewedTicket(null);
  };

  const toggleCreateTicketModal = () => {
    setIsCreateTicketModalOpen(prev => !prev);
  };

  const renderEmptyArticlesState = () => (
    <div className="flex-1 flex flex-col gap-8 items-center justify-center">
      <div className="text-center">
        <VImage
          src="src/assets/svgs/articles-placeholder.svg"
          className="w-28 h-40"
          alt="No articles available"
        />
        <VTypography className="my-4 text-theme-secondary" as="h5">
          No Articles available!
        </VTypography>
      </div>
    </div>
  );

  const renderTicketListContent = () => {
    if (activeTab === 'incidents') {
      return (
        <TicketList
          tickets={tickets}
          isLoading={isLoadingTickets}
          onViewActivity={handleViewTicketActivity}
        />
      );
    }
    return renderEmptyArticlesState();
  };

  const renderTicketActivityView = () => {
    const ticket = currentlyViewedTicket;
    if (!ticket) return null;
  
    const {
      id,
      incidentId,
      createdBy,
      status,
      subject,
      creationAt,
      assignedTo,
      description,
    } = ticket;
  
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
      />
    );
  };

  const renderSupportDashboard = () => (
    <>
      <div className="my-5 flex justify-between items-center border-b-2 py-4 w-full">
        <VRadioButtonGroup
          name="support-content-tabs"
          options={SUPPORT_TAB_OPTIONS}
          defaultValue="incidents"
          direction="horizontal"
          onChange={handleTabChange}
          wrapperClasses="!w-fit"
          className="flex align-middle"
        />
          <VButton onClick={toggleCreateTicketModal} className='!w-56'>
            Create Ticket
          </VButton>
      </div>

      {renderTicketListContent()}

      <VModal
        isOpen={isCreateTicketModalOpen}
        hideCloseButton={true}
        title="Create Ticket"
        width={40}
        showFooter={false}
      >
        <CreateTicketPage onCancel={() => setIsCreateTicketModalOpen(false)} />
      </VModal>
    </>
  );

  return (
    <div className={`relative w-full flex flex-col min-h-screen bg-skin-theme-light ${className}`}>
      <VTypography as="h3" className="">{currentView !== 'activity' ? 'Support' : ''}</VTypography>

      {currentView === 'activity' ? renderTicketActivityView() : renderSupportDashboard()}
    </div>
  );
}