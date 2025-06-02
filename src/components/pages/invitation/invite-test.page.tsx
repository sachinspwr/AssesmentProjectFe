import { Icon, VLink } from '@components/atoms';
import { VTypography } from '@components/molecules/typography/v-typography.mol';
import { VTabs, VTabsRef } from '@components/organisms';
import { useMemo, useRef } from 'react';
import { TbArrowLeft } from 'react-icons/tb';
import PersonalUsageSection from './personal-usage-section';
import { useParams } from 'react-router-dom';
import InviteOnlySection from './invite-only-section';
import RestrictedSection from './restricted-section';
import SharedSection from './shared-section';

function InviteTestPage() {
  const tabRef = useRef<VTabsRef>(null);
  const { id } = useParams();
  const tabs = useMemo(() => {
    return [
      {
        name: 'personalUsage',
        label: 'Personal Usage',
        content: <PersonalUsageSection testId={id || ''} />,
      },
      {
        name: 'inviteOnly',
        label: 'Invite only',
        content: <InviteOnlySection testId={id || ''} />,
      },
      {
        name: 'restricted',
        label: 'Restricted',
        content: <RestrictedSection testId={id || ''} />
      },
      {
        name: 'shared',
        label: 'Shared',
        content: <SharedSection testId={id || ''} />,
      },
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="relative w-full flex flex-col min-h-screen bg-skin-theme-light">
      <header className="flex justify-between items-center gap-2">
        <div className="flex gap-4 items-center">
          <VLink to="/assessments" aria-label="Back to assessments">
            <Icon icon={TbArrowLeft} size={26} color="#000" />
          </VLink>
          <VTypography as="h3">Invitation link</VTypography>
        </div>
      </header>

      <div className="my-4">
        <VTabs tabs={tabs} ref={tabRef} />
      </div>
    </div>
  );
}

export default InviteTestPage;
