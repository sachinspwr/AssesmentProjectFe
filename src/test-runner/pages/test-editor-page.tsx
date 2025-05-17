/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
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

export function CodingTestEditor({ question, currentQuestionId }: QuestionProps) {
    // Redux hooks
    const dispatch = useAppDispatch();
    const [evaluateCode, { isLoading }] = useEvaluateCodeMutation();
    const { evaluationResult } = useAppSelector((state) => state.codeEvaluation);

    // State management
    const [selectedLanguageId, setSelectedLanguageId] = useState<number>(19);
    const [monacoTheme, setMonacoTheme] = useState(config.defaultThemes.at(0));
    const [languageName, setLanguageName] = useState<string>('javascript');
    const [writtenCode, setWrittenCode] = useState('');
    const [sampleInput, setSampleInput] = useState('');
    const [isConsoleCollapsed, setIsConsoleCollapsed] = useState(false);
    const [isProblemCollapsed, setIsProblemCollapsed] = useState(false);
    const [problemWidth, setProblemWidth] = useState('50%');

    const codingLanguageOptions = config.supportedLanguages.map(({ name, id }) => ({
        label: name,
        value: id.toString(),
    }));

    const handleLanguageChange = (value: string) => {
        const newSelectedLanguageId = parseInt(value, 10);
        setSelectedLanguageId(newSelectedLanguageId);
        const selectedLanguage = config.supportedLanguages.find(({ id }) => id === newSelectedLanguageId)?.name || '';
        setLanguageName(selectedLanguage);
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
            'php': 'php'
        };
        return languageMap[language.toLowerCase()] || 'txt';
    };

    const runCode = async () => {
        if (!writtenCode.trim()) {
            toast.error('Please write some code before running');
            return;
        }

        try {
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

            console.log('Request payload:', codeData); // Debug

            const result = await evaluateCode(codeData).unwrap();

            console.log('API Response:', result); // Debug

            console.log("Output from result:", result.stdout || result.stderr || 'No output');

            if (!result) {
                throw new Error('No response data received');
            }

            // Check both stdout and stderr
            const hasOutput = result.stdout || result.stderr;
            if (!hasOutput) {
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

    function handleAnswer(questionId: string, answer: Answer): void {
        throw new Error('Function not implemented.');
    }

    function handleNext(): void {
        throw new Error('Function not implemented.');
    }

    function handleSubmit(): void {
        throw new Error('Function not implemented.');
    }

    return (
        <div className="flex flex-col m-4 h-[calc(100vh-20px)]" id={currentQuestionId}>
            <div className={`flex-1 flex flex-col border rounded-lg ${isConsoleCollapsed ? 'h-full' : 'h-auto'}`}>
                <Card className='flex-1 !p-0'>
                    <div className="flex h-full flex-row rounded-lg">
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
                            question={question}
                            questionAnswer={question.answerOptions}
                        />

                        <EditorPanel
                            width={isProblemCollapsed ? '100%' : `calc(100% - ${problemWidth})`}
                            isConsoleCollapsed={isConsoleCollapsed}
                            isProblemCollapsed={isProblemCollapsed}
                            onToggleProblem={toggleProblemStatement}
                            onRunCode={runCode}
                            isLoading={isLoading}
                            languageName={languageName}
                            selectedLanguageId={selectedLanguageId}
                            onLanguageChange={handleLanguageChange}
                            monacoTheme={monacoTheme || 'dark'}
                            onThemeChange={handleThemeChange}
                            codingLanguageOptions={codingLanguageOptions}
                            onChangeCodeEditor={setWrittenCode}
                            onEditorWillMount={handleEditorWillMount}
                            defaultValue={examples[selectedLanguageId.toString() as keyof typeof examples] || ''}
                        />
                    </div>
                </Card>
            </div>

            <ConsolePanel
                isCollapsed={isConsoleCollapsed}
                onToggle={toggleConsole}
                codeOutput={evaluationResult?.stdout || ''}
                codeError={evaluationResult?.stderr || ''}
                sampleInput={sampleInput}
                onSampleInputChange={setSampleInput}
                executionTime={evaluationResult?.executionTime}
                memoryUsage={evaluationResult?.exception || ''}
            />
        </div>
    );
}