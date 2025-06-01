import { VTitleWithIcon } from "@components/molecules/icon-title/v-title-with-icon.mol";
import { VRadioButtonGroup } from "@components/molecules/index";
import { useState } from "react";
import { MdArrowBack } from "react-icons/md";
import { useFetchQuestionsByStatusQuery } from "store/slices/questions.slice";
import RejectedQuestionsList from "../../components/review-questions/rejected-questions-list.component";
import ApprovedQuestionsList from "../../components/review-questions/approved-questions-list.component";
import PendingQuestionsList from "../../components/review-questions/pending-questions-list.component";


type ReviewQuestionTabType = 'approved reviews' | 'pending reviews' | 'rejected reviews';

const REVIEW_QUESTION_TAB_OPTIONS = [
  { label: 'Approved', value: 'approved reviews' },
  { label: 'Pending', value: 'pending reviews' },
  { label: 'Rejected', value: 'rejected reviews' }
];

function ReviewQuestionpage() {
  const [activeTab, setActiveTab] = useState<ReviewQuestionTabType>('approved reviews');


  const {
    data: rejectedquestions,
    isFetching: isFetchingRejectedQuestions,
  } = useFetchQuestionsByStatusQuery(
    { status: 'Rejected'},
  );


  const {
    data: approvedquestions,
    isFetching: isFetchingApprovedQuestions,
  } = useFetchQuestionsByStatusQuery(
    { status: 'Published' },
  );

 


  const {
    data: pendingquestions,
    isFetching: isFetchingPendingQuestions,
  } = useFetchQuestionsByStatusQuery(
    { status: 'InReview' },
  );

  
  const handleTabChange = (selectedValue: string) => {
    setActiveTab(selectedValue as ReviewQuestionTabType);
  };

  function renderActiveContent() {
      if (activeTab === 'approved reviews') {
        return (
          <div>
            <ApprovedQuestionsList data={approvedquestions} loading={isFetchingApprovedQuestions}/>
          </div>
        );
      }
      if (activeTab === 'pending reviews') {
        return (
          <div>
            <PendingQuestionsList data={pendingquestions} loading={isFetchingPendingQuestions}/>
          </div>
        );
      }
      if (activeTab === 'rejected reviews') {
        return (
          <div>
            <RejectedQuestionsList data={rejectedquestions} loading={isFetchingRejectedQuestions}/>
          </div>
        );
      }
      return <div>Something</div>;
    }
  
  return ( 
    <>
      <VTitleWithIcon as="h3" icon={MdArrowBack} onClick={()=>{}}>Question Reviews</VTitleWithIcon>
      <div className="my-5 flex justify-between items-center border-b-2 py-4 w-full">
              <VRadioButtonGroup
                name="review-content-tabs"
                options={REVIEW_QUESTION_TAB_OPTIONS}
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

export default ReviewQuestionpage;



