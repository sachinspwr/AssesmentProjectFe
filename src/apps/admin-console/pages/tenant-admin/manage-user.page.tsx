import { useGetTenantByIdQuery } from "store/slices/tenants.slice";
import UserSection from "../tenant/user-section.page";
import { VTypography } from "@components/molecules/typography/v-typography.mol";
import { useAppSelector } from "store/store";

function ManageTenantUserPage() {
    const tenantId = useAppSelector((state) => state.account.user?.tenantId) || '';
    const {
        data: tenant,
    } = useGetTenantByIdQuery(tenantId, {
        refetchOnMountOrArgChange: true // Ensures fresh data when component mounts
    });
    return (
        <div>
            <div className='border-b-2 pb-3 mb-4'>
                <VTypography as='h3'>Users</VTypography>
            </div>
            <UserSection tenant={tenant} />
        </div>
    )
}

export { ManageTenantUserPage };
