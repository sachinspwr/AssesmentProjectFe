import { VButton } from "@components/atoms";
import { VLoader } from "@components/molecules/loader/v-loader.mol";
import { VTypography } from "@components/molecules/typography/v-typography.mol";
import { VDynamicForm } from "@components/organisms/dynamic-form/v-dynamic-form.organism";
import { Subscriptionpage } from "@components/pages/subscription/subscription.page";
import { BasicTenantDetailsRequestDTO } from "@dto/request/basic-tenant-details.dto";
import { TenantsStatus } from "@utils/enums/tenants-status.enum";
import { mapper } from "mapper";
import { Tenant } from "models/tenant/tenant.model";
import { useMemo } from "react";
import toast from "react-hot-toast";
import {
    useGetTenantByIdQuery,
    usePatchBasicTenantDetailMutation
} from "store/slices/tenants.slice";
import { useAppSelector } from "store/store";
import { FormFieldData, VFormFieldData, VFormFields } from "types/form-field";

export function ManageTenantAdminPage() {
    const tenantId = useAppSelector((state) => state.account.user?.tenantId) || "";
    const {
        data: tenant,
        isLoading,
        isError,
        refetch
    } = useGetTenantByIdQuery(tenantId, {
        refetchOnMountOrArgChange: true // Ensures fresh data when component mounts
    });

    const [patchTenant, { isLoading: isUpdating }] = usePatchBasicTenantDetailMutation();

    const basicDetailConfig: VFormFields[] = [
        {
            type: 'group',
            position: '1 1 6',
            fields: [
                {
                    name: "name",
                    label: "Tenant Name",
                    type: "text",
                    placeholder: "Enter name",
                    position: "1 1 6",
                    required: true,
                },
                {
                    name: "slug",
                    type: "text",
                    label: "Slug",
                    placeholder: "Enter Slug",
                    required: true,
                    position: "1 7 6",
                },
                {
                    name: "domain",
                    label: "Email Address",
                    type: "email",
                    required: true,
                    placeholder: "Enter your email address",
                    position: "2 1 6",
                    validate: (value) => {
                        if (value === "") return "Email is required";
                        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                        if (!emailRegex.test(value as string)) return "Invalid email format";
                    },
                },
                {
                    name: "status",
                    label: "Status",
                    type: "select",
                    options: Object.entries(TenantsStatus).map(([key, value]) => ({
                        value: key,
                        label: value,
                    })),
                    placeholder: "Select status",
                    required: true,
                    position: "2 7 6",
                },
            ],
        },
        {
            type: 'group',
            label: 'Owner Details',
            position: "4 1 6",
            fields: [
                {
                    name: "firstName",
                    label: "First Name",
                    type: "text",
                    placeholder: "Enter first name",
                    required: true,
                    position: "5 1 6",
                },
                {
                    name: "lastName",
                    label: "Last Name",
                    type: "text",
                    placeholder: "Enter last name",
                    required: true,
                    position: "5 7 6",
                },
                {
                    name: "ownerEmail",
                    label: "Email",
                    type: "email",
                    placeholder: "Enter email",
                    required: true,
                    position: "6 1 6",
                    validate: (value) => {
                        if (value === "") return "Email is required";
                        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                        if (!emailRegex.test(value as string)) return "Invalid email format";
                    },
                },
                {
                    name: "mobile",
                    label: "Mobile",
                    type: "text",
                    placeholder: "Enter mobile number",
                    required: true,
                    position: "6 7 6",
                },
            ],
        },
        {
            name: 'create',
            type: 'custom',
            customContent: (
                <VButton type="submit" isLoading={isUpdating}>
                    Update
                </VButton>
            ),
            position: '7 1 2',
        },
    ];

    const initialValues = useMemo(() => {
        if (!tenant) return {};

        return {
            name: tenant.name,
            slug: tenant.slug,
            domain: tenant.domain,
            status: tenant.status,
            firstName: tenant.owner?.firstName,
            lastName: tenant.owner?.lastName,
            ownerEmail: tenant.owner?.email,
            mobile: tenant.owner?.mobile,
        } as FormFieldData;
    }, [tenant]);

    const handleFormSubmit = async (formData: VFormFieldData) => {
        try {
            if (!tenantId) {
                toast.error('No tenant selected');
                return;
            }

            const requestData = {
                ...formData,
                owner: {
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    email: formData.ownerEmail,
                    mobile: formData.mobile,
                },
            } as Tenant;

            const basicReqData = mapper.map(requestData, Tenant, BasicTenantDetailsRequestDTO);
            await patchTenant({
                tenantId: tenantId,
                tenantData: basicReqData
            }).unwrap();
            toast.success('Tenant updated successfully');
            await refetch();
        } catch (error) {
            console.error(error);
            toast.error('Failed to save tenant. Please try again.');
            throw error;
        }
    };

    if (isLoading) return <div className="w-full h-screen flex flex-col justify-center items-center"><VLoader /></div>;
    if (isError) return <div>Error loading tenant details</div>;

    return (
        <div className="space-y-8">
            <div className='border-b-2 pb-3 mb-4'>
                <VTypography as='h3'>Tenant</VTypography>
            </div>
            <div className="w-3/4">
                <VDynamicForm
                    config={basicDetailConfig}
                    onSubmit={handleFormSubmit}
                    initialValues={initialValues}
                    key={tenant?.id}
                />
            </div>
            <Subscriptionpage />
        </div>
    )
}

