import { useGetTenantByIdQuery } from "store/slices/tenants.slice";
import TenantTeamDetails from "../tenant/tenant-team-details.page";
import { VTypography } from "@components/molecules/typography/v-typography.mol";
import { useAppSelector } from "store/store";

function ManageTeamAdminPage() {
    const tenantId = useAppSelector((state) => state.account.user?.tenantId) || '';
    const {
        data: tenant,
    } = useGetTenantByIdQuery(tenantId, {
        refetchOnMountOrArgChange: true
    });
    return (
        <div>
            {/* Manage Team Admin Page */}
            <div className='border-b-2 pb-3 mb-4'>
                <VTypography as='h3'>Teams</VTypography>
            </div>
            <TenantTeamDetails tenant={tenant} />
        </div>
    )
}

export { ManageTeamAdminPage };
