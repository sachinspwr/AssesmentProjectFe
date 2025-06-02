import { VTitleWithIcon } from "@components/molecules/icon-title/v-title-with-icon.mol";
import { MdArrowBack } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import ResultList from "@components/pages/result/component/result-list.component";

function ResultPage () {
    
    const navigate = useNavigate();

    return(
        <>
            <VTitleWithIcon as="h3" icon={MdArrowBack} onClick={()=>navigate(-1)}>Result</VTitleWithIcon>  
            <div className="border border-theme-default mb-5 mt-5"></div>      
            <ResultList/>
        </>
    )
}

export default ResultPage;