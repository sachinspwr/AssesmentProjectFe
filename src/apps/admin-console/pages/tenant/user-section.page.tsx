import { VButton } from "@components/atoms";
import { VDynamicForm, VModal } from "@components/organisms";
import VTable, { VTableColumn } from "@components/organisms/table/v-table.organism";
import { UserRequestDTO } from "@dto/request";
import { UserResponseDTO } from "@dto/response";
import { VFormField, VFormFieldData } from "@types";
import ImportUsers from "apps/admin-console/components/tenant-management/import-user.component";
import PreviewAndSelectUsers from "apps/admin-console/components/tenant-management/preview-and-select-users.component";
import { mapper } from "mapper";
import { User } from "models";
import { Tenant } from "models/tenant/tenant.model";
import { useState } from "react";
import {
    useCreateTenantUserMutation,
    useDeleteTenantUserMutation,
    useFetchTenantUsersQuery,
    useUpdateTenantUserMutation,
} from "store/slices/tenants.slice";
import { useLocation } from "react-router-dom"; // ADD
import { useEffect } from "react"; // ADD

type TenantBasicDetailsProps = {
    tenant?: Tenant;
    renderMode: "add" | "edit";
};

function UserSection({ tenant }: TenantBasicDetailsProps) {
    const tenantId = tenant?.id || '';
    const { data, refetch, isLoading: isFetching } = useFetchTenantUsersQuery(tenantId);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isImportModalOpen, setIsImportModalOpen] = useState(false);
    const [createUser, { isLoading: isCreating }] = useCreateTenantUserMutation();
    const [updateUser, { isLoading: isUpdating }] = useUpdateTenantUserMutation();
    const [deleteTenantUser] = useDeleteTenantUserMutation();
    const [usersFromFile, setUsersFromFile] = useState<UserResponseDTO[]>([]);
    const [selectedUser, setSelectedUser] = useState<UserResponseDTO | null>(null);
    const isEditing = selectedUser !== null;
    const isLoading = isCreating || isUpdating;

    const location = useLocation();
    useEffect(() => {
        if (location.state?.usersFromFile) {
            setUsersFromFile(location.state.usersFromFile);
        }
    }, [location.state]);


    const formFields: VFormField[] = [
        { name: "firstName", label: "First Name", type: "text", required: true, position: '1 1 6' },
        { name: "lastName", label: "Last Name", type: "text", required: true, position: '1 7 6' },
        { name: "email", label: "Email", type: "email", required: true, position: '2 1 6' },
        { name: "mobile", label: "Mobile", type: "text", required: true, position: '2 7 6' },
        { name: "dateOfBirth", label: "Date of Birth", type: "date", required: true, position: '3 1 6' },
        {
            name: "gender",
            label: "Gender",
            type: "select",
            required: true,
            position: '3 7 6',
            options: [
                { label: "Male", value: "Male" },
                { label: "Female", value: "Female" },
                { label: "Other", value: "Other" },
            ],
        },
        { name: "company", label: "Company", type: "text", required: true, position: '4 1 6' },
        { name: "companyRole", label: "Company Role", type: "text", required: true, position: '4 7 6' },
        {
            name: 'cancel',
            type: 'custom',
            customContent: (
                <VButton variant="secondary" onClick={() => setIsModalOpen(false)}>
                    Cancel
                </VButton>
            ),
            position: '6 1 2',
        },
        {
            name: 'create',
            type: 'custom',
            customContent: (
                <VButton type="submit" isLoading={isLoading} >
                    {isEditing ? "Update" : "Create"}
                </VButton>
            ),
            position: '6 3 3',
        },
    ];

    const columns: VTableColumn<UserResponseDTO>[] = [
        { key: 'firstName', label: 'Name', sortable: true },
        { key: 'email', label: 'Email', sortable: true },
        { key: 'company', label: 'Company', sortable: true },
        { key: 'companyRole', label: 'Company Role', sortable: true },
    ];

    const handleAddUser = async (formData: VFormFieldData) => {
        if (!tenantId) return;
        try {
            const requestData = {
                ...formData,
                tenantId,
                id: selectedUser?.id,
            } as unknown as User;
            const userRequest = mapper.map(requestData, User, UserRequestDTO);
            if (isEditing) {
                await updateUser({ tenantId, userId: selectedUser!.id as string, payload: userRequest }).unwrap();
            } else {
                await createUser({ tenantId, payload: userRequest }).unwrap();
            }
            // mapper.map(userCreated, UserResponseDTO, User);
            setSelectedUser(null);
            setIsModalOpen(false);
            refetch();
        } catch (error) {
            console.error("Failed to add user:", error);
        }
    };

    const handleDeleteUser = async (userId: string) => {
        if (!tenantId || !userId) return;

        try {
            await deleteTenantUser({ tenantId, userId }).unwrap();
            refetch();  // Refresh the user list after deletion
        } catch (error) {
            console.error("Failed to delete user:", error);
            // You might want to add error handling/toast notification here
        }
    };

    const mapUserToFormData = (user: UserResponseDTO): VFormFieldData => ({
        firstName: user.firstName ?? '',
        lastName: user.lastName ?? '',
        email: user.email ?? '',
        mobile: user.mobile ?? '',
        dateOfBirth: user.dateOfBirth ?? null,
        gender: user.gender ?? '',
        company: user.company ?? '',
        companyRole: user.companyRole ?? '',
    });



    const handleImportClick = () => {
        setIsImportModalOpen(true);
    };

    return (
        <div>
            <div className="flex flex-row justify-end gap-4">
                <div className='w-40'>
                    <VButton variant="secondary" onClick={handleImportClick}>
                        Import Users
                    </VButton>
                </div>
                <div className='w-40'>
                    <VButton onClick={() => setIsModalOpen(true)}>
                        Add User
                    </VButton>
                </div>
            </div>

            <div>
                {usersFromFile.length > 0 ? (
                    <PreviewAndSelectUsers
                        users={usersFromFile}
                        tenantId={tenantId}
                        onImportSuccess={() => {
                            setUsersFromFile([]);
                            refetch();
                        }}
                        onCancel={() => setUsersFromFile([])}
                    />
                ) : (
                    <VTable<UserResponseDTO>
                        title="Tenant Users"
                        data={data ?? []}
                        columns={columns}
                        loading={isFetching}
                        getId={(row) => row.id as string}
                        itemsPerPage={10}
                        actionsConfig={[
                            {
                                action: 'edit',
                                responder: (userId) => {
                                    const userToEdit = data?.find(u => u.id === userId);
                                    if (userToEdit) {
                                        setSelectedUser(userToEdit);
                                        setIsModalOpen(true);
                                    }
                                },
                            },
                            {
                                action: 'delete',
                                responder: (id) => handleDeleteUser(id as string),
                            },
                        ]}
                    />
                )}

            </div>

            <VModal
                title={isEditing ? "Edit User" : "Add New User"}
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false)
                    setSelectedUser(null);
                }}
                width={50}
                showFooter={false}
            >
                <VDynamicForm
                    config={formFields}
                    onSubmit={handleAddUser}
                    initialValues={selectedUser ? mapUserToFormData(selectedUser) : undefined}
                />
            </VModal>

            <ImportUsers
                isOpen={isImportModalOpen}
                onClose={() => setIsImportModalOpen(false)}
                onFileChange={(parsedUsers: UserResponseDTO[]) => {
                    setUsersFromFile(parsedUsers);
                }}
                tenantId={tenantId}
            />

        </div>
    );
}

export default UserSection;