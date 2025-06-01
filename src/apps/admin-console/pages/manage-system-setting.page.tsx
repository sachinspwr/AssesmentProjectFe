import { VTitleWithIcon } from "@components/molecules/icon-title/v-title-with-icon.mol";
import { VRadioButtonGroup } from "@components/molecules/index";
import { useState } from "react";
import { MdArrowBack } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import EmailAssignmentList from "../components/system-settings/email-assignment-rule/email-assignment-rule-list.component";
import { useGetAllEmailAssignmentRulesQuery } from "store/slices/email-assignment-rule.slice";
import MaintenceForm from "../components/system-settings/maintenance/maintenance-form.component";
import FeaturesList from "../components/system-settings/feature-management/feature-mangement-list.component";
import { useGetAllFeaturesQuery } from "store/slices/feature-manager.slice";

type SettingTabType = 'general' | 'email_assignment';

const SETTING_TAB_OPTIONS = [
  { label: 'General', value: 'general' },
  { label: 'Email Assignment', value: 'email_assignment' },
  { label: 'Feature Management', value: 'feature_management' }
];


function ManageSystemSettingPage() {
  const [activeTab, setActiveTab] = useState<SettingTabType>('general');
  const navigate = useNavigate();

  const { data: rules, isLoading: loadingRules, refetch: refetchRules } = useGetAllEmailAssignmentRulesQuery();
  const { data: features, isLoading: loadingFeatures, refetch: refetchFeatures } = useGetAllFeaturesQuery();

  const handleTabChange = (selectedValue: string) => {
    setActiveTab(selectedValue as SettingTabType);
  };

  function renderActiveContent() {
    if (activeTab === 'general') {
      return (
        <div>
          <MaintenceForm />
        </div>
      );
    }
    if (activeTab === 'email_assignment') {
      return (
        <div>
          <EmailAssignmentList
            data={rules}
            loading={loadingRules}
            onDeleteSuccess={() => {
              refetchRules();
            }}
            onCreateSuccess={() => refetchRules()}
          />
        </div>
      );
    }
    if (activeTab === 'feature_management') {
      return (
        <div>
          <FeaturesList
            data={features || []}
            loading={loadingFeatures}
            onToggleSuccess={refetchFeatures}
          />
        </div>
      );
    }
    return <div>Something</div>;
  }

  return (
    <>
      <VTitleWithIcon as="h3" icon={MdArrowBack} onClick={() => navigate(-1)}>System Settings</VTitleWithIcon>
      <div className="my-5 flex justify-between items-center border-b-2 py-4 w-full">
        <VRadioButtonGroup
          name="system-setting-content-tabs"
          options={SETTING_TAB_OPTIONS}
          defaultValue="general"
          direction="horizontal"
          onChange={handleTabChange}
          wrapperClasses="!w-fit"
          className="flex align-middle"
        />
      </div>
      {renderActiveContent()}
    </>
  )
}

export default ManageSystemSettingPage; 