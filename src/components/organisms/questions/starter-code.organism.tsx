import { VButton, VICon } from "@components/atoms";
import { VLabelledDropdown, VLabelledTextArea } from "@components/molecules/index";
import { VTypography } from "@components/molecules/typography/v-typography.mol";
import { VFormFieldData } from "@types";
import { ProgrammingLanguage } from "@utils/enums/programming-language.enum";
import { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { IoAdd } from "react-icons/io5";
import { defaultTemplates } from "./default-templates";

export interface StarterCode {
    // order: number;
    language: ProgrammingLanguage;
    template: string;
    solutionCode: string;
}

interface StarterCodeListProps {
    name: string;
    label?: string;
    value: StarterCode[];
    allowedLanguages?: ProgrammingLanguage[];
    onChange: (value: StarterCode[] | string, additionalUpdates?: Partial<VFormFieldData>) => void;
}

export function StarterCodeList({
    name,
    label = 'Starter Codes',
    value = [],
    allowedLanguages,
    onChange,
}: StarterCodeListProps) {
    const [newLanguage, setNewLanguage] = useState<ProgrammingLanguage | ''>('');
    const languageOptions = (allowedLanguages ?? Object.values(ProgrammingLanguage)).map((lang) => ({
        value: lang,
        label: lang.charAt(0).toUpperCase() + lang.slice(1),
    }));

    const availableLanguages = languageOptions.filter(opt =>
        !value.some(code => code.language === opt.value)
    );

    const handleAdd = () => {
        // Use first available language if none selected
        const languageToAdd = newLanguage || (availableLanguages[0]?.value ?? '');
        if (!languageToAdd) return;

        // Get default template for the selected language
        const defaultTemplate = defaultTemplates[languageToAdd.toLowerCase() as keyof typeof defaultTemplates] || {
            template: '',
            solutionCode: ''
        };

        const updated = [
            ...value,
            {
                language: languageToAdd,
                template: defaultTemplate.template,  // Use default template
                solutionCode: defaultTemplate.solutionCode  // Use default solution
            }
        ];
        onChange(updated, {});
        setNewLanguage('');
    };

    const handleRemove = (index: number) => {
        const updated = value.filter((_, i) => i !== index)
            .map((sc, i) => ({ ...sc, order: i + 1 }));
        onChange(updated, {});
    };

    const handleChange = (index: number, field: keyof StarterCode, newValue: string | ProgrammingLanguage) => {
        const updated = [...value];
        const current = updated[index];

        // If changing language, update template and solution as well
        if (field === 'language') {
            const langKey = (newValue as string).toLowerCase() as keyof typeof defaultTemplates;
            const defaults = defaultTemplates[langKey] ?? {
                template: '',
                solutionCode: '',
            };

            updated[index] = {
                ...current,
                language: newValue as ProgrammingLanguage,
                template: defaults.template,
                solutionCode: defaults.solutionCode,
            };
        } else {
            updated[index] = { ...current, [field]: newValue };
        }

        onChange(updated, {});
    };

    return (
        <div className="flex flex-col gap-4">
            {label && <VTypography as="h5" color="secondary">{label}</VTypography>}

            {/* Starter Code Entries */}
            {value.map((starterCode, index) => {
                const usedLanguages = value.map(v => v.language);
                const rowLanguageOptions = languageOptions.filter(opt =>
                    opt.value === starterCode.language || !usedLanguages.includes(opt.value)
                );

                return (
                    <div key={index} className="">
                        <div className="grid grid-cols-12 gap-4 items-stert">
                            <div className="col-span-3">
                                <VLabelledDropdown
                                    label="Language"
                                    name={`${name}[${index}].language`}
                                    value={starterCode.language}
                                    options={rowLanguageOptions}
                                    onChange={(v) => handleChange(index, 'language', Array.isArray(v) ? v[0] : v)}
                                />
                            </div>

                            <div className="col-span-8 grid grid-cols-2 gap-4">
                                <VLabelledTextArea
                                    label="Template Code"
                                    name={`${name}[${index}].template`}
                                    value={starterCode.template}
                                    rows={6}
                                    className="font-mono text-sm"
                                    onChange={(v) => handleChange(index, 'template', v)}
                                />
                                <VLabelledTextArea
                                    label="Solution Code"
                                    name={`${name}[${index}].solution`}
                                    value={starterCode.solutionCode}
                                    rows={6}
                                    className="font-mono text-sm"
                                    onChange={(v) => handleChange(index, 'solutionCode', v)}
                                />
                            </div>

                            <div className="col-span-1 flex justify-center">
                                <VButton
                                    variant="link"
                                    type="button"
                                    className="!text-theme-negative !w-8"
                                    onClick={() => handleRemove(index)}
                                >
                                    <VICon icon={FaTrashAlt} size={18} />
                                </VButton>
                            </div>
                        </div>
                    </div>
                );
            })}

            {/* Add Language Section */}
            <div className="grid grid-cols-12 gap-4 items-end">

                <div className="col-span-4">
                    <VButton
                        variant="link"
                        type="button"
                        disabled={availableLanguages.length === 0}
                        onClick={handleAdd}
                        className="!w-fit"
                    >
                        <VICon icon={IoAdd} className="mt-0.5" size={20} />
                        <span className="mt-1">Add Starter Code</span>
                    </VButton>
                </div>
            </div>
        </div>
    );
}