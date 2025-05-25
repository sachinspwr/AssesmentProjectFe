import { VICon } from '@components/atoms';
import { VCheckbox } from '@components/molecules/checkbox/v-checkbox.mol';
import { VLoader } from '@components/molecules/loader/v-loader.mol';
import { VTypography } from '@components/molecules/typography/v-typography.mol';
import { TestInstructionOptionResponseDTO } from '@dto/response/test-instruction-option-response.dto';
import { splitAndCapitalize } from '@utils/functions';
import { mapper } from 'mapper';
import { TestInstructionOption } from 'models';
import React, { useEffect, useMemo, useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { useFetchTestInstructionsOptionQuery } from 'store/slices/test-instruction-option.slice';

interface InstructionsProps {
  testId: string;
  selectedInstructions: TestInstructionOption[]; // Updated to full instructions
  setSelectedInstructions: (selected: TestInstructionOption[]) => void;
  onLoadingPrereq?: (status: boolean) => void;
}

function ConfigureInstructions({
  testId,
  selectedInstructions,
  setSelectedInstructions,
  onLoadingPrereq,
}: InstructionsProps) {
  const { data: instructionsFetched, isLoading, isError } = useFetchTestInstructionsOptionQuery({ testId });
  const [applyRecommended, setApplyRecommended] = useState(false);
  const [previousSelection, setPreviousSelection] = useState<TestInstructionOption[]>([]); // Store full instructions

  const instructions = useMemo(() => {
    if (!instructionsFetched) return [];
    return instructionsFetched.map((instructionDto) =>
      mapper.map(instructionDto, TestInstructionOptionResponseDTO, TestInstructionOption)
    );
  }, [instructionsFetched]);

  const recommendedInstructions = useMemo(() => {
    if (!Array.isArray(instructions)) return [];
    return instructions.filter((instruction) => instruction?.isRecommended);
  }, [instructions]);

  const handleApplyRecommendedChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const isChecked = (event.target as HTMLInputElement).checked;

    if (isChecked) {
      // Store the selected instructions in previousSelection for undoing later
      setPreviousSelection(selectedInstructions);

      // Assuming recommendedInstructions is a list of instruction objects
      setSelectedInstructions([...recommendedInstructions]);
    } else {
      setSelectedInstructions(previousSelection);
    }

    setApplyRecommended(isChecked);
  };

  // Handle individual checkbox change
  const handleCheckboxChange = (instruction: TestInstructionOption) => {
    if (applyRecommended) {
      // If in recommended mode, only allow toggling recommended instructions
      if (recommendedInstructions.some((inst) => inst.id === instruction.id)) {
        const newSelection = selectedInstructions.some((inst) => inst.id === instruction.id)
          ? selectedInstructions.filter((inst) => inst.id !== instruction.id)
          : [...selectedInstructions, instruction];
        setSelectedInstructions(newSelection);
      }
    } else {
      // Normal mode behavior
      const newSelection = selectedInstructions.some((inst) => inst.id === instruction.id)
        ? selectedInstructions.filter((inst) => inst.id !== instruction.id)
        : [...selectedInstructions, instruction];
      setSelectedInstructions(newSelection);
    }
  };

  // Check if an instruction is recommended
  const isRecommended = (instruction: TestInstructionOption): boolean => {
    return instruction.isRecommended ?? false;
  };

  // Group instructions by category
  const groupedInstructions = useMemo(() => {
    if (!Array.isArray(instructions)) return {};

    return instructions.reduce((acc: Record<string, TestInstructionOption[]>, instruction) => {
      if (!acc[instruction.category]) {
        acc[instruction.category] = [];
      }
      acc[instruction.category].push(instruction);
      return acc;
    }, {});
  }, [instructions]);

  useEffect(() => {
    onLoadingPrereq && onLoadingPrereq(isLoading);
  }, [isLoading, onLoadingPrereq]);

  if (isError) return <VTypography>Error loading instructions</VTypography>;

  if (isLoading) {
    return <VLoader />;
  }

  if ((!isLoading && !Array.isArray(instructions)) || instructions?.length === 0) {
    return <VTypography>No test instructions available.</VTypography>;
  }

  return (
    <div className="space-y-6 mt-8">
      <div className="flex flex-col items-start gap-3">
        <VTypography as="h3" className="flex justify-center items-center gap-2 font-semibold">
          Instructions
        </VTypography>

        <VTypography as="p">Configure rules and regulations for your assessment</VTypography>

        {/* Apply Recommended Instructions Checkbox */}
        {recommendedInstructions?.length > 0 && (
          <VCheckbox
            name="apply-recommended"
            label="Apply recommended instructions"
            value={'false'}
            checked={applyRecommended}
            onChange={(v, event) => handleApplyRecommendedChange(event!)}
            wrapperClasses="ml-4 mt-4"
          />
        )}
      </div>

      {isLoading ? (
        <VLoader size="md" />
      ) : (
        <div role="group" aria-labelledby="instructions-group" className="space-y-8 ml-4">
          {Object.entries(groupedInstructions).map(([category, items]) => (
            <div key={category}>
              <VTypography as="h6" className="font-medium text-theme-secondary">
                {splitAndCapitalize(category)}
              </VTypography>

              <div className="ml-2 mt-2 space-y-3">
                {items.map((instruction) => (
                  <div key={instruction.id} className="flex items-center">
                    <VCheckbox
                      name="instructions"
                      label={
                        <div className="flex items-center gap-1">
                          {instruction.description}
                          {isRecommended(instruction) && (
                            <VICon
                              title="recommended"
                              icon={FaCheckCircle}
                              size={10}
                              className="mt-0.5 text-theme-positive"
                            />
                          )}
                        </div>
                      }
                      value={instruction.id}
                      checked={selectedInstructions.some((inst) => inst.id === instruction.id)}
                      onChange={() => handleCheckboxChange(instruction)}
                      wrapperClasses="flex items-center"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export { ConfigureInstructions };
