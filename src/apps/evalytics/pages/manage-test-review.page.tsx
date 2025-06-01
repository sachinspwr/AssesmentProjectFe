import ReviewTestForm from "../components/review-test/review-test-form.component";
import { VTitleWithIcon } from "@components/molecules/icon-title/v-title-with-icon.mol";
import { MdArrowBack } from "react-icons/md";
import { useNavigate } from "react-router-dom";

type ManageTestReviewpageProps = {
    viewMode?: 'content' | 'review';
}

function ManageTestReviewpage ({viewMode = 'review'}: ManageTestReviewpageProps) {
    const navigate = useNavigate();
    return(
        <>
            <VTitleWithIcon as="h3" icon={MdArrowBack} onClick={()=> navigate(-1)}>Review Test</VTitleWithIcon> 
            <div className="border-b-2 my-4"></div>
            <ReviewTestForm viewMode={viewMode}/>
        </>
    )
}

export default ManageTestReviewpage;