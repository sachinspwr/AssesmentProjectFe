import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import getScrollAnimation from '../utils/getScrollAnimation';
import { ScrollAnimationWrapper } from '../layout/scroll-animation-wrapper.layout';
import { FaCheck } from 'react-icons/fa6';
import { VTypography } from '@components/molecules/typography/v-typography.mol';
import { VICon, VImage } from '@components/atoms';

const features = [
  '24/7 Dedicated Support',
  'Rapid Issue Resolution',
  'Customized Solutions for Your Needs',
  'Extensive Knowledge Base & Training',
];

function SupportFeature() {
  const scrollAnimation = useMemo(() => getScrollAnimation(), []);

  return (
    <section className="w-full py-16 bg-gray-50">
      <div className="container mx-auto flex flex-col-reverse lg:flex-row items-center gap-12">
        {/* Left side - Text */}
        <ScrollAnimationWrapper className="flex-1">
          <motion.div
            className="flex flex-col justify-center gap-6 px-6 lg:px-0"
            variants={scrollAnimation}
          >
            <h2 className="text-4xl font-bold text-gray-900 leading-tight hover:text-blue-500 transition-colors">
              World-Class Support
            </h2>
            <p className="text-lg text-gray-600">
              Stay ahead with fast, expert support that's always ready to boost your engine's performance and reliability.
            </p>
            <ul className="mt-6 flex flex-col gap-4">
              {features.map((feature, index) => (
                <motion.li
                  key={feature}
                  custom={{ duration: 2 + index }}
                  variants={scrollAnimation}
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: '#DBEAFE',
                    transition: { duration: 0.3 },
                  }}
                  className="flex items-center gap-3 p-4 border shadow-sm transition-colors cursor-pointer"
                >
                  <VICon icon={FaCheck} className='!text-theme-brand'/>
                  <VTypography>{feature}</VTypography>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </ScrollAnimationWrapper>

        {/* Right side - Image */}
        <ScrollAnimationWrapper className="flex-1 flex justify-center">
          <motion.div
            className="w-full max-w-md"
            variants={scrollAnimation}
          >
            <VImage
              src="../../src/assets/images/customer-support.png"
              alt="Customer Support Illustration"
              width={500}
              height={500}
              className="object-contain"
            />
          </motion.div>
        </ScrollAnimationWrapper>
      </div>
    </section>
  );
}

export { SupportFeature };
