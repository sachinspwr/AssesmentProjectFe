export class MaintenanceResponseDTO {
    key: string
    value: Value
    isPublic: boolean
  }
  
  export interface Value {
    isPublic: boolean
    startAt: string
    endAt: string
    warningMessage: string
    maintenanceMessage: string
    warningFrom: string
  }
  