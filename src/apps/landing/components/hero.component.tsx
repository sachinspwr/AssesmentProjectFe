import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { VTypography } from '@components/molecules/typography/v-typography.mol';
import { ScrollAnimationWrapper } from '../layout/scroll-animation-wrapper.layout';
import { Typewriter } from './type-writer.component';
import { VButton, VImage } from '@components/atoms';

const HERO_TEXTS = ['Precision', 'Innovation', 'Automation'];

export function Hero() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/sign-up', { replace: true });
  };

  return (
    <section
      className="w-full min-h-screen flex items-center justify-center "
      id="about"
      aria-labelledby="hero-heading"
    >
      <ScrollAnimationWrapper className="w-full">
        <motion.div
          className="w-full flex flex-col lg:flex-row justify-between items-center gap-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          transition={{ staggerChildren: 0.1 }}
        >
          {/* Text Content - Left Side */}
          <div className="flex-1 flex flex-col justify-center items-start">
            <VTypography as="h1">
              Experience Next-Gen Assessments with{' '}
              <span className="block my-4 min-h-[3rem] text-theme-brand">
                <Typewriter texts={HERO_TEXTS} />
              </span>
            </VTypography>

            <VTypography as="p" className="!text-lg  mb-8 max-w-lg !text-theme-secondary">
              Step into the future of testing with our innovative platform, designed for seamless, accurate, and
              engaging assessments. With features like AI-driven proctoring, dynamic exam creation, and real-time
              analytics, our platform ensures a secure and efficient testing experience. Whether you're a student or
              educator, we offer the tools to make assessments fair, comprehensive, and tailored to your needs.
            </VTypography>

            <VButton onClick={handleGetStarted} className="w-full sm:w-48" aria-label="Get started with our platform">
              Get Started
            </VButton>
          </div>

          {/* Image Content - Right Side */}
          <div className="flex-1 flex justify-center items-center lg:justify-end">
            <motion.div
              className="w-full max-w-[600px]"
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              <VImage
                src={'./../src/assets/images/Hero-Banner.svg'}
                alt="Next-generation assessment platform interface"
                width={600}
                height={424}
                className="object-contain w-full h-auto"
              />
            </motion.div>
          </div>
        </motion.div>
      </ScrollAnimationWrapper>
    </section>
  );
}
