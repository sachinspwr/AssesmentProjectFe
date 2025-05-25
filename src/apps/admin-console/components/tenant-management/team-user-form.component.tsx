import { VDynamicForm, VModal } from "@components/organisms";
import { VButton } from "@components/atoms";
import { VFormFields, VFormFieldData } from "@types";
import toast from "react-hot-toast";
import { useAddTeamUserMutation } from "store/slices/tenant-team.slice";

type AddTeamUserModalProps = {
    isOpen: boolean;
    onClose: () => void;
    tenantId: string;
    teamOptions: { label: string; value: string }[];
    userOptions: { label: string; value: string }[];
    roleOptions: { label: string; value: string }[];
};

export default function AddTeamUserModal({
    isOpen,
    onClose,
    tenantId,
    teamOptions,
    userOptions,
    roleOptions,
}: AddTeamUserModalProps) {
    const [addUserToTeam, { isLoading: isAddingUser }] = useAddTeamUserMutation();

    const formConfig: VFormFields[] = [
        {
            name: "teamId",
            label: "Team",
            type: "select",
            placeholder: "Select Team",
            required: true,
            position: "1 1 6",
            options: teamOptions,
        },
        {
            name: "roleId",
            label: "Role",
            type: "select",
            placeholder: "Select Role",
            required: true,
            position: "1 7 6",
            options: roleOptions,
        },
        {
            name: "userId",
            label: "User",
            type: "select",
            placeholder: "Select User",
            required: true,
            position: "2 1 6",
            options: userOptions,
        },
        {
            name: "cancel",
            type: "custom",
            customContent: (
                <VButton variant="secondary" onClick={onClose}>
                    Cancel
                </VButton>
            ),
            position: "3 1 2",
        },
        {
            name: "save",
            type: "custom",
            customContent: (
                <VButton type="submit" isLoading={isAddingUser}>
                    Add User
                </VButton>
            ),
            position: "3 3 3",
        },
    ];

    const handleSubmit = async (formData: VFormFieldData) => {
        try {
            await addUserToTeam({
                tenantId,
                teamId: formData.teamId as string,
                payload: {
                    userId: formData.userId as string,
                    roleId: formData.roleId as string,
                    teamId: formData.teamId as string,
                },
            }).unwrap();
            onClose();
        } catch (error) {
            console.error(error);
            toast.error("Failed to add user to team.");
        }
    };

    return (
        <VModal isOpen={isOpen} onClose={onClose} title="Add User to Team" width={40} showFooter={false}>
            <VDynamicForm config={formConfig} onSubmit={handleSubmit} />
        </VModal>
    );
}
