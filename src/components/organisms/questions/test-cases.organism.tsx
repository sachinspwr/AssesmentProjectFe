import { VButton, VICon } from "@components/atoms";
import { VLabelledDropdown, VLabelledInput } from "@components/molecules/index";
import { VTypography } from "@components/molecules/typography/v-typography.mol";
import { VFormFieldData } from "@types";
import { TestCaseKind } from "@utils/enums/test-kind.enum";
import { FaTrashAlt } from "react-icons/fa";
import { IoAdd } from "react-icons/io5";

export interface TestCase {
  caseNumber: number;
  title: string;
  input: string;
  expectedOutput: string;
  kind: TestCaseKind;
  weight: number;
  isPublic: boolean;
}

interface TestCaseListProps {
  name: string;
  label?: string;
  value: TestCase[];
  onChange: (value: TestCase[] | string, additionalUpdates?: Partial<VFormFieldData>) => void;
  disabled?: boolean;
}

export function TestCaseList({
  name,
  label = 'Test Cases',
  value = [],
  onChange,
  disabled = false,
}: TestCaseListProps) {
  const handleAdd = () => {
    onChange([
      ...value,
      {
        caseNumber: value.length + 1,
        title: `Test Case ${value.length + 1}`,
        input: '',
        expectedOutput: '',
        kind: TestCaseKind.Sample,
        weight: 30,
        isPublic: false,
      }
    ]);
  };

  const testKindOptions = Object.values(TestCaseKind).map(kind => ({
    value: kind,
    label: kind
  }));

  const handleRemove = (index: number) => {
    const updated = value.filter((_, i) => i !== index)
      .map((tc, i) => ({ ...tc, caseNumber: i + 1 })); // Reorder after deletion
    onChange(updated);
  };

  const handleChange = (index: number, field: keyof TestCase, newValue: TestCase[keyof TestCase]) => {
    const updated = [...value];
    updated[index] = { ...updated[index], [field]: newValue };
    onChange(updated);
  };

  return (
    <div className="flex flex-col gap-4 border-b-2 pb-5">
      {label && <VTypography as="h5" color="secondary">{label}</VTypography>}

      {value.map((testCase, index) => (
        <div key={index} className="">
          <div className="grid grid-cols-12 gap-4 items-end mb-4">
            {/* Order Field */}
            <div className="col-span-1">
              <VLabelledInput
                label="Order"
                name={`${name}[${index}].caseNumber`}
                type="number"
                value={String(testCase.caseNumber)}
                disabled={disabled}
                onChange={(v) => handleChange(index, 'caseNumber', Number(v))}
              />
            </div>

            {/* Title Field */}
            <div className="col-span-2">
              <VLabelledInput
                label="Title"
                name={`${name}[${index}].title`}
                value={testCase.title}
                disabled={disabled}
                onChange={(v) => handleChange(index, 'title', v)}
              />
            </div>

            {/* Kind Dropdown */}
            <div className="col-span-2">
              <VLabelledDropdown
                label="Type"
                name={`${name}[${index}].kind`}
                value={testCase.kind}
                options={testKindOptions}
                disabled={disabled}
                onChange={(v) => handleChange(index, 'kind', v as TestCaseKind)}
              />
            </div>
            <div className="col-span-3">
              <VLabelledInput
                label="Input"
                name={`${name}[${index}].input`}
                value={testCase.input}
                disabled={disabled}
                onChange={(v) => handleChange(index, 'input', v)}
              />
            </div>

            <div className="col-span-3">
              <VLabelledInput
                label="Expected Output"
                name={`${name}[${index}].expectedOutput`}
                value={testCase.expectedOutput}
                disabled={disabled}
                onChange={(v) => handleChange(index, 'expectedOutput', v)}
              />
            </div>

            {/* Delete Button */}
            <div className="col-span-1 flex justify-end">
              <VButton
                variant="link"
                type="button"
                className="!text-theme-negative"
                disabled={disabled}
                onClick={() => handleRemove(index)}
              >
                <VICon icon={FaTrashAlt} size={18} />
              </VButton>
            </div>
          </div>
        </div>
      ))}
      <VButton
        variant="link"
        type="button"
        disabled={disabled}
        onClick={handleAdd}
        className="!w-fit"
      >
        <VICon icon={IoAdd} className="mt-0.5" size={20} />
        <span className="mt-1">Add Test Case</span>
      </VButton>
    </div>
  );
};
