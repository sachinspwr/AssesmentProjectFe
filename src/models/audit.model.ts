import { AutoMap } from '@automapper/classes';
import { TimeStamp, User } from 'models';

export class Audit extends TimeStamp {
  @AutoMap()
  createdById!: string;
  @AutoMap()
  updatedById!: string;
  @AutoMap()
  createdBy!: User;
  @AutoMap()
  updatedBy!: User;
}
