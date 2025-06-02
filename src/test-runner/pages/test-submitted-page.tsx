import { VButton, VImage } from '@components/atoms';
import { useNavigate } from 'react-router-dom';
import { TestFlowRoutes } from 'test-runner/core';

function TestSubmittedPage() {
  const navigate = useNavigate();

  const handeleSeeResult = () => {
    navigate(TestFlowRoutes.TEST_RESULTS);
  };

  const handeleGiveFeedback= () => {
    navigate(TestFlowRoutes.TEST_FEEDBACK);
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center gap-10">
      <div className="place-items-center">
        <VImage src='/src/assets/svgs/test-completed.svg' ></VImage>
       <div className='flex gap-2'>
        <VButton variant='secondary' className={'!w-32 mt-5'} onClick={handeleGiveFeedback}>
          Rate Us
        </VButton>
         <VButton className={'!w-32 mt-5'} onClick={handeleSeeResult}>
          See Result
        </VButton>
       </div>
      </div>
    </div>
  );
}

export { TestSubmittedPage };
