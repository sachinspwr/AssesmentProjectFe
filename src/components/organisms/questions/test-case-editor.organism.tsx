import React, { useState } from 'react';
import { VButton, VCard, VICon } from '@components/atoms';
import { VLabelledInput, VLabelledTextArea } from '@components/molecules';
import { VTypography } from '@components/molecules/typography/v-typography.mol';
import { PiTrashLight } from 'react-icons/pi';

type TestCase = {
  id: string;
  input: string;
  output: string;
  explanation: string;
  isExample?: boolean;
};

type TestCaseEditorProps = {
  initialCases?: TestCase[];
  onCasesChange: (cases: TestCase[]) => void;
};

// eslint-disable-next-line react/function-component-definition
const TestCaseEditor: React.FC<TestCaseEditorProps> = ({ initialCases = [], onCasesChange }) => {
  const [testCases, setTestCases] = useState<TestCase[]>(initialCases);

  const handleCase = (action: 'add' | 'remove' | 'update', id?: string, field?: keyof Omit<TestCase, 'id'>, value?: string | boolean) => {
    let newCases = [...testCases];
    if (action === 'add') newCases = [...testCases, { id: Math.random().toString(36).substring(2, 9), input: '', output: '', explanation: '', isExample: true }];
    if (action === 'remove' && testCases.length > 1) newCases = testCases.filter(tc => tc.id !== id);
    if (action === 'update' && id && field) newCases = testCases.map(tc => tc.id === id ? { ...tc, [field]: value } : tc);
    
    setTestCases(newCases);
    onCasesChange(newCases);
  };

  return (
    <div className="space-y-4">
      {testCases.map((tc, i) => (
        <VCard key={tc.id} className="shadow-sm p-3 mb-3">
          <div className="flex justify-between items-center mb-2">
            <VTypography as="h6">Test Case {i + 1}</VTypography>
            {<VICon icon={PiTrashLight} onClick={() => handleCase('remove', tc.id)} size={20} className="!w-8 text-theme-negative" />}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-2">
            <VLabelledTextArea name="input" label="Input" rows={2} placeholder='nums  = [2, 7, 11, 15], target = 9' onChange={(_, e) => handleCase('update', tc.id, 'input', e!.target.value)} />
            <VLabelledTextArea name="output" label="Output" rows={2}  placeholder='[0, 1]' onChange={(_, e) => handleCase('update', tc.id, 'output', e!.target.value)} />
          </div>

          <VLabelledInput name="explanation" label="Explanation (Optional)" placeholder='Because nums[0] + nums[1] == 9' value={tc.explanation} 
            onChange={(_, e) => handleCase('update', tc.id, 'explanation', e!.target.value)} />
        </VCard>
      ))}

      <VButton type="button" onClick={() => handleCase('add')} className="!w-3/12">+ Add Test Case</VButton>
    </div>
  );
};

export default TestCaseEditor;