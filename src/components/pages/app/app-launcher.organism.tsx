import { VImage } from '@components/atoms';
import { VTypography } from '@components/molecules/typography/v-typography.mol';
import { VBrandHeader } from '@components/organisms';
import { useLoggedInUser } from '@hooks';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { VActionTile } from '@components/organisms/action/v-action-tile.organism';

type AppOption = {
  title: string;
  icon: string;
  route: string;
};

export const AppOptions: AppOption[] = [
  { title: 'Test Portal', icon: '../../src/assets/svgs/test-portal.svg', route: '/dashboard' },
  { title: 'Support Desk', icon: '../../src/assets/svgs/support.svg', route: '/support-desk' },
  { title: 'Admin Console', icon: '../../src/assets/svgs/admin-console.svg', route: '/admin-console' },
  { title: 'Review & Results', icon: '../../src/assets/svgs/review-result.svg', route: '/evalytics/review/result' },
];

export function AppLauncher() {
  const user = useLoggedInUser();
  const navigate = useNavigate();

  useEffect(() => {
    // redirect if needed
  }, []);

  return (
    <div className="h-screen flex flex-col justify-start items-center lg:flex-row gap-10">
      {/* Left Side Illustration */}
      <div className="w-full flex justify-center items-center bg-theme-highlight h-full">
        <VImage src="src/assets/svgs/get-started.svg" className="max-w-96 h-auto" />
      </div>

      {/* Right Side - App Options */}
      <div className="w-full flex justify-start items-start">
        <div className="w-6/12 flex flex-col justify-center items-start gap-2">
          <VBrandHeader title="Test Engine" className="absolute top-8 right-16 text-right" />

          <div className="flex flex-col justify-center space-y-2">
            <VTypography as="h3" className="!text-theme-secondary text-2xl tracking-wide">
              Welcome Back,{' '}
              <span className="!text-theme-brand font-medium decoration-theme-accent/30 decoration-2 underline-offset-4">
                {user?.fullName}
              </span>
            </VTypography>
            <VTypography as="p" className="!text-theme-muted text-md font-normal">
              Select an app to continue your journey
            </VTypography>
          </div>
          <div className="grid grid-cols-2 gap-4 w-full">
            {/* Changed to grid layout */}
            {AppOptions.map(({ title, icon, route }) => (
              <VActionTile
                title={title}
                imageSrc={icon}
                onClick={() => navigate(route)}
                className="w-full" // Ensure tiles take full width of grid cell
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
