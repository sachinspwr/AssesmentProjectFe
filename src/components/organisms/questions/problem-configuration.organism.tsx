/* eslint-disable @typescript-eslint/no-explicit-any */
import { VLabelledDropdown, VLabelledTextArea } from "@components/molecules/index";
import { VTypography } from "@components/molecules/typography/v-typography.mol";
import { VFormFieldData } from "@types";
import { CodingQuestionGradingStrategy } from "@utils/enums/coding-question-grading-strategy.enum";
import { ProgrammingLanguage } from "@utils/enums/programming-language.enum";

export interface ProblemStatementValues {
    primaryLanguage?: ProgrammingLanguage | '';
    allowedLanguages: ProgrammingLanguage[];
    gradingStrategy: CodingQuestionGradingStrategy | '';
    timeLimitMs: number | '';
    memoryLimitKb: number | '';
    maxSubmissionCount: number | '';
    inputFormat?: { description: string };
    outputFormat?: { description: string };
}

interface ProblemStatementListProps {
    name: string;
    label?: string;
    value: ProblemStatementValues;
    onChange: (value: ProblemStatementValues | string, additionalUpdates?: Partial<VFormFieldData>) => void;
    disabled?: boolean;
}

const emptyProblemStatementValues: ProblemStatementValues = {
    gradingStrategy: '',
    primaryLanguage: '',
    allowedLanguages: [],
    timeLimitMs: '',
    memoryLimitKb: '',
    maxSubmissionCount: '',
    inputFormat: { description: '' },
    outputFormat: { description: '' },
};

export function ProblemStatementList({
    name,
    label = 'Configuration',
    value = emptyProblemStatementValues,
    onChange,
    disabled = false,
}: ProblemStatementListProps) {
    const languageOptions = Object.values(ProgrammingLanguage).map(lang => ({
        value: lang,
        label: lang.charAt(0).toUpperCase() + lang.slice(1),
    }));

    const gradingStrategyOptions = [
        { value: CodingQuestionGradingStrategy.TestCases, label: 'Test Cases' },
        { value: CodingQuestionGradingStrategy.OutputMatch, label: 'Output Match' },
        { value: CodingQuestionGradingStrategy.Custom, label: 'Custom Evaluator' },
    ];
    
    const timeLimitOptions = [
        { value: '1000', label: '1 second' },
        { value: '2000', label: '2 seconds' },
        { value: '3000', label: '3 seconds' },
        { value: '5000', label: '5 seconds' },
        { value: '10000', label: '10 seconds' },
    ];

    const memoryLimitOptions = [
        { value: '128000', label: '128 MB' },
        { value: '256000', label: '256 MB' },
        { value: '512000', label: '512 MB' },
        { value: '1024000', label: '1 GB' },
    ];

    const submissionCountOptions = [
        { value: '3', label: '3 attempts' },
        { value: '5', label: '5 attempts' },
        { value: '10', label: '10 attempts' },
        { value: '15', label: '15 attempts' },
    ];

    const handleChange = (field: keyof ProblemStatementValues, newValue: any) => {
        const updated = { ...value, [field]: newValue };

        // Ensure primary language is in allowed languages
        if (field === 'allowedLanguages' && !newValue.includes(value.primaryLanguage)) {
            updated.primaryLanguage = newValue[0] || ProgrammingLanguage.Typescript;
        }

        onChange(updated, {});
    };

    // Special handler for format descriptions
    const handleFormatChange = (field: 'inputFormat' | 'outputFormat', description: string) => {
        const updated = {
            ...value,
            [field]: {
                ...(value[field] || {}), // Preserve existing properties if any
                description
            }
        };
        console.log('Updated format:', field, updated[field]);
        onChange(updated, {});
    };

    return (
        <div className="flex flex-col gap-4 border-b-2 pb-4">
            {label && <VTypography as="h5" color="secondary">{label}</VTypography>}

            <div className="grid grid-cols-12 gap-4 items-end">
                {/* Grading Strategy */}
                <div className="col-span-12 md:col-span-3">
                    <VLabelledDropdown
                        label="Grading Strategy"
                        name={`${name}.gradingStrategy`}
                        value={value.gradingStrategy}
                        options={gradingStrategyOptions}
                        disabled={disabled}
                        onChange={(v) => handleChange('gradingStrategy', v)}
                        placeholder="Select Grading Strategy"
                    />
                </div>

                {/* Primary Language */}
                <div className="col-span-12 md:col-span-3">
                    <VLabelledDropdown
                        label="Primary Language"
                        name={`${name}.primaryLanguage`}
                        value={value.primaryLanguage}
                        options={languageOptions}
                        disabled={disabled}
                        onChange={(v) => handleChange('primaryLanguage', v)}
                        placeholder="Select Primary Language"
                    />
                </div>

                {/* Time Limit */}
                <div className="col-span-12 md:col-span-3">
                    <VLabelledDropdown
                        label="Time Limit"
                        name={`${name}.timeLimitMs`}
                        value={value.timeLimitMs !== '' ? String(value.timeLimitMs) : ''}
                        options={timeLimitOptions}
                        disabled={disabled}
                        onChange={(v) => handleChange('timeLimitMs', v)}
                        placeholder="Select Time Limit"
                    />
                </div>

                {/* Memory Limit */}
                <div className="col-span-12 md:col-span-3">
                    <VLabelledDropdown
                        label="Memory Limit"
                        name={`${name}.memoryLimitKb`}
                        value={value.memoryLimitKb !== '' ? String(value.memoryLimitKb) : ''}
                        options={memoryLimitOptions}
                        disabled={disabled}
                        onChange={(v) => handleChange('memoryLimitKb', v)}
                        placeholder="Select Memory Limit"
                    />
                </div>
            </div>

            <div className="grid grid-cols-12 gap-4 items-end">
                {/* Max Submissions */}
                <div className="col-span-12 md:col-span-3">
                    <VLabelledDropdown
                        label="Max Submissions"
                        name={`${name}.maxSubmissionCount`}
                        value={value.maxSubmissionCount !== '' ? String(value.maxSubmissionCount) : ''}
                        options={submissionCountOptions}
                        disabled={disabled}
                        onChange={(v) => handleChange('maxSubmissionCount', v)}
                        placeholder="Select Max Submissions"
                    />
                </div>
                {/* Allowed Languages */}
                <div className="col-span-12 md:col-span-5">
                    <VLabelledDropdown
                        label="Allowed Languages"
                        name={`${name}.allowedLanguages`}
                        value={value.allowedLanguages}
                        options={languageOptions}
                        disabled={disabled}
                        onChange={(v) => handleChange('allowedLanguages', v)}
                        isMultiSelect
                        placeholder="Select Allowed Languages"
                    />
                </div>
            </div>
            <VTypography as="h5" color="secondary" className='my-1'>Input Output Format</VTypography>
            <div className="grid grid-cols-12 gap-4">
                <div className="col-span-12 md:col-span-6">
                    <VLabelledTextArea
                        label="Input Description"
                        name={`${name}.inputFormat.description`}
                        value={value.inputFormat?.description || ''}
                        onChange={(v) => handleFormatChange('inputFormat', v)}
                        placeholder="Describe the input format"
                        disabled={disabled}
                        rows={3}
                    />
                </div>

                <div className="col-span-12 md:col-span-6">
                    <VLabelledTextArea
                        label="Output Description"
                        name={`${name}.outputFormat.description`}
                        value={value.outputFormat?.description || ''}
                        onChange={(v) => handleFormatChange('outputFormat', v)}
                        placeholder="Describe the output format"
                        disabled={disabled}
                        rows={3}
                    />
                </div>
            </div>
        </div>
    );
}