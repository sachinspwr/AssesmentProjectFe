import { motion } from 'framer-motion';
import { ReactNode } from 'react';

type ScrollAnimationWrapperProps = {
  children?: ReactNode;
  className?: string;
};

function ScrollAnimationWrapper({ children, className, ...props }: ScrollAnimationWrapperProps) {
  return (
    <motion.div
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.8 }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export { ScrollAnimationWrapper };
