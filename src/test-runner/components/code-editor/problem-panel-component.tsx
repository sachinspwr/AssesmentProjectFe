// import { QuestionProps } from 'test-runner/types';
import { DifficultyLevel } from '@utils/enums/difficult-level.enum';
import { QuestionType } from '@utils/enums/question-type.enum';
import { ProblemStatementComponent } from './problem-statement.component';
import { QuestionResponseDTO } from '@dto/response';

interface ProblemPanelProps {
    width: string;
    onResizeStart: (e: React.MouseEvent) => void;
    isCollapsed: boolean;
    onToggle: () => void;
    question: QuestionResponseDTO;
}

export function ProblemPanel({
    width,
    onResizeStart,
    isCollapsed,
    question,
    // ...questionProps
}: ProblemPanelProps) {
    if (isCollapsed) return null;

    return (
        <div className="problem-panel py-2 h-full overflow-auto relative border rounded-lg" style={{ width }}>
            <div
                className="absolute top-0 right-0 w-0.5 h-full bg-theme-default-disabled cursor-ew-resize z-10"
                onMouseDown={onResizeStart}
            />
            <ProblemStatementComponent
                subjectId={question.subjectId}
                questionText={question.questionText}
                subject={question.subject}
                topic={question.topic}
                difficulty={question.difficulty as DifficultyLevel}
                type={question.type as QuestionType}
                timeLimit={question.timeLimit}
                marks={question.marks}
                answerOptions={question.answerOptions}
                // id={question.id}
                questionExplanation={question.questionExplanation}
                codingQuestion={question.codingQuestion}
                // {...questionProps}
            />
        </div>
    );
}