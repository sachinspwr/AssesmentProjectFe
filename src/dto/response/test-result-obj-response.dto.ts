class TestResponseObjDTO{

        id!:string;
    
        testId!: string;

        participantId!:string;
    
        userId!: string;
      
        testLinkId!: string;
      
        totalQuestions!: number;
      
        correctAnswersCount!: number;
      
        score!: number | string;
      
        outOf!: number | string;
      
        isPassed!: boolean;
      
        correctionPercentage!: number | string;
      
        feedback!: string;  
      
        completedAt!: Date;
}

export {TestResponseObjDTO};