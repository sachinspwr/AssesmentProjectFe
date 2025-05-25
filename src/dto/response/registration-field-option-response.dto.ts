import { InputFieldTypes } from "@components/atoms";

export class TestRegistrationFieldOptionResponseDTO {
    isPublic?: boolean;
    id!: string;
    name?: string;
    type?: InputFieldTypes | 'select' | 'text-area' | 'switch' | 'list' | 'custom' | 'submit' | 'discard' | 'renderItem' | 'text' | 'string';
    label?: string;
    placeholder?: string;
    isRequired?: boolean;
    options?:string;
    disabled?:boolean;
}

type selectOption={
    label:string,
    value:string
}