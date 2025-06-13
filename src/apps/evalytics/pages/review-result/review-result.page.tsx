import { VTitleWithIcon } from "@components/molecules/icon-title/v-title-with-icon.mol";
import { VRadioButtonGroup } from "@components/molecules/index";
import { useState } from "react";
import { MdArrowBack } from "react-icons/md";
import ResultReviewsList from "../../components/result-reviews-list.component";
import { useGetAllTestsGivenByUserQuery, useGetTestsByStatusQuery } from "store/slices/test-result.slice";

type ReviewTabType = 'all' | 'pending' | 'under-review' | 'processing' | 'incomplete';

const REVIEW_TAB_OPTIONS = [
  { label: 'All', value: 'all' },
  { label: 'Pending', value: 'pending' },
  { label: 'Under Review', value: 'under-review' },
  { label: 'Processing', value: 'processing' },
  {label: 'Incomplete', value: 'incomplete'}
];

function ReviewResultpage() {

  const [activeTab, setActiveTab] = useState<ReviewTabType>('all');
  const handleTabChange = (selectedValue: string) => {
    setActiveTab(selectedValue as ReviewTabType);
  };

  const { data: allResult, isLoading: loadingAllResult } = useGetAllTestsGivenByUserQuery();

  const { data: pendingResult, isLoading: loadingPendingResult } = useGetTestsByStatusQuery({ status: 'Pending' });

  const { data: underReviewResult, isLoading: loadingUnderReviewResult } = useGetTestsByStatusQuery({ status: 'Under_Review' });

  const { data: processingResult, isLoading: loadingProcessingResult } = useGetTestsByStatusQuery({ status: 'Processing' });

  const { data: inCompleteResult, isLoading: loadingInCompleteResult } = useGetTestsByStatusQuery({ status: 'Incomplete' });

  
  function renderActiveContent() {
      if (activeTab === 'all') {
        return (
          <div>
            <ResultReviewsList data={allResult?.data ?? []} loading={loadingAllResult}/>
          </div>
        );
      }
      if (activeTab === 'pending') {
        return (
          <div>
            <ResultReviewsList data={pendingResult?.data ?? []} loading={loadingPendingResult}/>
          </div>
        );
      }
      if (activeTab === 'under-review') {
        return (
          <div>
            <ResultReviewsList data={underReviewResult?.data ?? []} loading={loadingUnderReviewResult}/>
          </div>
        );
      }
      if (activeTab === 'processing') {
        return (
          <div>
              <ResultReviewsList data={processingResult?.data ?? []} loading={loadingProcessingResult}/>
          </div>
        );
      }
      if (activeTab === 'incomplete') {
        return (
          <div>
            <ResultReviewsList data={inCompleteResult?.data ?? []} loading={loadingInCompleteResult}/>
          </div>
        );
      }

      return <div>Something</div>;
    }
  
  return ( 
    <>
      <VTitleWithIcon as="h3" icon={MdArrowBack} onClick={()=>{}}>Result Reviews</VTitleWithIcon>
      <div className="my-5 flex justify-between items-center border-b-2 py-4 w-full">
              <VRadioButtonGroup
                name="review-content-tabs"
                options={REVIEW_TAB_OPTIONS}
                defaultValue="all"
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

export default ReviewResultpage;