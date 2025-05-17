import { SettingCategory } from '@utils/enums';
import { Audit } from 'models';

export class TestSettingOption extends Audit {
  key!: string;
  value!: string | boolean | number;
  valueType!: 'string' | 'number' | 'boolean';
  description!: string;
  category!: SettingCategory;
  isConfigurable!: boolean;
}
