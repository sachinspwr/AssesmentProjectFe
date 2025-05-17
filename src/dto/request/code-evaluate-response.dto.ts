class CodeEvaluateResponseDTO {
    status!: string
    exception: any
    stdout!: string
    stderr: any
    executionTime!: number
    stdin!: string
  }
  
  
  export { CodeEvaluateResponseDTO };