class CodeEvaluationResponseDTO {
    public status!: string;
    public exception!: string | null;
    public stdout!: string | null;
    public stderr!: string | null;
    public executionTime!: number;
    public stdin!: string;
}

export { CodeEvaluationResponseDTO };