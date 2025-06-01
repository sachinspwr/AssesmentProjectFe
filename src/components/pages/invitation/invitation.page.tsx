import VTable, { VTableColumn } from "@components/organisms/table/v-table.organism";
import { LinkRegistrationResponseDto } from "@dto/response/link-registration-response.dto";
import { useGetLinkRegistrationQuery } from "store/slices/link-registration.slice";

function InvitationPage() {
    const { data, isLoading } = useGetLinkRegistrationQuery("53c1d98d-18ff-4f91-98f2-88e90c4ac24e");

    const columns: VTableColumn<LinkRegistrationResponseDto>[] = [
        {
            key: 'name',
            label: 'Name',
            searchable: true,
            sortable: true,
        },
        {
            key: 'status',
            label: 'Status',
            sortable: true,
        },
        {
            key: 'description',
            label: 'Description',
            sortable: true,
        },
        {
            key: 'visibility',
            label: 'Visibility',
            sortable: true,
        },
    ];

    return (
        <div>
            <VTable
                title="Invitations"
                data={data ? [data] : []}
                columns={columns}
                itemsPerPage={10}
                loading={isLoading}
                emptyState={<span>No invitations found.</span>}
            />
        </div>
    );
}

export default InvitationPage;
