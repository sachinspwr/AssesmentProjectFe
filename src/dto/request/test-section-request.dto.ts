class TestSectionRequestDTO {
    
    public name!: string;

    public testId!: string;

    public isPublic!: boolean;

    public cutoffScore?: number;

    public description?: string;

    public questionIds!: string[];

}

export { TestSectionRequestDTO };
