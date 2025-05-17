import { VRadioButtonGroup } from '@components/molecules/index';
import { VTypography } from '@components/molecules/typography/v-typography.mol';
import DomainList from 'apps/admin-console/components/metadata/domain-list.component';
import DomainRolesList from 'apps/admin-console/components/metadata/domain-role-list.component';
import ExperienceLevelList from 'apps/admin-console/components/metadata/experience-level-list.component';
import IndustryList from 'apps/admin-console/components/metadata/industry-list.component';
import SubjectList from 'apps/admin-console/components/metadata/subject-list.component';
import { useState } from 'react';
import { useFetchDomainsQuery } from 'store/slices/domain.slice';
import { useFetchExperienceLevelQuery } from 'store/slices/experience-level.slice';
import { useFetchIndustryRolesQuery } from 'store/slices/industry-role.slice';
import { useFetchIndustriesQuery } from 'store/slices/industry.slice';
import { useFetchSubjectsQuery } from 'store/slices/subject.slice';

type MetadataTabType = 'industry' | 'domain' | 'domain-role' | 'subject' | 'experience-level';

const METADATA_TAB_OPTIONS = [
  { label: 'Industry', value: 'industry' },
  { label: 'Domain', value: 'domain' },
  { label: 'Domain Role', value: 'domain-role' },
  { label: 'Subject', value: 'subject' },
  { label: 'Experience Level', value: 'experience-level' }
];

function Metadata() {
  const [activeTab, setActiveTab] = useState<MetadataTabType>('industry');

  // fetching industries
  const { data: industries = [], isLoading: isIndustriesLoading, refetch: refetchIndustries } = useFetchIndustriesQuery();
  
  // fetching domains
  const {
    data: domains = [],
    isLoading: isDomainsLoading,
    refetch: refetchDomains,
  } = useFetchDomainsQuery();

  // fetching industry roles
  const {
    data: industry_roles = [],
    isLoading: isIndustryRolesLoading,
    refetch: refetchIndustryRoles,
  } = useFetchIndustryRolesQuery();

  // fetching subjects
  const { data: subjects = [], isLoading: isSubjectLoading, refetch: refetchSubject } = useFetchSubjectsQuery();
 
  const { data: experience_level = [], isLoading: isExperienceLevelLoading, refetch: refetchExperienceLevel } = useFetchExperienceLevelQuery();

  const handleTabChange = (selectedValue: string) => {
    setActiveTab(selectedValue as MetadataTabType);
  };

  function renderActiveContent() {
    if (activeTab === 'industry') {
      return (
        <div>
          <IndustryList
            data={industries}
            loading={isIndustriesLoading}
            onDeleteSuccess={() => {
                refetchIndustries();
            }}
            onAddSuccess={() => refetchIndustries()}
          />
        </div>
      );
    }
    if (activeTab === 'domain') {
      return (
        <div>
          <DomainList
            industries={industries}
            data={domains}
            loading={isDomainsLoading}
            onDeleteSuccess={() => {
              refetchDomains();
            }}
            onAddSuccess={() => refetchDomains()}
          /> 
        </div>
      );
    }
    if (activeTab === 'domain-role') {
      return (
        <div>
          <DomainRolesList
            domains={domains}
            data={industry_roles}
            loading={isIndustryRolesLoading}
            onDeleteSuccess={() => {
              refetchIndustryRoles();
            }}
            onAddSuccess={() => refetchIndustryRoles()}
          /> 
        </div>
      );
    }
    if(activeTab === 'subject')
    {
      return(
        <div>
          <SubjectList 
            data={subjects} 
            loading={isSubjectLoading} 
            onDeleteSuccess={() => {
              refetchSubject();
            }}
            onAddSuccess={() => refetchSubject()}
            />
        </div>
      );
    }
    if(activeTab === 'experience-level')
    {
      return(
        <div>
          <ExperienceLevelList
            data={experience_level}
            loading={isExperienceLevelLoading}
            onDeleteSuccess={() => {
              refetchExperienceLevel();
            }}
            onAddSuccess={() => refetchExperienceLevel()}
          />
        </div>
      );
    }
    return <div>Something</div>;
  }

  return (
    <>
      <VTypography as="h3">Metadata</VTypography>
      <div className="my-5 flex justify-between items-center border-b-2 py-4 w-full">
        <VRadioButtonGroup
          name="support-content-tabs"
          options={METADATA_TAB_OPTIONS}
          defaultValue="industry"
          direction="horizontal"
          onChange={handleTabChange}
          wrapperClasses="!w-fit"
          className="flex align-middle"
        />
      </div>
      {renderActiveContent()}
    </>
  );
}

export default Metadata;
