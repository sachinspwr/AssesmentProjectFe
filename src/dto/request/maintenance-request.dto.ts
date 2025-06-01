import { SystemSettingKey } from "@utils/enums"

export interface MaintenanceRequestDTO {
    key: SystemSettingKey
    value: MaintenanceKeyValue
    isPublic: boolean
  }
  
  export interface MaintenanceKeyValue {
    startAt: string
    endAt: string
    warningMessage: string
    maintenanceMessage: string
    warningFrom: string
  }
  