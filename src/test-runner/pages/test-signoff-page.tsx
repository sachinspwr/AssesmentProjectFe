import { VButton, VImage } from '@components/atoms';
import SignOffImage from '../../assets/images/test-signoff.png';
import { VTypography } from '@components/molecules/typography/v-typography.mol';
import { ErrorBoundary } from '@components/organisms/error/error-bountry.organism';
import { useNavigate } from 'react-router-dom';

function TestSignoffPage() {
const navigate=useNavigate()

  const handeleSeeResult=()=>{
      navigate('/test-runner/candidate-test-result')
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
        <VButton className={'!w-32 mt-5'} onClick={handeleSeeResult}>See Result</VButton>
       </div>
    </div>
    // <div className="h-full flex justify-center items-center">
    //   <div className=" p-6  border border-skin-theme rounded-lg shadow-sm space-y-6 max-w-md mx-auto">
    //     <h1 className="text-xl text-skin-theme-dark  mb-4">
    //       <b className="font-bold">Time's Up !!! Thank you </b>for taking this test.
    //     </h1>
    //     {user && (
    //       <div className='flex justify-between'>
    //         <Link to="/tests" className=" text-skin-theme-dark"/>
    //         <IConWithLabel icon={IoArrowBack} label="or Go Back to Tests" />
    //       <Link to="/test-result" className=" text-skin-theme-dark">
    //         <IConWithLabel icon={IoArrowBack} label="View Result" />
    //       </Link>
    //       <Link to="/test-runner/test-result" className=" text-skin-theme-dark">
    //         <IConWithLabel icon={FaExternalLinkAlt} label=" See You Result" />
    //       </Link>
    //       </div>

    //     )}
    //   </div>
    // </div>
  );
}

export { TestSignoffPage };
