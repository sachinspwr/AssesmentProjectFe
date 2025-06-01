import { VTitleWithIcon } from "@components/molecules/icon-title/v-title-with-icon.mol";
import { VRadioButtonGroup } from "@components/molecules/index";
import { useState } from "react";
import { MdArrowBack } from "react-icons/md";
import ApprovedTestList from "apps/evalytics/components/review-test/approved-test-list.component";
import { useFetchTestsByStatusQuery } from "store/slices/test-assessment.slice";
import PendingTestList from "apps/evalytics/components/review-test/pending-test-list.component";
import RejectedTestList from "apps/evalytics/components/review-test/rejected-test-list.component";
import { useNavigate } from "react-router-dom";


type ReviewTestTabType = 'approved reviews' | 'pending reviews' | 'rejected reviews';

const REVIEW_TEST_TAB_OPTIONS = [
  { label: 'Approved', value: 'approved reviews' },
  { label: 'Pending', value: 'pending reviews' },
  { label: 'Rejected', value: 'rejected reviews' }
];

function ReviewTestpage() {
  const [activeTab, setActiveTab] = useState<ReviewTestTabType>('approved reviews');
  const navigate = useNavigate();

  const {
    data: rejectedTests,
    isFetching: isFetchingRejectedTests,
  } = useFetchTestsByStatusQuery(
    { status: 'Rejected'},
  );

  const {
    data: approvedTests,
    isFetching: isFetchingApprovedTests,
  } = useFetchTestsByStatusQuery(
    { status: 'Published' },
  );


  const {
    data: pendingTests,
    isFetching: isFetchingPendingTests,
  } = useFetchTestsByStatusQuery(
    { status: 'InReview' },
  );

  const handleTabChange = (selectedValue: string) => {
    setActiveTab(selectedValue as ReviewTestTabType);
  };

  function renderActiveContent() {
      if (activeTab === 'approved reviews') {
        return (
          <div>
            <ApprovedTestList data={approvedTests} loading={isFetchingApprovedTests}/>
          </div>
        );
      }
      if (activeTab === 'pending reviews') {
        return (
          <div>
            <PendingTestList data={pendingTests} loading={isFetchingPendingTests}/>
          </div>
        );
      }
      if (activeTab === 'rejected reviews') {
        return (
          <div>
            <RejectedTestList data={rejectedTests} loading={isFetchingRejectedTests}/>
          </div>
        );
      }
      return <div>Something</div>;
    }
  
  return ( 
    <>
      <VTitleWithIcon as="h3" icon={MdArrowBack} onClick={()=>navigate(-1)}>Test Reviews</VTitleWithIcon>
      <div className="my-5 flex justify-between items-center border-b-2 py-4 w-full">
              <VRadioButtonGroup
                name="review-content-tabs"
                options={REVIEW_TEST_TAB_OPTIONS}
                defaultValue="approved reviews"
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

export default ReviewTestpage;



