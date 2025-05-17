import { VStatus } from '@components/atoms';
import { VCard } from '@components/atoms/card/v-card.atom';
import { VIConButton, VLoader } from '@components/molecules/index';
import { VTypography } from '@components/molecules/typography/v-typography.mol';
import { ActivityLogResponseDTO } from '@dto/response/activity-log-response.dto';
import { VFormFieldData } from '@types';
import { TicketStatus } from '@utils/enums';
import { defaultFormatDtTm, getFullName, getStatusType } from '@utils/functions';
import { AnimatePresence, motion } from 'framer-motion';
import { useLoggedInUser } from 'hooks/useLoggedInUser';
import { useState } from 'react';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { FaPlus } from 'react-icons/fa6';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { useFetchTicketByIdQuery, useFetchTicketLogsQuery, usePatchTicketMutation, useUpdateTicketMutation } from 'store/slices/support.slice';
import { useGetAllUsersQuery } from 'store/slices/user.slice';
import VMarkdown from '../markdown/v-markdown-render.organism';
import { VMarkdownComment } from './markdown-comment.organism';
import { TicketUpdateForm } from './ticket-update-form.organism';

type ActivityLogsProps = {
  incidentId?: string;
  ticketId: string;
  status: TicketStatus;
  createdBy?: string;
  subject?: string;
  createdDate?: string;
  assignedTo?: string;
  description?: string;
  onBackClick?: () => void;
  allowUpdate?: boolean;
};

export function ActivityLogs({
  incidentId,
  ticketId,
  status,
  createdBy,
  subject,
  createdDate,
  assignedTo,
  description,
  onBackClick,
  allowUpdate,
}: ActivityLogsProps) {
  const { data: activityLog = [], isLoading, refetch: refetchLogs } = useFetchTicketLogsQuery(ticketId, { refetchOnMountOrArgChange: true, });
  const { data: ticket, isLoading: isTicketLoading, refetch: refetchTicket } = useFetchTicketByIdQuery(ticketId);
  const { data: users } = useGetAllUsersQuery();
  const [updateTicket, { isLoading: isUpdating }] = useUpdateTicketMutation();
  const [patchTicket, { isLoading: isCreating }] = usePatchTicketMutation();
  const [formKey, setFormKey] = useState(0);
  const [isDescExpanded, setIsDescExpanded] = useState(true);
  const [addNewComment, setAddNewComment] = useState(false);
  const [isCommentsExpanded, setIsCommentsExpanded] = useState(true);
  useLoggedInUser();
  const [comment, setComment] = useState('');

  const assignToOptions = users
    ? users.map((user) => ({
      label: `${user.firstName} ${user.lastName}`,
      value: user.id,
    }))
    : [];

  const handleCommentSubmit = async () => {
    if (!comment?.trim()) return; // Optional: skip empty comments
    try {
      await patchTicket({
        id: ticketId,
        data: {
          lastComment: comment,
        },
      }).unwrap();
      setComment('');
      setFormKey((prev) => prev + 1);
      setAddNewComment(false);
      refetchLogs();
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  const toggleDescription = () => setIsDescExpanded(!isDescExpanded);
  const toggleComments = () => setIsCommentsExpanded(!isCommentsExpanded);

  const handleUpdateTicket = async (formData: VFormFieldData) => {
    try {
      const payload = {
        ...formData,
        subject: ticket?.subject,
        description: ticket?.description,
        contactMobile: ticket?.contactMobile,
      };
      await updateTicket({ id: ticketId, data: payload }).unwrap();
      refetchLogs();
      refetchTicket();
    } catch (err) {
      console.error('Failed to update ticket', err);
    }
  };

  const initialTicketValues: VFormFieldData = {
    assignedToId: ticket?.assignedToId || '',
    priority: ticket?.priority || '',
    category: ticket?.category || '',
    status: ticket?.status || '',
  };

  if (isTicketLoading) {
    return <VLoader size="md" />;
  }
  return (
    <div className="flex flex-col h-[calc(100vh)]">
      {/* Header section */}
      <div className="flex flex-col gap-4 pb-4">
        <span onClick={onBackClick} className="w-full flex items-center gap-5 text-primary-600">
          <AiOutlineArrowLeft size={20} className="cursor-pointer" />
          <VTypography as="h3">{subject}</VTypography>
        </span>
      </div>

      <div className="border-t border-theme-default space-y-4"></div>

      {/* Main content with scroll */}
      <div className="flex-1 w-full">
        <div className="flex flex-col gap-6">
          <div className="flex gap-x-4 gap-y-2 mt-4 flex-wrap">
            <p className="flex gap-1">
              <span>Incident ID:</span> <VTypography as="h6">{incidentId}</VTypography>
            </p>
            <p>|</p>
            <p className="flex gap-1">
              <span>Created:</span> <VTypography as="h6">{createdDate}</VTypography>
            </p>
            <p>|</p>
            <p className="flex gap-1">
              <span>Owner:</span> <VTypography as="h6">{createdBy}</VTypography>
            </p>
            <p>|</p>
            <p className="flex gap-1">
              <span>Assigned to:</span> <VTypography as="h6">{assignedTo}</VTypography>
            </p>
            <p>|</p>
            <p className="flex gap-1">
              <span>Status:</span>
              <VStatus
                className="border-none !bg-theme-default h-6 my-auto"
                label={ticket?.status || ''}
                type={getStatusType(status).type}
              />
            </p>
          </div>
          <div className="border-t border-theme-default space-y-4"></div>

          {/* Editable Fields Toggle */}
          {allowUpdate && (
            <TicketUpdateForm
              assignedToOptions={assignToOptions}
              initialValues={initialTicketValues}
              onSubmit={handleUpdateTicket}
              isSubmitting={isUpdating}
            />
          )}



          <div className="flex flex-col gap-4">
            {/* Description Toggle */}
            <div className="flex items-center gap-2 cursor-pointer" onClick={toggleDescription}>
              <VTypography as="h4">Description</VTypography>
              {isDescExpanded ? (
                <FiChevronUp className="text-theme-default" />
              ) : (
                <FiChevronDown className="text-theme-default" />
              )}
            </div>

            <AnimatePresence>
              {isDescExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <VCard className="mb-4 text-md shadow-sm">
                    <VTypography as="p" className="mb-2">
                      {description}
                    </VTypography>
                  </VCard>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Timeline & Comments Toggle */}
            <div className="flex items-center gap-2 cursor-pointer" onClick={toggleComments}>
              <VTypography as="h4">Timeline & Comments</VTypography>
              {isCommentsExpanded ? (
                <FiChevronUp className="text-theme-default" />
              ) : (
                <FiChevronDown className="text-theme-default" />
              )}
            </div>

            <AnimatePresence>
              {isCommentsExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="border-t border-theme-default"></div>

                  {!addNewComment ? (
                    <div className='flex justify-end'>
                      {ticket?.status !== TicketStatus.Closed && (<VIConButton
                        iconProps={{ icon: FaPlus, size: 15 }}
                        variant="link"
                        className="!w-48 mt-2"
                        onClick={() => setAddNewComment(true)}
                      >
                        Add Comment
                      </VIConButton>)}
                    </div>
                  ) : (
                    <VCard className='mt-4 shadow-sm'>
                      <div className="flex justify-between items-center">
                        <VTypography as="h5">Add Comment</VTypography>
                        <button
                          onClick={() => setAddNewComment(false)}
                          className="text-theme-default text-sm hover:underline"
                        >
                          Cancel
                        </button>
                      </div>
                      {/* Markdown Comment */}
                      <VMarkdownComment
                        value={comment}
                        onChange={setComment}
                        isLoading={isCreating}
                        onSubmit={handleCommentSubmit}
                      />
                    </VCard>
                  )}

                  <div className="mt-4 space-y-4 pb-24">
                    {isLoading ? (
                      <div className="my-40">
                        <VLoader size="md" />
                      </div>
                    ) : activityLog.length === 0 ? (
                      <VTypography color="secondary">No activity logs found</VTypography>
                    ) : (
                      <div className="space-y-4">
                        {activityLog.map((log: ActivityLogResponseDTO) => (
                          <VCard key={log.id} className="!p-4 shadow-sm flex flex-col gap-2">
                            <VTypography as="h6">{getFullName(log.createdBy) || 'System'}</VTypography>
                            {/* <VTypography as="span">{log.comment || 'No comment'}</VTypography> */}
                            <VMarkdown content={log.comment || 'No comment'} />
                            <VTypography as="p" color="secondary" className="text-sm text-theme-muted">
                              {defaultFormatDtTm(log.creationAt) || 'invalid date'}
                            </VTypography>
                          </VCard>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
