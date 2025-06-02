/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import { Answer, QuestionProps } from 'test-runner/types';
import config from '../components/code-editor/coding-cofig.component';
import examples from '../components/code-editor/coding-examples.component';
import toast from 'react-hot-toast';
import { Card } from '@components/molecules/advance-card/card.mol';
import { ProblemPanel } from '../components/code-editor/problem-panel-component';
import { EditorPanel } from '../components/code-editor/editor-panel-component';
import { ConsolePanel } from '../components/code-editor/console-panel-component';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { clearEvaluationResult, useEvaluateCodeMutation } from 'store/slices/test-code-evaluation.slice';
import { QuestionResponseDTO } from '@dto/response';
import { DifficultyLevel, QuestionType } from '@utils/enums';
import { ProgrammingLanguage } from '@utils/enums/programming-language.enum';
import { CodingQuestionGradingStrategy } from '@utils/enums/coding-question-grading-strategy.enum';
import { TestCaseKind } from '@utils/enums/test-kind.enum';

// Mock data from the API response
const mockQuestionData: QuestionResponseDTO = {
    "isPublic": true,
    "questionText": "Write a function that returns the sum of all elements in an int array",
    "subjectId": "3afed2d2-7008-441b-97ee-c0b94857dd8a",
    "domainId": "d1a2b3c4-e5f6-7890-ab12-cd34ef56gh78",
    "industryId": "a1b2c3d4-e5f6-7890-ab12-cd34ef56gh78",
    "industryRoleId": "r1a2b3c4-e5f6-7890-ab12-cd34ef56gh78",
    "subject": "Software Design",
    "topic": "Design Patterns",
    "timeLimit": 30,
    "marks": 50,
    "questionExplanation": "Design patterns provide standard solutions to common software design problems.",
    "answerExplanation": "The Iterator Pattern provides a way to access elements of a collection sequentially without exposing the underlying representation. It separates the traversal algorithm from the collection structure, allowing the same traversal method to work with different collections.",
    "id": "58c74667-ba28-4150-b4f3-97a6d985eac5",
    "difficulty": DifficultyLevel.Medium,
    "type": QuestionType.Coding,
    "answerOptions": " Factory Pattern,Observer Pattern, Iterator Pattern,Singleton Pattern",
    "tags": undefined,
    "correctAnswer": "Factory Pattern",
    "codingQuestion": {
        "id": "8e7298ef-f2ea-4e62-9c5e-705600c65787",
        "questionId": "58c74667-ba28-4150-b4f3-97a6d985eac5",
        "primaryLanguage": ProgrammingLanguage.Python,
        "allowedLanguages": [
            ProgrammingLanguage.Python,
            ProgrammingLanguage.Javascript,
        ],
        "gradingStrategy": CodingQuestionGradingStrategy.OutputMatch,
        "expectedOutput": 'Hello Word',
        "inputFormat": {
            "description": "An array of integers, e.g., [1, 2, 3, 4]"
        },
        "outputFormat": {
            "description": "A single integer representing the sum"
        },
        "problemMarkdown": "### Problem:\nWrite a function that returns the sum of all elements in an array.\n\n### Example:\nInput: [1, 2, 3]\nOutput: 6",
        "timeLimitMs": 2000,
        "memoryLimitKb": 128000,
        "maxSubmissionCount": 3,
        "testCases": [
            {
                "id": "5c04e2f1-6023-43bc-b95a-80fe7517d773",
                "codingQuestionId": "8e7298ef-f2ea-4e62-9c5e-705600c65787",
                "input": "[1, 2, 3]",
                "expectedOutput": "6",
                "kind": TestCaseKind.Sample,
                "caseNumber": 1,
                "weight": 30.00,
            },
            {
                "id": "aae7a7a8-71f8-4447-a087-1461391f94fd",
                "codingQuestionId": "8e7298ef-f2ea-4e62-9c5e-705600c65787",
                "input": "[4, 5, 6]",
                "expectedOutput": "15",
                "kind": TestCaseKind.Hidden,
                "caseNumber": 2,
                "weight": 20.00,
            }
        ],
        "starterCodes": [
            {
                "id": "e690e306-957b-4a0d-a722-a3cbd9045e24",
                "codingQuestionId": "8e7298ef-f2ea-4e62-9c5e-705600c65787",
                "language": ProgrammingLanguage.Python,
                "template": "def sum_array(arr):\n    # TODO: implement\n    return 0",
                "solutionCode": "def sum_array(arr):\n    return sum(arr)",
            },
            {
                "id": "80a498ca-c17e-4444-93ab-0a8baffae231",
                "codingQuestionId": "8e7298ef-f2ea-4e62-9c5e-705600c65787",
                "language": ProgrammingLanguage.Javascript,
                "template": "function sumArray(arr) {\n  // TODO: implement\n  return 0;\n}",
                "solutionCode": "function sumArray(arr) {\n  return arr.reduce((a, b) => a + b, 0);\n}",
            }
        ]
    }
};

export function CodingTestEditor({ question, currentQuestionId }: any) {
    // Redux hooks
    const dispatch = useAppDispatch();
    const [evaluateCode, { isLoading }] = useEvaluateCodeMutation();
    const { evaluationResult } = useAppSelector((state) => state.codeEvaluation);

    // State management
    const [selectedLanguageId, setSelectedLanguageId] = useState<number>(19); // Default to JavaScript
    const [monacoTheme, setMonacoTheme] = useState(config.defaultThemes[1] ?? 'light');
    const [languageName, setLanguageName] = useState<string>('javascript');
    const [writtenCode, setWrittenCode] = useState('');
    const [sampleInput, setSampleInput] = useState('');
    const [isConsoleCollapsed, setIsConsoleCollapsed] = useState(false);
    const [isProblemCollapsed, setIsProblemCollapsed] = useState(false);
    const [problemWidth, setProblemWidth] = useState('50%');
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [activeConsoleTab, setActiveConsoleTab] = useState<'input' | 'result' | 'testcase'>(
        mockQuestionData.codingQuestion?.gradingStrategy === CodingQuestionGradingStrategy.Custom
            ? 'result'
            : mockQuestionData.codingQuestion?.gradingStrategy === CodingQuestionGradingStrategy.TestCases
                ? 'testcase'
                : 'input'
    );

    // Set initial code from starter templates
    useEffect(() => {
        if (mockQuestionData.codingQuestion?.starterCodes) {
            const javascriptStarter = mockQuestionData.codingQuestion.starterCodes.find(
                code => code.language.toLowerCase() === 'javascript'
            );

            if (javascriptStarter) {
                setWrittenCode(javascriptStarter.template);
            }
        }
    }, []);

    const toggleFullScreen = () => {
        const editorContainer = document.getElementById('editor-container');
        if (!editorContainer) return;

        if (!document.fullscreenElement) {
            // Enter fullscreen
            if (editorContainer.requestFullscreen) {
                editorContainer.requestFullscreen()
                    .then(() => setIsFullScreen(true))
                    .catch(err => {
                        console.error('Error attempting to enable fullscreen:', err);
                        toast.error('Fullscreen failed: ' + err.message);
                    });
            }
        } else {
            // Exit fullscreen
            if (document.exitFullscreen) {
                document.exitFullscreen()
                    .then(() => setIsFullScreen(false))
                    .catch(err => {
                        console.error('Error attempting to exit fullscreen:', err);
                        toast.error('Exit fullscreen failed: ' + err.message);
                    });
            }
        }
    };

    // Handle fullscreen change events
    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullScreen(!!document.fullscreenElement);
        };

        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => {
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
        };
    }, []);

    const codingLanguageOptions = config.supportedLanguages
        .filter(lang =>
            mockQuestionData.codingQuestion?.allowedLanguages
                ?.map(l => l.toLowerCase())
                .includes(lang.name.toLowerCase())
        )
        .map(({ name, id }) => ({
            label: name,
            value: id.toString(),
        }));

    const handleLanguageChange = (value: string) => {
        const newSelectedLanguageId = parseInt(value, 10);
        setSelectedLanguageId(newSelectedLanguageId);

        const selectedLanguage = config.supportedLanguages.find(({ id }) => id === newSelectedLanguageId)?.name || '';
        setLanguageName(selectedLanguage.toLowerCase());

        // Update code template when language changes
        const newStarter = mockQuestionData?.codingQuestion?.starterCodes?.find(
            code => code.language.toLowerCase() === selectedLanguage.toLowerCase()
        );

        if (newStarter) {
            setWrittenCode(newStarter.template);
        } else {
            setWrittenCode(examples[newSelectedLanguageId.toString() as keyof typeof examples] || '');
        }
    };

    const handleThemeChange = (value: string) => {
        setMonacoTheme(value);
    };

    const getFileExtension = (language: string): string => {
        const languageMap: Record<string, string> = {
            'javascript': 'js',
            'python': 'py',
            'java': 'java',
            'c': 'c',
            'cpp': 'cpp',
            'csharp': 'cs',
            'go': 'go',
            'ruby': 'rb',
            'swift': 'swift',
            'php': 'php',
            'typescript': 'ts'
        };
        return languageMap[language.toLowerCase()] || 'txt';
    };

    const runCode = async () => {
        if (!writtenCode.trim()) {
            toast.error('Please write some code before running');
            return;
        }

        try {
            setActiveConsoleTab('result');
            dispatch(clearEvaluationResult());

            const extension = getFileExtension(languageName);
            const filename = `Main.${extension}`;

            const codeData = {
                language: languageName.toLowerCase(),
                stdin: sampleInput || ' ',
                files: [{
                    name: filename,
                    content: writtenCode,
                }],
            };

            console.log('Request payload:', codeData);

            const result = await evaluateCode(codeData).unwrap();

            console.log('API Response:', result);

            console.log("Output from result:", result.stdout || result.stderr || 'No output');

            if (!result) {
                throw new Error('No response data received');
            }

            if (!result.stdout && !result.stderr) {
                console.warn('Response received but no output found:', result);
            }

        } catch (error: any) {
            console.error('Full error:', error);
            toast.error(error.data?.message || error.message || 'Evaluation failed');
        }
    };

    const handleEditorWillMount = (monaco: any) => {
        monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
            target: monaco.languages.typescript.ScriptTarget.Latest,
            module: monaco.languages.typescript.ModuleKind.ES2015,
            allowNonTsExtensions: true,
            lib: ['es2018'],
        });
    };

    const toggleConsole = () => setIsConsoleCollapsed(!isConsoleCollapsed);
    const toggleProblemStatement = () => {
        setIsProblemCollapsed(!isProblemCollapsed);
        setProblemWidth(isProblemCollapsed ? '50%' : '0%');
    };

    const handleResizeStart = (e: React.MouseEvent) => {
        e.preventDefault();
        const startX = e.clientX;
        const currentWidth = document.querySelector('.problem-panel')?.clientWidth ||
            window.innerWidth * 0.5;

        const handleMouseMove = (moveEvent: MouseEvent) => {
            const deltaX = moveEvent.clientX - startX;
            const newWidth = currentWidth + deltaX;
            const maxWidth = window.innerWidth - 500;
            setProblemWidth(`${Math.max(350, Math.min(maxWidth, newWidth))}px`);
        };

        const handleMouseUp = () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };

    function handleBack(): void {
        throw new Error('Function not implemented.');
    }

    function handleAnswer(questionId: string, answer: any): void {
        throw new Error('Function not implemented.');
    }

    function handleNext(): void {
        throw new Error('Function not implemented.');
    }

    function handleSubmit(): void {
        throw new Error('Function not implemented.');
    }

    return (
        <div id="editor-container" className="relative w-full bg-white">
            <div className="flex flex-row m-4 h-[calc(100vh-2rem)] gap-3">
                {!isProblemCollapsed && (
                    <ProblemPanel
                        width={problemWidth}
                        onResizeStart={handleResizeStart}
                        isCollapsed={isProblemCollapsed}
                        onToggle={toggleProblemStatement}
                        currentQuestionId={currentQuestionId}
                        isLastQuestion={false}
                        onAnswer={handleAnswer}
                        onBack={handleBack}
                        onNext={handleNext}
                        onSubmit={handleSubmit}
                        question={mockQuestionData}
                        questionAnswer={mockQuestionData.answerOptions}
                    />
                )}
                <div className="flex-1 flex flex-col min-w-0">
                    <div className="flex h-full flex-col gap-3">
                        <EditorPanel
                            width="100%"
                            isConsoleCollapsed={isConsoleCollapsed}
                            isProblemCollapsed={isProblemCollapsed}
                            onToggleProblem={toggleProblemStatement}
                            onRunCode={runCode}
                            isLoading={isLoading}
                            languageName={languageName}
                            selectedLanguageId={selectedLanguageId}
                            onLanguageChange={handleLanguageChange}
                            monacoTheme={monacoTheme || 'light'}
                            onThemeChange={handleThemeChange}
                            codingLanguageOptions={codingLanguageOptions}
                            onChangeCodeEditor={setWrittenCode}
                            onEditorWillMount={handleEditorWillMount}
                            defaultValue={writtenCode}
                            onSubmit={handleSubmit}
                            onToggleFullscreen={toggleFullScreen}
                            isFullScreen={isFullScreen}
                        />
                        <ConsolePanel
                            expectedOutput={mockQuestionData.codingQuestion?.expectedOutput}
                            isCollapsed={isConsoleCollapsed}
                            onToggle={toggleConsole}
                            codeOutput={evaluationResult?.stdout || ''}
                            codeError={evaluationResult?.stderr || ''}
                            sampleInput={sampleInput}
                            onSampleInputChange={setSampleInput}
                            executionTime={evaluationResult?.executionTime}
                            memoryUsage={evaluationResult?.exception || ''}
                            testCases={mockQuestionData.codingQuestion?.testCases || []}
                            gradingStrategy={CodingQuestionGradingStrategy.Custom}
                            activeTab={activeConsoleTab}
                            onTabChange={setActiveConsoleTab}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}