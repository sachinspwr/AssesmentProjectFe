// Supportpage.tsx
import { VButton } from '@components/atoms';
import { VRadioButtonGroup } from '@components/molecules/index';
import { VTypography } from '@components/molecules/typography/v-typography.mol';
import VMarkdown from '@components/organisms/markdown/v-markdown-render.organism';
import { VModal } from '@components/organisms/modal/v-modal.organism';
import { VSearchFilter } from '@components/organisms/search-filter/v-search-filter.organism';
import { ActivityLogs } from '@components/organisms/support/activity-logs.organism';
import { ArticlesList } from '@components/organisms/support/article-list-view.organism';
import CreateTicketpage from '@components/organisms/support/tickets-form.organism';
import { TicketList } from '@components/organisms/support/tickets-list.organism';
import { ArticleResponseDTO } from '@dto/response/article.response.dto';
import { TicketResponseDTO } from '@dto/response/support-ticket-response.dto';
import { defaultFormatDtTm, getFullName } from '@utils/functions';
import { useState } from 'react';
import { useFetchArticlesQuery } from 'store/slices/articles.slice';
import { useFetchTicketsQuery } from 'store/slices/support.slice';

type SupportLayoutProps = {
  className?: string;
};

type SupportPage = 'list' | 'activity';
type SupportTabType = 'incidents' | 'articles';

const SUPPORT_TAB_OPTIONS = [
  { label: 'Incidents', value: 'incidents' },
  { label: 'Articles', value: 'articles' },
];

export function SupportPage({ className = '' }: SupportLayoutProps) {
  const [isCreateTicketModalOpen, setIsCreateTicketModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<SupportTabType>('incidents');
  const [currentView, setCurrentView] = useState<SupportPage>('list');
  const [currentlyViewedTicket, setCurrentlyViewedTicket] = useState<TicketResponseDTO | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<ArticleResponseDTO | null>(null);
  const [articleSearch, setArticleSearch] = useState('');
  const { data: tickets = [], isLoading: isLoadingTickets } = useFetchTicketsQuery();
  const {
    data: articles = [],
    isLoading: isLoadingArticles,
  } = useFetchArticlesQuery(undefined, {
    skip: activeTab !== 'articles',
  });

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

  // const renderEmptyArticlesState = () => (
  //   <div className="flex-1 flex flex-col gap-8 items-center justify-center">
  //     <div className="text-center">
  //       <VImage
  //         src="src/assets/svgs/articles-placeholder.svg"
  //         className="w-28 h-40"
  //         alt="No articles available"
  //       />
  //       <VTypography className="my-4 text-theme-secondary" as="h5">
  //         No Articles available!
  //       </VTypography>
  //     </div>
  //   </div>
  // );

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

    const filteredArticles = articles
      .filter((article) =>
        article.title.toLowerCase().includes(articleSearch.toLowerCase())
      )

    return (
      <div className="flex gap-4 h-[70vh]">
        <div className="w-1/4 border-r pr-2">
          <VSearchFilter
            searchValue={articleSearch}
            onSearchChange={setArticleSearch}
            filterValue=""
            onFilterChange={() => { }}
            filterOptions={[]} // ignored
            wrapperClasses="mb-4"
            className="!rounded-lg"
            showFilter={false}
          />
          <ArticlesList
            articles={filteredArticles}
            isLoading={isLoadingArticles}
            onSelect={(article) => setSelectedArticle(article)}
            selectedId={selectedArticle?.id}
          />
        </div>
        <div className="flex-1 px-4 overflow-y-auto">
          <VMarkdown content={selectedArticle?.content || ''} />
        </div>
      </div>
    );
    // return renderEmptyArticlesState();
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
        <CreateTicketpage onCancel={() => setIsCreateTicketModalOpen(false)} />
      </VModal>
    </>
  );

  return (
    <div className={`relative w-full flex flex-col max-h-screen bg-skin-theme-light ${className}`}>
      <VTypography as="h3" className="">{currentView !== 'activity' ? 'Support' : ''}</VTypography>

      {currentView === 'activity' ? renderTicketActivityView() : renderSupportDashboard()}
    </div>
  );
}