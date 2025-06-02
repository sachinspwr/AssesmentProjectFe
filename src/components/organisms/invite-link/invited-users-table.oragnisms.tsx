import { VStatus } from '@components/atoms';
import { VDropdown } from '@components/molecules/index';
import { VTypography } from '@components/molecules/typography/v-typography.mol';
import VTable, { VTableColumn } from '@components/organisms/table/v-table.organism';
import { GetTestInvitationResponseDTO } from '@dto/response/get-test-link-invitation-response.dto';
import { InvitationResponseDto } from '@dto/response/test-invite-response.dto';
import { useState } from 'react';
import { useGetInvitationRecipientsQuery } from 'store/slices/test-link.slice.';

type InvitedUsersTableProps = {
  allLink: GetTestInvitationResponseDTO[];
};

function InvitedUsersTable({ allLink }: InvitedUsersTableProps) {
  const [selectedLink, setSelectedLink] = useState<GetTestInvitationResponseDTO | null>(null);
  const { data: invitationRecipients, isLoading } = useGetInvitationRecipientsQuery(
    {
      testId: selectedLink?.testId || '',
      linkId: selectedLink?.id || ''
    },
    {
      skip: !selectedLink,
      refetchOnMountOrArgChange: true,
    }
  );

  const linkOptions = allLink.map(link => ({
    label: link.name,
    value: link.id,
    data: link // Store the entire link object
  }));

  const columns: VTableColumn<InvitationResponseDto>[] = [
    {
      key: 'email',
      label: 'Email',
    },
    {
      key: 'message',
      label: 'Message',
    },
    {
      key: 'status',
      label: 'Status',
      customRender: (status: unknown) => {
        const statusText = typeof status === 'string' ? status : 'Pending';
        return <VStatus label={statusText} />;
      }
    },
    {
      key: 'acceptedAt',
      label: 'Accepted At',
      customRender: (row: InvitationResponseDto) =>
        row.acceptedAt ? new Date(row.acceptedAt).toLocaleString() : '-'
    },
    {
      key: 'rejectedAt',
      label: 'Rejected At',
      customRender: (row: InvitationResponseDto) =>
        row.rejectedAt ? new Date(row.rejectedAt).toLocaleString() : '-'
    }
  ];

  return (
    <div className='!boder-t-2 mt-4'>
      <div className="flex items-center gap-10">
        <VTypography as="h3">Invited Users</VTypography>
        <div className="w-64">
          <VDropdown
            name="filterByLink"
            options={linkOptions}
            value={selectedLink?.id || ''}
            onChange={(value) => {
              const selected = linkOptions.find(opt => opt.value === value)?.data;
              setSelectedLink(selected || null);
            }}
            placeholder="Select a link"
          />
        </div>
      </div>
      <VTable
        data={invitationRecipients?.invitations || []}
        columns={columns}
        itemsPerPage={10}
        loading={isLoading}
        emptyState={<span>No invitations found.</span>}
      />
    </div>
  );
}

export default InvitedUsersTable;