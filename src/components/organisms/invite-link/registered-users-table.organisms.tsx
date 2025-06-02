import { VStatus } from '@components/atoms';
import { VDropdown } from '@components/molecules/index';
import { VTypography } from '@components/molecules/typography/v-typography.mol';
import VTable, { VTableColumn } from '@components/organisms/table/v-table.organism';
import { GetTestInvitationResponseDTO } from '@dto/response/get-test-link-invitation-response.dto';
import { LinkRegistrationUserResponseDto, RegistrationStatus } from '@dto/response/link-registration-response.dto';
import { useState } from 'react';
import { useGetLinkRegistrationsQuery } from 'store/slices/test-link.slice.';

type RegisteredUsersTableProps = {
    allLink: GetTestInvitationResponseDTO[];
};

function RegisteredUsersTable({ allLink }: RegisteredUsersTableProps) {

    const [selectedLinkId, setSelectedLinkId] = useState<string>('');
    const { data: registeredUser, isLoading } = useGetLinkRegistrationsQuery(selectedLinkId, {
        skip: !selectedLinkId,
        refetchOnMountOrArgChange: true,
    });

    const linkOptions = allLink.map(link => ({
        label: link.name, // or link.url or description
        value: link.id,
    }));

    const columns: VTableColumn<LinkRegistrationUserResponseDto>[] = [
        {
            key: 'firstName',
            label: 'Candidate Name',
        },
        {
            key: 'email',
            label: 'Email id',
        },
        {
            key: 'status',
            label: 'Invitation Status',
            customRender: (row) => (
                <VStatus
                    label={row.status}
                    type={row.status === RegistrationStatus.Registered ? 'positive' : row.status === RegistrationStatus.Pending ? 'warning' : 'negative'}
                ></VStatus>
            ),
        },
        {
            key: 'registeredAt',
            label: 'Invitation Date',
        },
    ];

    return (
        <div className='!boder-t-2 mt-4'>
            <div className="flex items-center gap-10">
                <VTypography as="h3">Registration</VTypography>
                <div className="w-64">
                    <VDropdown
                        name="filterByLink"
                        options={linkOptions}
                        value={selectedLinkId}
                        onChange={(value) => {
                            console.log('dropdown changed to:', value);
                            setSelectedLinkId(value as string);
                        }}
                        placeholder="Select a link"
                    />

                </div>
            </div>
            <VTable
                data={registeredUser?.linkRegistrations || []}
                columns={columns}
                itemsPerPage={10}
                loading={isLoading}
                emptyState={<span>No invitations found.</span>}
            />
        </div>
    );
}

export default RegisteredUsersTable;
