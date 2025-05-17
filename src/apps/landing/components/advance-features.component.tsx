import { VImage } from '@components/atoms';
import React from 'react';

const features = [
  {
    imageSrc: '../../src/assets/images/People-Search.svg',
    imageAlt: 'Test-YourSelf',
    title: 'AI-Powered Advanced Proctoring',
    description:
      'Our AI-driven proctoring system ensures secure, fair testing by monitoring behaviors in real-time. It detects suspicious actions like eye movement, window switching, and unauthorized interference. With automatic alerts and interventions, administrators maintain exam integrity, while respecting privacy. This system guarantees both administrators and test-takers confidence in the process, preventing cheating and ensuring transparency.',
  },
  {
    imageSrc: '../../src/assets/images/Usability-testing.svg',
    imageAlt: 'Test-YourSelf',
    title: 'Comprehensive Performance Analytics and Insights',
    description:
      'Gain deep insights into test-taker performance with our advanced analytics. Track metrics like answer speed, question difficulty, and behavioral patterns. Our system also highlights any security concerns, offering detailed reports for individual test-takers or groups. This data helps institutions optimize exams, enhance outcomes, and maintain compliance, all while ensuring exam integrity.',
  }
  
];

function AdvanceFeatures() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto space-y-16">
        {features.map(({ imageSrc, imageAlt, title, description }, index) => (
          <div key={index} className="flex flex-col md:flex-row md:items-center md:space-x-16 space-y-8 md:space-y-0">
            {/* Image */}
            <div className="w-full md:w-1/2 text-center md:text-left">
              <VImage src={imageSrc} alt={imageAlt} width={650} height={400} />
            </div>

            {/* Text */}
            <div className="w-full md:w-1/2 space-y-4 text-center md:text-left">
              <h3 className="font-medium text-2xl leading-relaxed tracking-wide">{title}</h3>
              <p className="leading-relaxed text-lg tracking-wide">{description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export { AdvanceFeatures };
