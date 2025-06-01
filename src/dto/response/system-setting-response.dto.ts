import { SystemSettingKey } from '@utils/enums';
import { AuditResponseDTO } from './audit-response.dto';
import { MaintenanceResponseDTO } from './maintenance-response.dto';


export class SystemSettingResponseDTO extends AuditResponseDTO {
  key?: SystemSettingKey;

  value!: MaintenanceResponseDTO;
}
