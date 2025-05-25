import { Audit } from "models/audit.model";

export class TestRegistrationFieldOption extends Audit {
    name!: string;
    type!: string;
    label!: string;
    placeholder!: string;
    options!: string;
    isRequired!: boolean;
    disabled?:boolean;
  };
  