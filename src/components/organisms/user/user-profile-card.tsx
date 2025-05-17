import { VCard, VLink } from '@components/atoms';
import { VAvatar } from '@components/molecules/index';
import { VTypography } from '@components/molecules/typography/v-typography.mol';
import { getInitials } from '@utils/functions';
import { useState } from 'react';
import { useAppSelector } from 'store/store';

function UserProfileCard() {
  const user = useAppSelector((state) => state.account.user);
  const [isHovered, setIsHovered] = useState(false);
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout); // Clear any existing timeout
    }
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    // Delay closing the card by 200ms
    const timeout = setTimeout(() => {
      setIsHovered(false);
    }, 200);
    setHoverTimeout(timeout);
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* User Avatar */}
      <VAvatar
        altText="User Avatar"
        initials={getInitials(user?.fullName ?? '')}
        size="h-8 w-8 cursor-pointer"
      />

      {/* User Profile Card */}
      {isHovered && (
        <div
          className="absolute top-12 right-0"
          onMouseEnter={handleMouseEnter} // Keep the card open when hovering over it
          onMouseLeave={handleMouseLeave} // Close the card when leaving it
        >
          <VCard className="p-3 bg-theme-default rounded-xl shadow-lg">
            {/* Notch */}
            <div className="absolute -top-2 right-4 w-4 h-4 bg-white rotate-45"></div>

            {/* User Info */}
            <div className="px-4 py-2 flex flex-col justify-center items-center gap-2">
              <VAvatar
                altText="User Avatar"
                size="h-16 w-16"
                wrapperClass="!bg-[#107CE8]"
                initials={getInitials(user?.fullName ?? '')}
                initalsClass="text-theme-on-primary !text-lg"
              />

              <div className="flex flex-col justify-center items-center">
                <VTypography as="h6">{user?.fullName}</VTypography>
                <VTypography as="p">{user?.email}</VTypography>
              </div>
            </div>

            {/* Account Links */}
            <div className="mt-2 w-full flex flex-col items-start space-y-2">
              <VLink to="/settings" className="no-underline">
                <VTypography as="h6" className='pl-3'>Account settings</VTypography>
              </VLink>

              <div className="border-b border-theme-default w-full"></div>

              <VLink to="/sign-out" className="no-underline">
                <VTypography as="h6" className='pl-3'>Logout</VTypography>
              </VLink>
            </div>
          </VCard>
        </div>
      )}
    </div>
  );
}

export { UserProfileCard };