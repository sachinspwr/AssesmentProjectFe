import { VAvatar } from '@components/molecules/index';
import { VTypography } from '@components/molecules/typography/v-typography.mol';
import { useLoggedInUser } from '@hooks';
import { getInitials } from '@utils/functions';

interface UserProfileHeaderProps {
    user: ReturnType<typeof useLoggedInUser>;
}

export function UserProfileHeader({ user }: UserProfileHeaderProps) {
    return (
        <div className="flex items-center space-x-4 mb-6">
            <div>
                <VAvatar initials={getInitials(user?.fullName || 'Guest')} size='h-12 w-12' altText="" imageUrl={''} />
            </div>
            <div>
                <VTypography as="p" className="font-medium">{user?.fullName || 'Unknown'}</VTypography>
                <VTypography as="p" color="muted">{user?.email}</VTypography>
            </div>
        </div>
    );
}