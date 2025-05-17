import { BaseDTO } from "./base.dto";

export class TimeStampDto extends BaseDTO{
    createdAt!: Date;
    updatedAt!: Date;
}