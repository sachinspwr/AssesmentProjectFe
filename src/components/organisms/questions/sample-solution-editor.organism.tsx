/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { VButton, VICon, VTextArea } from '@components/atoms';
import { PiTrashLight, PiPlusLight } from 'react-icons/pi';
import { VDropdown, VIConButton } from '@components/molecules/index';
import { VTypography } from '@components/molecules/typography/v-typography.mol';

type CodeSolution = {
  id: string;
  language: string;
  code: string;
};

const SUPPORTED_LANGUAGES = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'python', label: 'Python' },
  { value: 'java', label: 'Java' },
  { value: 'cpp', label: 'C++' },
  { value: 'go', label: 'Go' },
];

function SampleSolutionsEditor({
  initialSolutions = [],
  onChange,
}: {
  initialSolutions?: Omit<CodeSolution, 'id'>[];
  onChange: (solutions: Omit<CodeSolution, 'id'>[]) => void;
}) {
  const [solutions, setSolutions] = useState<CodeSolution[]>(
    initialSolutions.map((s) => ({ ...s, id: Math.random().toString(36).substr(2, 9) }))
  );

  const handleAddSolution = () => {
    const newSolutions = [
      ...solutions,
      {
        id: Math.random().toString(36).substr(2, 9),
        language: 'javascript',
        code: '',
      },
    ];
    setSolutions(newSolutions);
    onChange(newSolutions.map(({ id, ...rest }) => rest));
  };

  const handleRemoveSolution = (id: string) => {
    if (solutions.length === 0) return;
    const newSolutions = solutions.filter((s) => s.id !== id);
    setSolutions(newSolutions);
    onChange(newSolutions.map(({ id, ...rest }) => rest));
  };

  const handleSolutionChange = (id: string, field: keyof CodeSolution, value: string) => {
    const newSolutions = solutions.map((s) => (s.id === id ? { ...s, [field]: value } : s));
    setSolutions(newSolutions);
    onChange(newSolutions.map(({ id, ...rest }) => rest));
  };

  return (
    <div className="space-y-4">
      {solutions.map((solution, index) => (
        <div key={solution.id} className="border rounded-lg p-4 relative">
          <div className="flex justify-between items-center mb-2">
            <VDropdown
              name="solution"
              value={solution.language}
              onChange={(v, e) => handleSolutionChange(solution.id, 'language', e.target.value)}
              options={SUPPORTED_LANGUAGES}
              wrapperClasses="w-4/12"
            />
              <VICon
                icon={PiTrashLight}
                onClick={() => handleRemoveSolution(solution.id)}
                size={20}
                className="!w-8 text-theme-negative"
              />
          </div>
          <VTextArea
            name="code"
            value={solution.code}
            onChange={(v, e) => handleSolutionChange(solution.id, 'code', e!.target.value)}
            rows={8}
            className="font-mono text-sm"
            placeholder={`Enter ${solution.language} solution code...`}
          />
        </div>
      ))}
      <VButton type="button" onClick={() => handleAddSolution()} className="!w-3/12">
        + Add Solution
      </VButton>
    </div>
  );
}

export default SampleSolutionsEditor;
