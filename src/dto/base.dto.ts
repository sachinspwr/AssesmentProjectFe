import { AutoMap } from '@automapper/classes';

class BaseDTO {
  @AutoMap()
  public id!: string;
}

export { BaseDTO };
