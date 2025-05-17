import React from 'react';
// import { TicketForm } from '@components/organisms/support/ticket-form.organism';
import { VTitleWithIcon } from '@components/molecules/icon-title/v-title-with-icon.mol';
import { MdArrowBack } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

function ManageTicketPage() {
  const navigate = useNavigate();

  return (
    <>
      <div className={`relative w-full flex flex-col min-h-screen bg-skin-theme-light`}>
        <div className="flex gap-5">
          <VTitleWithIcon as="h3" icon={MdArrowBack} onClick={() => navigate('/support')}>
            Create Ticket
          </VTitleWithIcon>
        </div>

        <div className="mt-[20px] mb-[20px] border-b theme-border-default"></div>

        <div>
          {/* <TicketForm onComplete={() => navigate('/support')} /> */}
        </div>
      </div>
    </>
  );
}

export { ManageTicketPage };
