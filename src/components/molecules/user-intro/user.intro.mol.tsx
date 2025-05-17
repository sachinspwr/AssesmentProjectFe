import { useLoggedInUser } from '@hooks';
import { Avatar } from '../avatar/avatar.mol';
import { getInitials } from '@utils/functions';
import { MdOutlineLogout } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { IConWithLabel } from '../icon-with-label/icon-with-label.mol';

type UserIntroProps = DefaultProps;

function UserIntro({ className }: UserIntroProps) {
  const navigate = useNavigate();
  const user = useLoggedInUser();
  return (
    <div className={`flex items-center gap-5 mr-2 ${className}`}>
      <Avatar initials={getInitials(user?.name || user?.firstName || 'Guest')} altText="" imageUrl={''} />
      <span className="font-semibold text-lg text-skin-theme">{user?.name || user?.firstName || 'Guest'}</span>
      |
      <IConWithLabel
        icon={MdOutlineLogout}
        size={20}
        label="Logout"
        labelClasses="text-skin-theme font-semibold"
        onClick={() => navigate('/sign-out')}
      />
    </div>
  );
}

export { UserIntro };
