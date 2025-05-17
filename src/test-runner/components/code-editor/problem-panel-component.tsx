import { QuestionProps } from 'test-runner/types';
import { DifficultyLevel } from '@utils/enums/difficult-level.enum';
import { QuestionType } from '@utils/enums/question-type.enum';
import { ProblemStatementComponent } from './problem-statement.component';

interface ProblemPanelProps extends QuestionProps {
    width: string;
    onResizeStart: (e: React.MouseEvent) => void;
    isCollapsed: boolean;
    onToggle: () => void;
}

export function ProblemPanel({
    width,
    onResizeStart,
    isCollapsed,
    ...questionProps
}: ProblemPanelProps) {
    if (isCollapsed) return null;

    return (
        <div className="problem-panel h-full overflow-auto relative" style={{ width }}>
            <div
                className="absolute top-0 right-0 w-1 h-full bg-theme-default-disabled cursor-ew-resize z-10"
                onMouseDown={onResizeStart}
            />
            <ProblemStatementComponent
                subjectId={''} questionText={questionProps.question.questionText}
                subject={questionProps.question.subject}
                topic={questionProps.question.topic}
                difficulty={DifficultyLevel.Easy}
                type={QuestionType.Coding}
                timeLimit={0}
                marks={0}
                answerOptions={questionProps.question.answerOptions}
                id={questionProps.question.id}
                {...questionProps} />
        </div>
    );
}