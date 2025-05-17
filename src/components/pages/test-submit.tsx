import React from 'react';
import { VTypography } from '@components/molecules/typography/v-typography.mol';
import { VImage } from '@components/atoms/image/v-image.atom';
import { VBrandHeader } from '@components/organisms/layout/v-brand-title.organism';


const Testsubmit = () => {
 
  return (
    <div className="h-screen flex flex-col lg:flex-row justify-center items-center bg-skin-theme-invert gap-10">
      <div className="w-full flex justify-center items-center bg-theme-highlight h-full">
      <VImage src="src\assets\svgs\test-submit.svg" className="max-w-full h-auto" />
      <div className=''
          style={{ width: '450px', height: '381px', position: 'absolute', top: '322px', left: '185px' }}
        />
      </div>
      <div className="w-full flex flex-col justify-center items-center px-10 lg:px-20">
        <VBrandHeader title="Test Engine" className="absolute top-8 right-16 text-right" />

        

        <div className="text-center flex flex-col items-center gap-4">
          <VTypography
            as="h1"
            className="text-[22px] font-normal leading-[26.63px] tracking-[0] w-[301px] h-[27px] top-307px theme-text-primary: #333333"

          >
            Test Submitted Successfully!
          </VTypography>

          <p
            className="text-[12px] font-normal leading-[14.52px] tracking-[0] w-[303px] text-theme-secondary"
         >
            Lorem Ipsum dummy text.
          </p>

        </div>
      </div>
    </div>
  );
};

export default Testsubmit;
