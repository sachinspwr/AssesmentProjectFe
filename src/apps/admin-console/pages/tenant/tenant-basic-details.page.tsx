import { VDynamicForm, VDynamicFormHandle } from "@components/organisms";
import { FormFieldData, VFormFieldData, VFormFields } from "@types";
import { TenantsStatus } from "@utils/enums/tenants-status.enum";
import { Tenant } from "models/tenant/tenant.model";
import { useMemo, useRef } from "react";
import { useCreateTenantsMutation, usePatchBasicTenantDetailMutation } from "store/slices/tenants.slice";
import toast from "react-hot-toast";
import { mapper } from "mapper";
import { BasicTenantDetailsRequestDTO } from "@dto/request/basic-tenant-details.dto";
import { TenantsResponseDTO } from "@dto/response/tenants.response.dto";
import { VButton } from "@components/atoms";
import { useNavigate } from "react-router-dom";

type TenantBasicDetailsProps = {
  tenant?: Tenant;
  renderMode: "add" | "edit";
  onComplete: OnCompleteHandler<Tenant>;
};

function TenantBasicDetails({ tenant, renderMode, onComplete }: TenantBasicDetailsProps) {
  const navigate = useNavigate();
  const [createTenant, { isLoading: isCreating }] = useCreateTenantsMutation();
  const [patchTenant, { isLoading: isUpdating }] = usePatchBasicTenantDetailMutation();
  const formRef = useRef<VDynamicFormHandle>(null);
  const exitRef = useRef<boolean>(false);
  const isLoading = isCreating || isUpdating;

  const basicDetailConfig: VFormFields[] = [
    {
      type: 'group',
      label: 'User Details',
      position: '',
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
          name: "email",
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
      name: 'cancel',
      type: 'custom',
      customContent: (
        <VButton variant="secondary" onClick={() => { navigate('/admin-console/tenants') }}>
          Cancel
        </VButton>
      ),
      position: '7 1 2',
    },
    {
      name: 'create',
      type: 'custom',
      customContent: (
        <VButton type="submit" isLoading={isLoading}>
          {renderMode === 'add' ? 'Create' : 'Update'}
        </VButton>
      ),
      position: '7 3 2',
    },
  ];

  const initialValues = useMemo(() => {
    if (!tenant) return {};

    return {
      name: tenant.name,
      slug: tenant.slug,
      email: tenant.email,
      status: tenant.status,
      firstName: tenant.owner?.firstName,
      lastName: tenant.owner?.lastName,
      ownerEmail: tenant.owner?.email,
      mobile: tenant.owner?.mobile,
    } as FormFieldData;
  }, [tenant]);


  const handleFormSubmit = async (formData: VFormFieldData) => {
    try {
      const requestData = {
        ...formData,
        owner: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.ownerEmail,
          mobile: formData.mobile,
        },
        ...(renderMode === 'add' && {}),
      } as Tenant;

      const basicReqData = mapper.map(requestData, Tenant, BasicTenantDetailsRequestDTO);
      if (tenant) {
        await patchTenant({ tenantId: tenant.id, tenantData: basicReqData }).unwrap();
        toast.success('Tenant Updated');
        onComplete(
          { ...(basicReqData as unknown as Tenant), id: tenant.id },
          { shouldExit: exitRef.current }
        );
      } else {
        const tenantCreated = await createTenant(basicReqData).unwrap();
        const mappedTenant = mapper.map(tenantCreated, TenantsResponseDTO, Tenant);
        toast.success('Tenant created');
        onComplete(mappedTenant, { shouldExit: exitRef.current });
      }
    } catch (error) {
      console.log(error);
      toast.error('Failed to save tenant. Please try again.');
      throw error;
    }
  };

  return (
    <div className="w-3/4">
      <VDynamicForm
        key={tenant?.id || "add"}
        config={basicDetailConfig}
        onSubmit={handleFormSubmit}
        ref={formRef}
        initialValues={initialValues}
      />
    </div>
  );
}

export default TenantBasicDetails;
