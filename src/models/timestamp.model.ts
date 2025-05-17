import { AutoMap } from '@automapper/classes';
import { BaseModel } from './base.model';

export class TimeStamp extends BaseModel {
  @AutoMap()
  createdAt!: Date;
  @AutoMap()
  updatedAt!: Date;
}
