import { BaseDTO } from '@dto/base.dto';

class AuditRequestDTO extends BaseDTO {
  isPublic!: boolean;

  createdById?: string;

  updatedById?: string;

  creationAt?: Date;

  updatedOn?: Date;
}

export { AuditRequestDTO };
