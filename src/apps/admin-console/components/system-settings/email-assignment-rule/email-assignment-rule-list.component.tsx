import { VModal, VTableColumn } from "@components/organisms";
import ConfirmAction from "@components/organisms/assessment/confirm-action/confirm-action.organisms";
import VTable from "@components/organisms/table/v-table.organism";
import { EmailAssignmentRuleResponseDTO } from "@dto/response/email-assignment-rule.response.dto";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { useDeleteEmailAssignmentRuleMutation } from "store/slices/email-assignment-rule.slice";
import EmailAssignmentRuleForm from "./email-assignment-rule-form.component";

type EmailAssignmentListProps = {
    data: EmailAssignmentRuleResponseDTO[];
    loading: boolean;
    onDeleteSuccess: () => void;
    onCreateSuccess: () => void;
};

function EmailAssignmentList ({ data, loading, onDeleteSuccess, onCreateSuccess }: EmailAssignmentListProps) {

    const [deleteEmailAssignmentRule] = useDeleteEmailAssignmentRuleMutation();
    const [emailAssignmentRuleIdToDelete, setEmailAssignmentRuleIdToDelete] = useState<string | null>(null);
    const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] = useState(false);
    const [emailAssignmentRuleToEdit, setEmailAssignmentRuleToEdit] = useState<EmailAssignmentRuleResponseDTO | null>(null);
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);

    const formSubmitRef = useRef<(() => void) | null>(null);
    const [formIsSubmitting, setFormIsSubmitting] = useState(false);
    
    const openAddModal = () => {
        setEmailAssignmentRuleToEdit(null);
        setIsFormModalOpen(true);
    };
    
    const openEditModal = (item: EmailAssignmentRuleResponseDTO) => {
        setEmailAssignmentRuleToEdit(item);
        setIsFormModalOpen(true);
    };

    const columns: VTableColumn<EmailAssignmentRuleResponseDTO>[] = [
        { key: 'key', label: 'Key', sortable: true, searchable: true },
        { key: 'category', label: 'Category', sortable: true, searchable: true },
        { key: 'value', label: 'Value', sortable: true, searchable: true }
    ];

    const handleDelete = async (id?: string) => {
        if (!id) return;
        try {
          await deleteEmailAssignmentRule({ id }).unwrap();
          onDeleteSuccess();
        } catch (error) {
          console.error('Failed to delete instruction:', error);
          toast.error((error as Error).message);
        }
    };
    
    const handleModalSubmit = () => {
        setIsConfirmDeleteModalOpen(false);
        setTimeout(() => {
          if (emailAssignmentRuleIdToDelete) {
            handleDelete(emailAssignmentRuleIdToDelete);
          }
        }, 20);
    };

    return(
        <>
            <VTable
                title="Email Assignment Rules"
                data={data ?? []}
                columns={columns}
                itemsPerviewMode={8}
                loading={loading}
                emptyState={<div>'No Users Found!'</div>}
                getId={(x) => x.id}
                actionsConfig={[
                {
                    action: 'edit',
                    responder: (id?: string) => {
                        const item = data.find((i) => i.id === id);
                        if (item) openEditModal(item);
                    },
                },
                {
                    action: 'delete',
                    responder: (id?: string) => {
                        setEmailAssignmentRuleIdToDelete(id as string);
                        setIsConfirmDeleteModalOpen(true);
                    },
                },
                {
                    action: 'create',
                    label: 'Create Email Assignment Rule',
                    responder: openAddModal,
                }
                ]}
                tableClassName="table-fixed w-full"
            />

            <ConfirmAction
                title="Confirm Deletion"
                message="Are you sure you want to delete this email assignment rule?"
                onSubmit={handleModalSubmit}
                onClose={() => setIsConfirmDeleteModalOpen(false)}
                isOpen={isConfirmDeleteModalOpen}
            />

            <VModal
                    title={emailAssignmentRuleToEdit ? 'Edit Email Assignment Rule' : 'Create Email Assignment Rule'}
                    onClose={() => setIsFormModalOpen(false)}
                    isOpen={isFormModalOpen}
                    onSubmit={() => {
                    formSubmitRef.current?.(); // manually trigger form submit
                    }}
                    okButtonLabel={emailAssignmentRuleToEdit ? 'Update' : 'Save'}
                    isLoading={formIsSubmitting}
                >
                    <EmailAssignmentRuleForm
                    emailAssignmentRuleToEdit={emailAssignmentRuleToEdit}
                    data={data}
                    onClose={() => setIsFormModalOpen(false)}
                    onSuccess={() => {
                        setIsFormModalOpen(false);
                        onCreateSuccess();
                    }}
                    onSubmitRef={formSubmitRef}
                    setIsSubmitting={setFormIsSubmitting}
                    />
            </VModal>
        
        </>
    )
}

export default EmailAssignmentList;