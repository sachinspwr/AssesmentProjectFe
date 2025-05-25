import { VButton } from "@components/atoms";
import { VLabelledInput } from "@components/molecules/index";
import { VTypography } from "@components/molecules/typography/v-typography.mol";
import { useNavigate } from "react-router-dom";

function ReviewResultRating () {
    const navigate = useNavigate();
    return(
        <>
            <VTypography as='h5'>Enter overall rating based on the overall performance of the candidate(scale 1-10)</VTypography>
            <div className='flex flex-row gap-4 mt-4'>
                <VLabelledInput name='technical_skills' label='Technical Skills' placeholder='Rate between 1-10' required className='w-80' />
                <VLabelledInput name='communication_skills' label='Communication Skills' placeholder='Rate between 1-10' required className='w-80' />
                <VLabelledInput name='problem_solving' label='Problem Solving' placeholder='Rate between 1-10' required className='w-80' />
            </div>
            <div className='flex flex-row gap-4 mt-4'>
                <VButton variant='secondary' className='!w-[100px]' onClick={() => navigate(-1)}>Cancel</VButton>
                <VButton variant='primary' className='!w-[170px]'>Submit</VButton>
            </div>
        </>
    )
}

export default ReviewResultRating;