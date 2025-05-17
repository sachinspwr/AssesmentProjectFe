import { BaseDTO } from '@dto/base.dto';
import { UserResponseDTO } from './user-response.dto';
import { AutoMap } from '@automapper/classes';

class AuditResponseDTO extends BaseDTO {
  @AutoMap()
  public isPublic?: boolean;

  @AutoMap()
  public createdById?: string;

  @AutoMap()
  public updatedById?: string;

  @AutoMap()
  public createdBy?: UserResponseDTO;

  @AutoMap()
  public updatedBy?: UserResponseDTO;

  @AutoMap()
  creationAt?: Date;

  @AutoMap()
  createdAt?: Date;

  //obsolute do not use it
  @AutoMap()
  updatedOn?: Date;

  @AutoMap()
  updatedAt?: Date;
}

export { AuditResponseDTO };
