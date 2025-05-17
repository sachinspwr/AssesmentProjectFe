import { InputFieldTypes } from '@components/atoms';
import { ReactElement, ReactNode } from 'react';
import { IconType } from 'react-icons';
export type FormFieldData = { [key: string]: string | boolean | Date | string[] };

export type FormGroup = {
  label?: string;
  type: 'group';
  fields: FormField[];
};

export type FormField = {
  name: string;
  value?: string;
  fieldWith?: 'label' | 'icon';
  label: ReactNode;
  icon?: IconType;
  type: InputFieldTypes | 'select' | 'text-area' | 'list' | 'custom';
  customContent?: ReactNode; // for custom type
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  options?: { value: string; label: string }[];
  textAreaRows?: number;
  validate?: (value: string | boolean | number | Date | string[]) => string | undefined;

  inputProps?: {
    accept: string;
  };

  onChange?: (value: string) => void;
};

export type FormFieldGen<T> = {
  name: keyof T;
  value?: string;
  fieldWith?: 'label' | 'icon';
  label: ReactNode;
  icon?: IconType;
  type: InputFieldTypes | 'select' | 'text-area' | 'custom';
  customContent?: ReactNode; // for custom type
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  options?: { value: string; label: string }[];
  validate?: (value: string | boolean | number | Date) => string | undefined;
};

export type FormFields = FormField | FormGroup;

//V-DynamicForm
export type VFormFieldData = { [key: string]: string | boolean | Date | string[] | null };

export type VFormGroup = {
  position: string;
  label?: string;
  type: 'group';
  shouldRender?: ((formData: VFormFieldData) => boolean);
  fields: VFormField[];
};

export type VFormField = {
  position?: string;
  name: string;
  value?: string;
  fieldWith?: 'label' | 'icon';
  label?: ReactNode;
  helpText?: string;
  icon?: IconType;
  type: InputFieldTypes | 'select' | 'text-area' | 'switch' | 'list' | 'custom' | 'submit' | 'discard' | 'renderItem' | 'text' | 'string';
  shouldRender?: ((formData: VFormFieldData) => boolean);
  renderItem?: (
    value: string | string[],
    onChange: (value: string | string[], additionalUpdates?: Partial<VFormFieldData>) => void,
    formData?: VFormFieldData,
    index?: number
  ) => ReactNode;
  customContent?: ReactElement;
  required?: boolean | ((formData: VFormFieldData) => boolean);
  disabled?: boolean | ((formData: VFormFieldData) => boolean); 
  checked?: boolean;
  placeholder?: string;
  options?: { value: string; label: string }[];
  textAreaRows?: number;
  validate?: (value: string | boolean | number | Date | string[] | null, formData: VFormFieldData) => string | undefined;
  layout?: string;
  inputProps?: {
    accept: string;
  };
  classNames?: string;
  computeDependencies?: string[]; // List of field names this field depends on
  compute?: (formData: VFormFieldData) => string | boolean | string[] | Date | undefined | null;
  onChange?: (value: string) => void;
  onClick?: () => void;
};

export type VFormFieldGen<T> = {
  position?: string;
  name: keyof T;
  value?: string;
  fieldWith?: 'label' | 'icon';
  label: ReactNode;
  icon?: IconType;
  type: InputFieldTypes | 'select' | 'text-area' | 'list' | 'custom' | 'submit';
  customContent?: ReactNode; // for custom type
  required?: boolean;
  disabled?: boolean;
  checked?: boolean;
  placeholder?: string;
  options?: { value: string; label: string }[];
  textAreaRows?: number;
  validate?: (value: string | boolean | number | Date | string[]) => string | undefined;
  layout?: string;
  inputProps?: {
    accept: string;
  };
  onChange?: (value: string) => void;
  classNames?: string;
};

export type VFormFields = VFormField | VFormGroup;

export function mapToFormFieldData<T extends object>(response?: T): FormFieldData {
  return {
    ...response, 
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function mapFormDataToDTO<T>(formData: Record<string, any>, config: VFormField[]): T {
  const result: Partial<T> = {};

  // Loop through the form configuration
  config.forEach((field) => {
    if (formData[field.name]) {
      result[field.name as keyof T] = formData[field.name];
    }
  });

  return result as T;
}
