import { VCard } from '@components/atoms';
import { VTypography } from '../typography/v-typography.mol';
import { useLoggedInUser } from '@hooks';

type Comment = {
  createdById?: string;
  updatedById?: string;
  reviewerId?: string;
  isPublic?: boolean;
  testId?: string;
  comment?: string;
  status?: string;
};

interface CommentCardProps {
  comment: Comment;
}

function CommentCard({ comment }: CommentCardProps) {
  const user = useLoggedInUser();
  return (
    <VCard className="!p-4 shadow-sm flex flex-col gap-2">
      <VTypography as="h6">
        {user?.lastName}, {user?.firstName}
      </VTypography>
      <VTypography as="span">{comment.comment || 'No comment'}</VTypography>
      <VTypography as="p" color="secondary" className="text-sm text-theme-muted"></VTypography>
    </VCard>
  );
}

export default CommentCard;
