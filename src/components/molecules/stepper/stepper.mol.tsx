/* eslint-disable react/function-component-definition */
import React, { ReactNode, useEffect, useState } from 'react';
import { IconType } from 'react-icons';
import { FaCheckCircle } from 'react-icons/fa';

type Step = {
  name: string;
  label: string;
  icon: IconType;
  isActive: boolean;
  isCompleted: boolean;
};

type StepContentProps = {
  id: string;
  children: ReactNode;
};

const StepContent: React.FC<StepContentProps> = ({ id, children }) => {
  return <div id={id}>{children}</div>;
};

type StepperProps = DefaultProps & {
  steps: Step[];
  children: ReactNode;
};

const Stepper: React.FC<StepperProps> = ({ steps, className, children }) => {
  const [activeStep, setActiveStep] = useState<string>(steps[0].name);
  const [visitedSteps, setVisitedSteps] = useState<string[]>([steps[0].name]);

  const handleStepClick = (step: Step) => {
    const currentStepIndex = steps.findIndex((s) => s.name === activeStep);
    const clickedStepIndex = steps.findIndex((s) => s.name === step.name);

    if (step.isCompleted || clickedStepIndex <= currentStepIndex) {
      setActiveStep(step.name);
      if (!visitedSteps.includes(step.name)) {
        setVisitedSteps([...visitedSteps, step.name]);
      }
    }
  };

  useEffect(() => {
    const currentStepIndex = steps.findIndex((s) => s.name === activeStep);
    if (steps[currentStepIndex].isCompleted && currentStepIndex < steps.length - 1) {
      const nextStep = steps[currentStepIndex + 1];
      if (!nextStep.isCompleted && activeStep === steps[currentStepIndex].name) {
        setActiveStep(nextStep.name);
        if (!visitedSteps.includes(nextStep.name)) {
          setVisitedSteps([...visitedSteps, nextStep.name]);
        }
      }
    }
  }, [steps]);

  return (
    <div className={`w-full  ${className}`}>
      {/* Stepper Navigation */}
      <ol className="p-4 pl-8 flex items-center w-full bg-skin-theme-light border-blue-950 border-l-8">
        {steps.map((step, index) => {
          const currentStepIndex = steps.findIndex((s) => s.name === activeStep);
          const isDisabled = !step.isCompleted && index > currentStepIndex;

          return (
            <li
              key={step.name}
              className={`flex items-center w-full ${
                index < steps.length - 1
                  ? 'after:content-[""] after:w-full after:border-b after:border-skin-theme after:mx-2 after:border-2 after:inline-block after:mt-1'
                  : ''
              }`}
            >
              <span
                onClick={() => !isDisabled && handleStepClick(step)}
                className={`cursor-pointer flex items-center justify-center w-8 h-8 rounded-full lg:h-10 lg:w-10 ${
                  activeStep === step.name ? 'bg-skin-theme-active' : 'bg-skin-theme-light'
                } shrink-0 ${isDisabled ? ' !cursor-not-allowed opacity-50' : ''}`}
              >
                {step.isCompleted ? (
                  <FaCheckCircle
                    className={`w-4 h-4 ${activeStep === step.name ? 'text-skin-theme-dark' : 'text-skin-theme'}`}
                  />
                ) : (
                  <step.icon
                    className={`w-4 h-4 ${activeStep === step.name ? 'text-skin-theme' : isDisabled ? 'text-gray-400' : 'text-gray-600'}`}
                  />
                )}
              </span>
              <span className={`ml-4 text-md font-medium ${activeStep === step.name ? 'text-skin-theme' : ''}`}>
                {step.label}
              </span>
            </li>
          );
        })}
      </ol>

      {/* Step Content */}
      <div className="pt-8">
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            const childProps = child.props as StepContentProps;
            if (visitedSteps.includes(childProps.id)) {
              return <div style={{ display: activeStep === childProps.id ? 'block' : 'none' }}>{child}</div>;
            }
          }
          return null;
        })}
      </div>
    </div>
  );
};

export { Stepper, StepContent };
