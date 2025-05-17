class CodeEvaluationFileDTO {
    public name!: string;
    public content?: string;
}

class CodeEvaluationRequestDTO {
    public language!: string;
    public stdin?: string;
    public files?: CodeEvaluationFileDTO[];
}

export { CodeEvaluationRequestDTO, CodeEvaluationFileDTO };