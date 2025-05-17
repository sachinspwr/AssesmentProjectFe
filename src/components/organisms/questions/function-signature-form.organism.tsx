import { VLabelledInput } from '@components/molecules/index';
import React, { useImperativeHandle, useState, forwardRef } from 'react';

export type FunctionSignatureValues = {
  functionName: string;
  inputFormat: string;
  outputFormat: string;
};

export interface FunctionSignatureFormRef {
  getValues: () => FunctionSignatureValues;
}

const FunctionSignatureForm = forwardRef<FunctionSignatureFormRef>((_, ref) => {
  const [values, setValues] = useState<FunctionSignatureValues>({
    functionName: '',
    inputFormat: '',
    outputFormat: '',
  });

  useImperativeHandle(ref, () => ({
    getValues: () => values,
  }));

  const handleChange = (key: keyof FunctionSignatureValues, val: string) => {
    setValues((prev) => ({ ...prev, [key]: val }));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <VLabelledInput
        name="functionName"
        label="Function Name"
        value={values.functionName}
        onChange={(val) => handleChange('functionName', val)}
        placeholder="e.g. twoSum"
      />
      <VLabelledInput
        name="inputFormat"
        label="Input Format"
        value={values.inputFormat}
        onChange={(val) => handleChange('inputFormat', val)}
        placeholder="e.g. nums: number[], target: number"
      />
      <VLabelledInput
        name="outputFormat"
        label="Output Format"
        value={values.outputFormat}
        onChange={(val) => handleChange('outputFormat', val)}
        placeholder="e.g. number[]"
      />
    </div>
  );
});

export default FunctionSignatureForm;
