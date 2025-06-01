import { VTitleWithIcon } from "@components/molecules/icon-title/v-title-with-icon.mol";
import { VRadioButtonGroup } from "@components/molecules/index";
import { useState } from "react";
import { MdArrowBack } from "react-icons/md";
import AllReviewsList from "../../components/all-reviews-list.component";

type ReviewTabType = 'all reviews' | 'pending reviews';

const REVIEW_TAB_OPTIONS = [
  { label: 'All Reviews', value: 'all reviews' },
  { label: 'Pending Reviews', value: 'pending reviews' }
];

function ReviewResultpage() {
  const [activeTab, setActiveTab] = useState<ReviewTabType>('all reviews');

  const handleTabChange = (selectedValue: string) => {
    setActiveTab(selectedValue as ReviewTabType);
  };

  function renderActiveContent() {
      if (activeTab === 'all reviews') {
        return (
          <div>
            <AllReviewsList/>
          </div>
        );
      }
      if (activeTab === 'pending reviews') {
        return (
          <div></div>
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
                defaultValue="all reviews"
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