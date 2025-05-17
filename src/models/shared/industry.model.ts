import { Audit, Domain } from 'models';

export class Industry extends Audit {
  public name!: string;
  public description?: string;
  public domains?: Domain[];
}
