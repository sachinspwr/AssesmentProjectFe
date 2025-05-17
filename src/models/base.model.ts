import { AutoMap } from '@automapper/classes';

export class BaseModel {
  @AutoMap()
  public id!: string;
}
