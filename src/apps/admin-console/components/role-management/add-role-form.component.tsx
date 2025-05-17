import { useEffect, useState } from "react";
import { VLabel } from "@components/atoms/label/v-label.atom";
import {
  VCheckbox,
  /* VLabelledDropdown */
  VLoader,
} from "@components/molecules/index";
import { VLabelledInput } from "@components/molecules/labelled-input/v-labelled-input.mol";
import { useFetchPermissionsQuery } from "store/slices/permissions.slice";
// import { useFetchTenantsQuery } from "store/slices/tenant.slice";
import { VButton, VSwitch } from "@components/atoms";
import { useNavigate } from "react-router-dom";
import { RolesRequestDTO } from "@dto/request/roles.request.dto";
import { useAddRolesMutation, useUpdateRoleMutation } from "store/slices/roles.slice";
import toast from "react-hot-toast";
import { RolesResponseDTO } from "@dto/response/roles.response.dto";

type AddRoleProps = {
  onSuccess: () => void;
  initialValue?: RolesResponseDTO;
  renderMode?: ActionMode;
  isPreview: boolean;
  setIsPreview: (isPreview: boolean) => void;
}
function AddRoleForm({initialValue, renderMode = 'create', isPreview, onSuccess}: AddRoleProps) {

  // const { data: tenantsResponse } = useFetchTenantsQuery();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  // const tenants = tenantsResponse?.data ?? [];

  const [ addRole, {isLoading: addingRole} ] = useAddRolesMutation();
  const[ updateRole, {isLoading: updatingRole}] = useUpdateRoleMutation();

  const navigate = useNavigate();

  const {
    data: permissions = [],
    isLoading: loadingPermissions,
  } = useFetchPermissionsQuery();

  const [formData, setFormData] = useState({
    name: "",
    // tenantId: "",
    permissionIds: [] as string[],
    isPublic: true,
    isDefault: false
  });

  useEffect(() => {
    if (renderMode === 'edit') {
      //console.log('initialValue:', initialValue);
      // console.log('tenantId in initialValue:', initialValue?.tenantId);
      //console.log('initialValue.permission:', initialValue?.permission?.map((p: { id: string }) => p.id));
    }
  
    if (
      renderMode === 'edit' &&
      initialValue &&
      permissions.length > 0 
      /* &&
      tenants.length > 0 */
    ) {
      // const selectedTenantId = initialValue?.tenantId;
      const selectedPermissionIds = initialValue.permission?.map((p: { id: string }) => p.id) || [];
      // console.log("Setting formData.permissionIds:", selectedPermissionIds);
  
      setFormData({
        name: initialValue.name,
        // tenantId: selectedTenantId,
        permissionIds: selectedPermissionIds,
        isPublic: initialValue.isPublic,
        isDefault: initialValue.isDefault
      });
    }
  }, [initialValue, renderMode, permissions]);
  
  
  
  const handleCheckboxChange = (permId: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      permissionIds: checked
        ? [...prev.permissionIds, permId]
        : prev.permissionIds.filter((id) => id !== permId),
    }));
  };

  const handleFormSubmit = async (formData: any) => {
    console.log("formData = ",formData);
    // // console.log("Dropdown Value:", formData.tenantId);
    // console.log("Permission IDs:", formData.permissionIds);
    // console.log("Available Permissions:", permissions.map(p => p.id));
    const basePayload: RolesRequestDTO = {
      ...formData,
      isDefault: formData.isDefault ?? false,
      isPublic: formData.isPublic ?? false,
      // tenantId: formData.tenantId
    };
  
    try {
      if( renderMode == 'edit')
      {
        await updateRole({ id: initialValue?.id ?? '0', data: basePayload }).unwrap();
      }
      else
      {
        await addRole({ newRole: basePayload }).unwrap();
      }
      onSuccess && onSuccess();
    } catch (error) {
      console.error('Failed to submit role:', error);
      toast.error((error as Error).message);
    }
  };

  return (
    <>
      {!isPreview ? (
      <div className="flex flex-col gap-4">

        <div className="flex flex-row gap-4 justify-end">
          <VSwitch
            name="isPublic"
            label="Public"
            value={formData.isPublic ? "true" : "false"}
            onChange={(value) =>
              setFormData((prev) => ({ ...prev, isPublic: value === "true" }))
            }
          />

          <VSwitch
            name="isDefault"
            label="Default"
            value={formData.isDefault ? "true" : "false"}
            onChange={(value) =>
              setFormData((prev) => ({ ...prev, isDefault: value === "true" }))
            }
        />

        </div>


        <div>
        <VLabelledInput
          type="text"
          name="name"
          label="Name"
          placeholder="Enter name"
          required
          value={formData.name}
          onChange={(value) =>
            setFormData((prev) => ({ ...prev, name: value }))
          }
        />

        {/* <VLabelledDropdown
          name="tenantId"
          label="Tenant"
          placeholder="Select Tenant"
          options={tenants.map((tenant: { id: string; name: string }) => ({
            value: tenant.id,
            label: tenant.name,
          }))}
          wrapperClasses="!w-[576px]"
          value={formData.tenantId}
          onChange={(selected) =>
            setFormData((prev) => ({
              ...prev,
              tenantId: selected as string ?? '',
            }))
          }    
                        
        /> */}

        </div>

        <VLabel className="mt-4">Select Permissions</VLabel>

        <div className="mt-4 mb-5">
          {loadingPermissions ? (
            <VLoader size="md" classNames="my-8" />
          ) : Array.isArray(permissions) && permissions.length > 0 ? (
            <div className="grid grid-cols-4 gap-4">
              {permissions.map((perm) => (
                <VCheckbox
                  key={perm.id}
                  name="permissionIds"
                  label={perm.name}
                  value={perm.id}
                  checked={formData.permissionIds.includes(perm.id)}
                  onChange={(_, __, checked) =>
                    handleCheckboxChange(perm.id, checked ?? false)
                  }
                />
              ))}
            </div>
          ) : (
            <p>No permissions available.</p>
          )}
        </div>

        <div className="flex flex-row gap-8 w-[400px]">
          <VButton 
              variant="secondary"
              onClick={() => navigate('/admin-console/roles')}
          >
              Cancel
          </VButton>

          <VButton 
              variant="primary"
              onClick={() => handleFormSubmit(formData)}
              isLoading={renderMode == 'create' ? addingRole : updatingRole}
          >
              { renderMode == 'create' ? 'Save' : 'Update'}
          </VButton>
        </div>
      </div>
    ) : (
      <div>Nothing...</div>
    )}

    </>
  );
}

export default AddRoleForm;
