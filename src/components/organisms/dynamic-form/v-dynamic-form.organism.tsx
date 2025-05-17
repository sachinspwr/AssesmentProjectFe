import React, { useState, forwardRef, useImperativeHandle, useEffect, useRef } from 'react';
import { VButton, VICon, VLabel, VSwitch } from '@components/atoms';
import { VCheckbox, VIConInput, VLabelledTextArea } from '@components/molecules';
import { IoAdd } from 'react-icons/io5';
import { GoInfo } from 'react-icons/go';
import { VLabelledDropdown } from '@components/molecules/dropdown/v-labelled-dropdown.mol';
import { VLabelledInput } from '@components/molecules/labelled-input/v-labelled-input.mol';
import { VLabelledDatePicker } from '@components/molecules/date-picker/v-labelled-date-picker.mol';
import { VFormFieldData, VFormField, VFormFields } from '@types';
import { FaTrashAlt } from 'react-icons/fa';

export type VDynamicFormProps = {
  config: VFormFields[];
  renderMode?: ActionMode;
  spacing?: number;
  isFormSubmitting?: boolean;
  className?: string;
  contentClasses?: string;
  initialValues?: VFormFieldData; // New prop for initial values
  onSubmit: (fieldData: VFormFieldData) => void;
};

export type VDynamicFormHandle = {
  submit: () => void;
  isValid: () => boolean;
};

const VDynamicForm = forwardRef<VDynamicFormHandle, VDynamicFormProps>(
  (
    { config, spacing = 5, isFormSubmitting, className, contentClasses, initialValues, onSubmit},
    ref
  ) => {
    const [formData, setFormData] = useState<VFormFieldData>({}); // Initialize with initialValues
    const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
    const lastPosition = useRef<{ row: number; col: number; span: number }>({ row: 1, col: 1, span: 12 });

    useEffect(() => {
      if(initialValues){
        setFormData(initialValues)
      } 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useImperativeHandle(ref, () => ({
      submit: () => {
        const event = new Event('submit', { bubbles: true });
        document.querySelector('form')?.dispatchEvent(event);
      },
      isValid: (): boolean => {
        const configFields = config.flatMap((item) => (item.type === 'group' ? item.fields : [item]));

        return configFields.every((field) => {
          const value = formData[field.name];

          if (field.required && !value) return false;

          if (field.validate) {
            const error = field.validate(value, formData);
            if (error) return false;
          }

          return true;
        });
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
      customHandler?: (value: string) => void
    ) => {
      const { name, value, type } = e.target;
      const fieldValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    
      setFormData(prevData => {
        const updatedData = { ...prevData, [name]: fieldValue };
        
        // Process computed fields
        const processFields = (fields: VFormFields[]) => {
          fields.forEach(field => {
            if ('fields' in field) {
              processFields(field.fields);
            } else if (field.computeDependencies?.includes(name) && field.compute) {
              updatedData[field.name] = field.compute(updatedData) ?? '';
            }
          });
        };
        
        processFields(config);
        return updatedData;
      });
    
      validateField(name, fieldValue);
      customHandler?.(fieldValue as string);
    };

    const handleListChange = (
      name: keyof VFormFieldData,
      index: number,
      value: string,
      additionalUpdates?: Partial<VFormFieldData>
    ) => {
      setFormData((prevData) => {
        const updatedList = Array.isArray(prevData[name]) ? [...(prevData[name] as string[])] : []; // Ensure it's an array

        updatedList[index] = value;

        return {
          ...prevData,
          [name]: updatedList,
          ...(additionalUpdates ? additionalUpdates : {}),
        } as VFormFieldData; // Explicitly cast to match expected type
      });

      validateField(name as string, value);
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
      // Find the field definition (including in nested groups)
      const findField = (fields: VFormFields[]): VFormField | undefined => {
        for (const field of fields) {
          if ('fields' in field) {
            const found = findField(field.fields);
            if (found) return found;
          } else if (field.name === name) {
            return field;
          }
        }
      };
    
      const targetField = findField(config);
      if (!targetField) return;
    
      setFormErrors(prevErrors => {
        const updatedErrors = { ...prevErrors };
        let hasError = false;
    
        // Check required field validation
        if (targetField.required && !value) {
          updatedErrors[name] = `${targetField.label ?? 'field'} is required`;
          hasError = true;
        } 
        // Check custom validation if provided
        else if (targetField.validate) {
          const error = targetField.validate(value, formData);
          if (error) {
            updatedErrors[name] = error;
            hasError = true;
          }
        }
    
        // If no errors found for this field and it previously had an error, remove it
        if (!hasError && updatedErrors[name]) {
          delete updatedErrors[name];
        }
    
        return updatedErrors;
      });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const newFormErrors: { [key: string]: string } = {};
      const configFields = config.flatMap((item) => (item.type == 'group' ? item.fields : [item]));

      configFields.forEach((field) => {
        if (field.required && !formData[field.name]) {
          newFormErrors[field.name] = `${field.label ?? 'field'} is required`;
        } else if (field.validate) {
          const error = field.validate(formData[field.name], formData);
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

    const shouldRenderField = (field: VFormField, data: VFormFieldData) => {
      return typeof field.shouldRender === "function" ? field.shouldRender(data) : true;
    };

    const renderField = (field: VFormField) => {
      if (field.type === 'hidden' || !shouldRenderField(field, formData)) {
        return null;
      }

      const position = field.position
        ? field.position.split(' ').map(Number)
        : [lastPosition.current.row, lastPosition.current.col, lastPosition.current.span];
      const [row, col, span] = position;

      lastPosition.current = { row: row, col: col + span, span: span };

      const gridStyles = {
        gridRow: row,
        gridColumn: `${col} / span ${span}`,
      };

      return (
        <div key={field.name} style={gridStyles}>
          {field.type === 'text' || field.type === 'email' || field.type === 'password' || field.type === 'number' ? (
            field.fieldWith === 'icon' ? (
              <VIConInput
                iconProps={{ icon: field.icon! }}
                name={field.name}
                placeholder={field.placeholder}
                type={field.type}
                required={typeof field.required === 'function' ? field.required(formData) : field.required}
                disabled={typeof field.disabled === 'function' ? field.disabled(formData) : field.disabled}
                value={formData[field.name] as string} // Use formData value
                helpText={field.helpText}
                onChange={(_, originalEvent) => handleChange(originalEvent!, field.onChange)}
                reflectErrors={false}
              />
            ) : (
              <VLabelledInput
                label={field.label!}
                name={field.name}
                value={formData[field.name] as string} // Use formData value
                placeholder={field.placeholder}
                type={field.type}
                required={typeof field.required === 'function' ? field.required(formData) : field.required}
                disabled={typeof field.disabled === 'function' ? field.disabled(formData) : field.disabled}
                onChange={(_, originalEvent) => handleChange(originalEvent!, field.onChange)}
                helpText={field.helpText}
                reflectErrors={false}
              />
            )
          ) : field.type === 'date' ? (
            <VLabelledDatePicker
              label={field.label}
              value={formData[field.name] as Date} // Use formData value
              onChange={(date: Date) => handleDateChange(field.name, date)}
            />
          ) : field.type === 'select' ? (
            <VLabelledDropdown
              name={field.name}
              label={field.label ?? 'Select value'}
              options={field.options!}
              disabled={typeof field.disabled === 'function' ? field.disabled(formData) : field.disabled}
              placeholder={field.placeholder ?? 'Select value'}
              value={formData[field.name] as string} // Use formData value
              onChange={(_, originalEvent) => handleChange(originalEvent!, field.onChange)}
            />
          ) : field.type === 'checkbox' ? (
            <VCheckbox
              value={formData[field.name] as string} // Use formData value
              label={field.label ?? 'Select value'}
              name={field.name}
              required={typeof field.required === 'function' ? field.required(formData) : field.required}
              onChange={(_, originalEvent) => handleChange(originalEvent!, field.onChange)}
            />
          ) : field.type === 'text-area' ? (
            <VLabelledTextArea
              rows={field.textAreaRows ?? 3}
              value={formData[field.name] as string} // Use formData value
              label={field.label}
              name={field.name}
              placeholder={field.placeholder}
              required={typeof field.required === 'function' ? field.required(formData) : field.required}
              disabled={typeof field.disabled === 'function' ? field.disabled(formData) : field.disabled}
              labelClasses="text-md"
              helpText={field.helpText}
              onChange={(value, originalEvent) => {
                  handleChange(originalEvent!);
                  field.onChange?.(value);
                }}
              reflectErrors={false}
            />
          ) : field.type === 'switch' ? (
            <VSwitch
              value={formData[field.name]?.toString()}
              name={field.name}
              required={typeof field.required === 'function' ? field.required(formData) : field.required}
              disabled={typeof field.disabled === 'function' ? field.disabled(formData) : field.disabled}
              label={field.label}
              labelClasses="text-md"
              onChange={(value, originalEvent) => {
                  handleChange(originalEvent!);
                  field.onChange?.(value);
                }}
              className={field.classNames}
            />
          ) : field.type === 'list' ? (
            <div className="flex flex-col gap-4">
              <VLabel>{field.label}</VLabel>
              {((formData[field.name] as string[]) || [])?.map((item, index) => (
                <div key={index} className="w-full grid grid-cols-12 gap-5 items-center">
                  {field.renderItem ? (
                    field.renderItem(
                      item,
                      (value, additionalUpdates) =>
                        handleListChange(field.name as keyof VFormFieldData, index, value as string, additionalUpdates),
                      formData,
                      index
                    )
                  ) : (
                    <VLabelledInput
                      label=""
                      name={`${field.name}[${index}]`}
                      value={item}
                      placeholder={field.placeholder}
                      type="text"
                      required={typeof field.required === 'function' ? field.required(formData) : field.required}
                      disabled={typeof field.disabled === 'function' ? field.disabled(formData) : field.disabled}
                      onChange={(v) => handleListChange(field.name, index, v)}
                    />
                  )}
                  <VButton
                    variant="link"
                    type="button"
                    className="!text-theme-negative !w-8"
                    disabled={typeof field.disabled === 'function' ? field.disabled(formData) : field.disabled}
                    onClick={() => handleRemoveFromList(field.name, index)}
                  >
                    <VICon
                      disabled={typeof field.disabled === 'function' ? field.disabled(formData) : field.disabled}
                      icon={FaTrashAlt}
                      size={18}
                    />
                  </VButton>
                </div>
              ))}
              <VButton
                variant="link"
                disabled={typeof field.disabled === 'function' ? field.disabled(formData) : field.disabled}
                type="button"
                onClick={() => handleAddToList(field.name)}
                className="!w-fit"
              >
                <VICon icon={IoAdd} className="mt-0.5" size={20} />
                <span className="mt-1">Add Option</span>
              </VButton>
            </div>
          ) : field.type === 'renderItem' && field.renderItem ? (
            field.renderItem(
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              formData[field.name] as any,
              (newValue, additionalUpdates) => {
                setFormData(
                  (prevData) =>
                    ({
                      ...prevData,
                      [field.name]: newValue,
                      ...(additionalUpdates ? additionalUpdates : {}),
                    }) as VFormFieldData
                );
                validateField(field.name, newValue as string);
              },
              formData
            )
          ) : field.type === 'custom' && field.customContent ? (
            React.cloneElement(field.customContent)
          ) : field.type === 'submit' ? (
            <div key={field.name}>
              <VButton type="submit" isLoading={isFormSubmitting} className={field.classNames}>
                {field.label ?? 'SUBMIT'}
              </VButton>
            </div>
          ) : field.type === 'discard' ? (
            <div key={field.name}>
              <VButton
                variant="secondary"
                type="button"
                onClick={() => {
                  setFormData(initialValues ?? {});
                  field.onClick && field.onClick();
                }}
                className={field.classNames}
              >
                {field.label ?? 'Discard'}
              </VButton>
            </div>
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
      <form onSubmit={handleSubmit} className={`w-full ${className} `}>
        <div
          className={`w-full grid gap-${spacing} ${contentClasses}`}
          style={{ gridTemplateColumns: 'repeat(12, 1fr)' }}
        >
          {config.map((field) => {
            if (field.type === 'group') {

              if (field.shouldRender && !field.shouldRender(formData)) {
                return null;
              }

              return (
                <>
                  <div
                    key={field.label}
                    style={{
                      gridRow: field.position?.split(' ')[0] || lastPosition.current.row,
                      gridColumn: `${field.position?.split(' ')[1] ?? 1} / span ${field.position?.split(' ')[2] ?? 12}`,
                    }}
                  >
                    {field.label && (
                      <div style={{ marginBottom: '-0.75rem' }}>
                        <VLabel as="h5">{field.label}</VLabel>
                      </div>
                    )}
                  </div>
                  {field.fields.map(renderField)}
                </>
              );
            }
            return renderField(field);
          })}
        </div>
      </form>
    );
  }
);

VDynamicForm.displayName = 'DynamicForm';

export { VDynamicForm };