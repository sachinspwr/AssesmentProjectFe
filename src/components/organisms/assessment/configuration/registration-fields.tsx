import { VCheckbox } from '@components/molecules/checkbox/v-checkbox.mol';
import { VLoader } from '@components/molecules/loader/v-loader.mol';
import { VTypography } from '@components/molecules/typography/v-typography.mol';
import { TestRegistrationFieldOptionResponseDTO } from '@dto/response/registration-field-option-response.dto';
import { mapper } from 'mapper';
import { TestRegistrationFieldOption } from 'models/test/registration-field-opition';
import React, { forwardRef, useEffect, useImperativeHandle, useMemo, useState } from 'react';
import { useFetchRegistrationFieldsOptionQuery } from 'store/slices/test-registration-field-option.slice';

type AssessmentButtonProps = {
  selectedFields: TestRegistrationFieldOption[];
  setSelectedFields: (selected: TestRegistrationFieldOption[]) => void;
  onLoadingPrereq?: (status: boolean) => void;
};

export type RegistrationFieldsRef = {
  validate: () => boolean;
  getValues: () => string[];
};

const ConfigureRegistrationFields = forwardRef<RegistrationFieldsRef, AssessmentButtonProps>(
  ({ selectedFields, setSelectedFields, onLoadingPrereq }, ref) => {
    const [localSelectedFields, setLocalSelectedFields] = useState<TestRegistrationFieldOption[]>(selectedFields);
    const { data: registrationFieldsFetched, isLoading } = useFetchRegistrationFieldsOptionQuery();

    const registrationFields = useMemo(() => {
      if (!registrationFieldsFetched) return [];
      return registrationFieldsFetched.map((dto) =>
        mapper.map(dto, TestRegistrationFieldOptionResponseDTO, TestRegistrationFieldOption)
      );
    }, [registrationFieldsFetched]);

    useEffect(() => {
      onLoadingPrereq?.(isLoading);
    }, [isLoading, onLoadingPrereq]);

    useEffect(() => {
      setLocalSelectedFields(selectedFields);
    }, [selectedFields]);

    const handleCheckboxChange = (field: TestRegistrationFieldOption, checked: boolean) => {
      const newSelection = checked
        ? [...localSelectedFields, field]
        : localSelectedFields.filter((f) => f.id !== field.id);

      setLocalSelectedFields(newSelection);
      setSelectedFields(newSelection);
    };

    useImperativeHandle(ref, () => ({
      validate: () => {
        return localSelectedFields.length > 0;
      },
      getValues: () => localSelectedFields.map((f) => f.id),
    }));

    return (
      <div>
        <div className="flex flex-col gap-5">
          <VTypography as="h3">Registration Fields for Candidates</VTypography>
          <VTypography as="p">
            Select the fields to show for candidates during assessment registration.
          </VTypography>
        </div>
        <div className="mt-4 my-5">
          {isLoading ? (
            <VLoader size="md" classNames='my-8' />
          ) : Array.isArray(registrationFields) && registrationFields.length > 0 ? (
            <div className="mt-4 my-5 grid grid-cols-4 gap-4">
              {registrationFields.map((field) => (
                <VCheckbox
                  key={field.id}
                  name="registrationFields"
                  label={field.label}
                  value={field.id}
                  checked={localSelectedFields.some((f) => f.id === field.id)}
                  onChange={(_, __, checked) => handleCheckboxChange(field, checked ?? false)}
                />
              ))}
            </div>
          ) : (
            <p>No registration fields available.</p>
          )}
        </div>
        <hr />
      </div>
    );
  }
);

export { ConfigureRegistrationFields };
