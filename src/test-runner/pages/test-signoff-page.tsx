import { VButton, VImage } from '@components/atoms';
import SignOffImage from '../../assets/images/test-signoff.png';
import { VTypography } from '@components/molecules/typography/v-typography.mol';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from 'store/store';

function TestSignoffPage() {
const navigate=useNavigate()
  const testDetails = useAppSelector((state) => state.testRunner.testDetails);
  const participantId = useAppSelector((state) => state.testRunner.participantId);
  const testId = testDetails?.id;

  const handeleSeeResult=()=>{
      navigate(`/test-runner/${testId}/participants/${participantId}`)
  }
  return (
    <div className="h-screen flex flex-col justify-center items-center gap-10">
      {/* <div className="w-full flex justify-center items-center bg-theme-highlight border-orange-900">
        {/* <ErrorBoundary>
        <VImage
          src={SignOffImage}
          alt="Customer Support Illustration"
          width={500}
          height={500}
          className="object-contain"
        />
        </ErrorBoundary> */}
      {/* </div>  */}
       <div className="place-items-center">
        <VTypography as="h4">Your test has been submitted successfully!</VTypography>
        <VTypography as="p" className='text-theme-default-backdrop'>We will review it and get back to you shortly</VTypography>
        <VButton className={'!w-56 mt-5 text-nowrap'} onClick={handeleSeeResult}>See Your Result</VButton>
       </div>
    </div>
  );
}

export { TestSignoffPage };
