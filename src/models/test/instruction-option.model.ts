import { InstructionCategory } from '@utils/enums';
import { Audit } from 'models';

export class TestInstructionOption extends Audit {
  key!: string;
  value!: string;
  valueType!: 'string' | 'number' | 'boolean';
  description!: string;
  category!: InstructionCategory;
}
