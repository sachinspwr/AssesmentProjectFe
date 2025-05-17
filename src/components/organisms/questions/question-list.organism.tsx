import React, { useState } from 'react';
import { QuestionResponseDTO } from '../../../dto/response/question-response.dto';
import VTable, { VTableColumn } from '../table/v-table.organism';
import { useNavigate } from 'react-router-dom';
import { useDeleteQuestionMutation } from 'store/slices/questions.slice';
import ConfirmAction from '../assessment/confirm-action/confirm-action.organisms';

type QuestionListProps = {
  data: QuestionResponseDTO[];
  loading: boolean;
  onImportClick?: () => void;
  onDeleteSuccess: () => void;
  fetchMore?: (page: number) => void;
};

function QuestionList({ data, loading, onImportClick, onDeleteSuccess }: QuestionListProps) {
  const navigate = useNavigate();
  const [deleteQuestion] = useDeleteQuestionMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [questionIdToDelete, setQuestionIdToDelete] = useState<string | null>(null); // State to hold the ID of the question to delete

  const columns: VTableColumn<QuestionResponseDTO>[] = [
    { key: 'questionText', label: 'Question', className: 'w-2/5', sortable: true, searchable: true },
    { key: 'type', label: 'Type', className: 'w-44', sortable: true, searchable: true },
    {
      key: 'subject',
      label: 'Subject',
      sortable: true,
      searchable: true,
    },
    { key: 'difficulty', label: 'Difficulty', sortable: true, searchable: true },
    { key: 'marks', label: 'Marks', sortable: true, searchable: true },
    { key: 'timeLimit', label: 'Time(In Min)', sortable: true, searchable: true },
  ];

  const handleDelete = async (id?: string) => {
    if (!id) return;
    try {
      await deleteQuestion({ id }).unwrap();
      onDeleteSuccess();
      console.log('Question deleted successfully');
    } catch (error) {
      console.error('Failed to delete the question:', error);
    }
  };

  const handleModalSubmit = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      if (questionIdToDelete) {
        handleDelete(questionIdToDelete);
      }
    }, 20);
  };

  return (
    <>
      <VTable
        title="Questions"
        data={data ?? []}
        columns={columns}
        itemsPerPage={8}
        loading={loading}
        emptyState={<div>No Questions Found!</div>}
        getId={(x) => x.id}
        actionsConfig={[
          {
            action: 'edit',
            responder: (id?: string) => {
              navigate(`../questions/${id}`);
            },
          },
          {
            action: 'delete',
            responder: (id?: string) => {
              console.log('Delete clicked for id:', id);
              setQuestionIdToDelete(id as string);
              setIsModalOpen(true);
            },
          },
          {
            action: 'create',
            label: 'Create New Question',
            responder: () => {
              navigate('../questions/0');
            },
          },
          {
            action: 'upload',
            label: 'Import Questions',
            responder: () => {
              onImportClick?.();
            },
          },
        ]}
        tableClassName="table-fixed w-full"
      />

      <ConfirmAction
        title="Confirm Deletion"
        message="Are you sure you want to delete this question?"
        onSubmit={handleModalSubmit}
        onClose={() => setIsModalOpen(false)} // Close the modal when cancelled
        isOpen={isModalOpen}
      />
    </>
  );
}

export default QuestionList;
