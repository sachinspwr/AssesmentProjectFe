import React, { useState, forwardRef, useImperativeHandle, useEffect } from 'react';
import { Button, Icon, Label, VButton } from '@components/atoms';
import { Checkbox, DatePicker, LabelledInput } from '@components/molecules';
import { IConInput } from '@components/molecules/icon-input/icon-input.mol';
import { LabelledTextArea } from '@components/molecules/labelled-text-area/labelled-text-area-component';
import { FormFields, FormField, FormFieldData } from '@types';
import { IoAdd, IoRemove } from 'react-icons/io5';
import { GoInfo } from 'react-icons/go';
import { VLabelledDropdown } from '@components/molecules/dropdown/v-labelled-dropdown.mol';

export type DynamicFormProps = {
  config: FormFields[];
  verticalSpacing?: number;
  showSubmit?: boolean;
  submitButtonLabel?: string;
  submitButtonClasses?: {
    wrapper?: string;
    button?: string;
  };
  submitButtonLoading?: boolean;
  className?: string;
  contentClasses?: string;
  onSubmit: (fieldData: FormFieldData) => void;
};

export type DynamicFormHandle = {
  submit: () => void;
};

const DynamicForm = forwardRef<DynamicFormHandle, DynamicFormProps>(
  (
    {
      config,
      verticalSpacing = 1,
      submitButtonLabel,
      submitButtonLoading,
      showSubmit = true,
      className,
      contentClasses,
      submitButtonClasses = { wrapper: '', button: 'w-full' },
      onSubmit,
    },
    ref
  ) => {
    const [formData, setFormData] = useState<FormFieldData>({});
    const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

    useImperativeHandle(ref, () => ({
      submit: () => {
        const event = new Event('submit', { bubbles: true });
        document.querySelector('form')?.dispatchEvent(event);
      },
    }));

    useEffect(() => {
      const hiddenFields = config.filter((x) => x.type === 'hidden');

      hiddenFields.forEach((x) => {
        if (x.type !== 'group') {
          setFormData((prevData) => ({ ...prevData, [x.name]: x.value! }));
        }
      });
    }, [config]);

    const handleChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
      checkboxOnChange?: (value: string) => void
    ) => {
      const { name, value, type } = e.target;

      const fieldValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
      setFormData((prevData) => ({ ...prevData, [name]: fieldValue }));
      validateField(name, fieldValue);
      checkboxOnChange && checkboxOnChange(fieldValue as string);
    };

    const handleListChange = (name: string, index: number, value: string) => {
      setFormData((prevData) => {
        const updatedList = [...(prevData[name] as string[])];
        updatedList[index] = value;
        return { ...prevData, [name]: updatedList };
      });
      validateField(name, value);
    };

    const handleAddToList = (name: string) => {
      setFormData((prevData) => {
        const updatedList = [...((prevData[name] as string[]) || []), ''];
        return { ...prevData, [name]: updatedList };
      });
    };

    const handleRemoveFromList = (name: string, index: number) => {
      setFormData((prevData) => {
        const updatedList = [...(prevData[name] as string[])];
        updatedList.splice(index, 1);
        return { ...prevData, [name]: updatedList };
      });
    };

    const handleDateChange = (name: string, date: Date) => {
      setFormData((prevData) => ({ ...prevData, [name]: date }));
      validateField(name, date);
    };

    const validateField = (name: string, value: string | boolean | Date) => {
      const validFields = config.flatMap((item) => (item.type === 'group' ? item.fields : [item]));
      const targetField = (validFields as FormField[]).find((field) => field.name === name);
      const newFormErrors: { [key: string]: string } = {};

      if (targetField) {
        if (targetField.required && !value) {
          newFormErrors[targetField.name] = `${targetField.label ?? 'field'} is required`;
        } else if (targetField.validate) {
          const error = targetField.validate(value);
          if (error) {
            newFormErrors[targetField.name] = error;
          }
        }
      }

      setFormErrors((prevErrors) => {
        const updatedErrors = { ...prevErrors, ...newFormErrors };

        // If the field is now valid, remove it from the error state
        if (value && updatedErrors[name]) {
          delete updatedErrors[name];
        }

        return updatedErrors;
      });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const newFormErrors: { [key: string]: string } = {};

      const configFfields = config.flatMap((item) => (item.type == 'group' ? item.fields : [item]));

      configFfields.forEach((field) => {
        if (field.required && !formData[field.name]) {
          newFormErrors[field.name] = `${field.label ?? 'field'} is required`;
        } else if (field.validate) {
          const error = field.validate(formData[field.name]);
          if (error) {
            newFormErrors[field.name] = error;
          }
        }
      });

      if (Object.keys(newFormErrors).length > 0) {
        setFormErrors(newFormErrors);
        return;
      }

      onSubmit(formData);
    };

    const renderField = (field: FormField) => {
      if (field.type === 'hidden') {
        return null;
      }

      return (
        <div key={field.name} style={{ marginBottom: '1rem' }}>
          {field.type === 'text' || field.type === 'email' || field.type === 'password' || field.type === 'number' ? (
            field.fieldWith === 'icon' ? (
              <IConInput
                icon={field.icon!}
                name={field.name}
                placeholder={field.placeholder}
                type={field.type}
                required={field.required}
                disabled={field.disabled}
                onChange={(_, originalEvent) => handleChange(originalEvent!)}
              />
            ) : (
              <LabelledInput
                label={field.label!}
                name={field.name}
                value={field.value}
                placeholder={field.placeholder}
                type={field.type}
                required={field.required}
                disabled={field.disabled}
                onChange={(_, originalEvent) => handleChange(originalEvent!)}
              />
            )
          ) : field.type === 'date' ? (
            <>
              <Label>{field.label}</Label>
              <DatePicker
                className="w-full border rounded-lg p-2"
                onChange={(date: Date) => handleDateChange(field.name, date)}
              />
            </>
          ) : field.type === 'select' ? (
            <VLabelledDropdown
              name={field.name}
              label={field.label ?? 'Select value'}
              options={field.options!}
              disabled={field.disabled}
              placeholder={field.placeholder ?? 'Select value'}
              onChange={(_, originalEvent) => handleChange(originalEvent!, field.onChange)}
            />
          ) : field.type === 'checkbox' ? (
            <Checkbox
              value={field.value!}
              label={field.label ?? 'Select value'}
              name={field.name}
              required={field.required}
              onChange={(_, originalEvent) => handleChange(originalEvent!, field.onChange)}
            />
          ) : field.type === 'text-area' ? (
            <LabelledTextArea
              rows={field.textAreaRows ?? 3}
              value={field.value!}
              label={field.label}
              name={field.name}
              required={field.required}
              disabled={field.disabled}
              labelClasses="text-md"
              onChange={(_, originalEvent) => handleChange(originalEvent!)}
            />
          ) : field.type === 'list' ? (
            <div>
              <Label>{field.label}</Label>
              {((formData[field.name] as string[]) || []).map((item, index) => (
                <div key={index} className="w-full flex flex-row items-center mb-2">
                  <LabelledInput
                    label=""
                    name={`${field.name}[${index}]`}
                    value={item}
                    placeholder={field.placeholder}
                    type="text"
                    required={field.required}
                    disabled={field.disabled}
                    onChange={(v) => handleListChange(field.name, index, v)}
                    wrapperClasses="w-full"
                  />
                  <Button
                    varient="no-background-border"
                    type="button"
                    className="ml-2 flex justify-center items-center gap-1 focus:!ring-0"
                    onClick={() => handleRemoveFromList(field.name, index)}
                  >
                    <Icon icon={IoRemove} />
                  </Button>
                </div>
              ))}
              <p>
                <Button
                  varient="no-background-border"
                  type="button"
                  className="flex justify-center items-center gap-1 hover:scale-110 focus:!ring-0"
                  onClick={() => handleAddToList(field.name)}
                >
                  <Icon icon={IoAdd} />
                  <span className="mt-1">ADD</span>
                </Button>
              </p>
            </div>
          ) : field.type === 'custom' ? (
            field.customContent
          ) : null}
          {formErrors[field.name] && (
            <p className="flex align-middle gap-1 text-theme-negative text-sm mt-1">
              <GoInfo className="mt-1" />
              {formErrors[field.name]}
            </p>
          )}
        </div>
      );
    };

    return (
      <form onSubmit={handleSubmit} className={`flex flex-col gap-${verticalSpacing} w-full ${className}`}>
        <div className={contentClasses}>
          {config.map((field) => {
            if (field.type === 'group') {
              return (
                <>
                  {field.label && <Label>{field.label}</Label>}
                  <div className="flex gap-5">
                    {field.fields.map((field) => (
                      <div key={field.name} className={`w-full`}>
                        {renderField(field as FormField)}
                      </div>
                    ))}
                  </div>
                </>
              );
            }
            return renderField(field as FormField);
          })}
        </div>
        {showSubmit && (
          <div className={submitButtonClasses?.wrapper}>
            <VButton type="submit" isLoading={submitButtonLoading} className={`${submitButtonClasses?.button}`}>
              {submitButtonLabel ?? 'SUBMIT'}
            </VButton>
          </div>
        )}
      </form>
    );
  }
);

DynamicForm.displayName = 'DynamicForm';

export { DynamicForm };
