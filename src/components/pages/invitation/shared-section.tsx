import { VButton, VICon } from '@components/atoms';
import { VTypography } from '@components/molecules/typography/v-typography.mol';
import GenerateLink from '@components/organisms/invite-link/genrate-link.organisms';
import InviteLink from '@components/organisms/invite-link/link.organisms';
import RegisteredUsersTable from '@components/organisms/invite-link/registered-users-table.organisms';
import { TestLinkType } from '@utils/enums/test-link-type.enums';
import { useState } from 'react';
import { IoAdd } from 'react-icons/io5';
import { useGetTestLinksByTypeQuery } from 'store/slices/test-link.slice.';

type SharedSectionProps = {
  testId: string;
};

function SharedSection({ testId }: SharedSectionProps) {
  const [showGenrateLinkForm, setShowGenrateLinkForm] = useState(false);
  const { data: allLinkOfPersonal = [] } = useGetTestLinksByTypeQuery({
    testId,
    type: TestLinkType.Shared,
  });
  // const allLinkOfPersonal = dummyData;  //didnt get api for this
  return (
    <div className="flex flex-col gap-3">
      <VTypography as="h5" className="font-bold">
        Existing Links & Generate New Link
      </VTypography>
      {allLinkOfPersonal.length > 0 ? (
        allLinkOfPersonal.map((link) => {
          return <InviteLink linkInfo={link} />;
        })
      ) : (
        <VTypography>No Links Found</VTypography>
      )}

      <div className="border-b-2 pb-4">
        <VButton variant="link" className="!w-fit !px-0" onClick={() => setShowGenrateLinkForm(!showGenrateLinkForm)}>
          {/* Generate Link */}
          <VICon icon={IoAdd} className="mt-0.5" size={20} />
          <span className="mt-1">Generate Link</span>
        </VButton>
        {showGenrateLinkForm && (
          <div className="w-3/5">
            <GenerateLink testId={testId} testLinkType={TestLinkType.Shared} />
          </div>
        )}
      </div>
      {allLinkOfPersonal.length > 0 && <RegisteredUsersTable allLink={allLinkOfPersonal} />}
    </div>
  );
}

export default SharedSection;
