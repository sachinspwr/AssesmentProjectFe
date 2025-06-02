import { VICon } from '@components/atoms';
import { VTypography } from '@components/molecules/typography/v-typography.mol';
import { GetTestInvitationResponseDTO } from '@dto/response/get-test-link-invitation-response.dto';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { TbCopy, TbEdit, TbTrash } from 'react-icons/tb';
import { useDeactivateTestLinkMutation } from 'store/slices/test-link.slice.';
import ConfirmAction from '../assessment/confirm-action/confirm-action.organisms';
import { VModal } from '../modal/v-modal.organism';
import GenerateLink from './genrate-link.organisms';

type InviteLinkProps = {
  linkInfo: GetTestInvitationResponseDTO;
};

function InviteLink({ linkInfo }: InviteLinkProps) {
  const [isConfirmDeactivateModalOpen, setIsConfirmDeactivateModalOpen] = useState(false);
  const linkName = linkInfo?.name;
  const [showEditModal, setShowEditModal] = useState(false);
  const [deactivateTestLink, { isLoading: deactivateLoading }] = useDeactivateTestLinkMutation();
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(linkInfo?.url || '');
      toast.success('Link copied to clipboard!');
    } catch (err) {
      toast.error('Failed to copy link.');
    }
  };
  const handleDeactivateLink = async () => {
    try {
      await deactivateTestLink({ id: linkInfo?.id }).unwrap(); // Calling the mutation
    } catch (error) {
      toast.error((error as Error).message);
    }
  };
  return (
    <div className="flex items-center gap-4 mt-1">
      <VTypography as="small" className="underline" color="brand">
        {linkName}
      </VTypography>
      <div className="flex gap-4 items-center">
        <VICon icon={TbCopy} size={20} onClick={handleCopyLink} />
        <VICon icon={TbEdit} size={20} color='blue' onClick={() => setShowEditModal(!showEditModal)} />
        <VICon icon={TbTrash} size={20} color='red' onClick={() => setIsConfirmDeactivateModalOpen(true)} disabled={deactivateLoading} />
      </div>

      <ConfirmAction
        title="Confirm Deactivate"
        message="Are you sure you want to deactivate this test link?"
        onSubmit={handleDeactivateLink}
        onClose={() => setIsConfirmDeactivateModalOpen(false)}
        isOpen={isConfirmDeactivateModalOpen}

      />

      <VModal
        isOpen={showEditModal}
        title="Edit Test Link"
        onClose={() => setShowEditModal(false)}
        width={50}
        showFooter={false}
      >
        <GenerateLink
          initialValue={linkInfo}
          renderMode="edit"
          testId={linkInfo?.testId}
          onSuccess={() => setShowEditModal(false)}
        />
      </VModal>
    </div>
  );
}

export default InviteLink;
