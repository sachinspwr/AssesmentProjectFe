import { VButton, VICon } from '@components/atoms';
import { VTypography } from '@components/molecules/typography/v-typography.mol';
import GenerateLink from '@components/organisms/invite-link/genrate-link.organisms';
import InviteLink from '@components/organisms/invite-link/link.organisms';
import RegisteredUsersTable from '@components/organisms/invite-link/registered-users-table.organisms';
import { TestLinkType } from '@utils/enums/test-link-type.enums';
import { useState } from 'react';
import { IoAdd } from 'react-icons/io5';
import { useGetTestLinksByTypeQuery } from 'store/slices/test-link.slice.';

type RestrictedSectionProps = {
  testId: string;
};
// const dummyData = [
//   {
//     maxAttempts: 3,
//     maxUsages: 120,
//     id: '2aa897f8-6d6f-4afd-b0e4-eb7055b276ae',
//     createdById: '4cad9047-8300-4bf2-ab51-8ccf069bf964',
//     updatedById: '4cad9047-8300-4bf2-ab51-8ccf069bf964',
//     testId: '8d6102a8-32d6-4dff-b9aa-415d1bb813bc',
//     name: 'Test for Restricted 1',
//     description: 'test',
//     token: '2952eaaae132b4936cb3ee0a133de7b3a18718c8fd70312c49ae34280556f66f',
//     activeFrom: '2025-05-31T18:30:00.000Z',
//     activeUntil: '2025-06-04T18:30:00.000Z',
//     timeZone: 'IST',
//     status: 'Active',
//     isActive: true,
//     visibility: 'Restricted',
//     url: 'https://assesmentprojectfe.onrender.com/runner/validate?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsaW5rVG9rZW4iOiIyOTUyZWFhYWUxMzJiNDkzNmNiM2VlMGExMzNkZTdiM2ExODcxOGM4ZmQ3MDMxMmM0OWFlMzQyODA1NTZmNjZmIiwiaWF0IjoxNzQ4NjY1NTQwLCJleHAiOjE3NDg3MDg3NDB9.Zd3-xTOj15UbMhXUZMwl8DFx__pJHvFhxs44NAbCUws',
//   },
//   {
//     maxAttempts: 1,
//     maxUsages: 1,
//     id: '2aa897f8-6d6f-4afd-b0e4-eb7055b276ae',
//     createdById: '4cad9047-8300-4bf2-ab51-8ccf069bf964',
//     updatedById: '4cad9047-8300-4bf2-ab51-8ccf069bf964',
//     testId: '8d6102a8-32d6-4dff-b9aa-415d1bb813bc',
//     name: 'Test for Restricted 2',
//     description: 'test',
//     token: '2952eaaae132b4936cb3ee0a133de7b3a18718c8fd70312c49ae34280556f66f',
//     activeFrom: '2025-05-31T18:30:00.000Z',
//     activeUntil: '2025-06-04T18:30:00.000Z',
//     timeZone: 'IST',
//     status: 'Active',
//     isActive: true,
//     visibility: 'Restricted',
//     url: 'https://assesmentprojectfe.onrender.com/runner/validate?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsaW5rVG9rZW4iOiIyOTUyZWFhYWUxMzJiNDkzNmNiM2VlMGExMzNkZTdiM2ExODcxOGM4ZmQ3MDMxMmM0OWFlMzQyODA1NTZmNjZmIiwiaWF0IjoxNzQ4NjY1NTQwLCJleHAiOjE3NDg3MDg3NDB9.Zd3-xTOj15UbMhXUZMwl8DFx__pJHvFhxs44NAbCUws',
//   },
// ];
function RestrictedSection({ testId }: RestrictedSectionProps) {
  const [showGenrateLinkForm, setShowGenrateLinkForm] = useState(false);
  const { data: allLinkOfPersonal = [] } = useGetTestLinksByTypeQuery(TestLinkType.Restricted,{
    refetchOnMountOrArgChange: true,
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

      <div className='border-b-2 pb-4'>
        <VButton variant="link" className="!w-fit !px-0" onClick={() => setShowGenrateLinkForm(!showGenrateLinkForm)}>
          {/* Generate Link */}
          <VICon icon={IoAdd} className="mt-0.5" size={20} />
          <span className="mt-1">Generate Link</span>
        </VButton>
        {showGenrateLinkForm && (
          <div className="w-3/5">
            <GenerateLink testId={testId} testLinkType={TestLinkType.Restricted} />
          </div>
        )}
      </div>
      {allLinkOfPersonal.length > 0 && (
        <RegisteredUsersTable allLink={allLinkOfPersonal} />
      )}
    </div>
  );
}

export default RestrictedSection;
