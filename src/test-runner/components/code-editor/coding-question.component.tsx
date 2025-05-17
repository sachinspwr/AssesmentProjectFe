/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { QuestionProps } from 'test-runner/types';
import config from './coding-cofig.component';
import MonacoEditor from '@monaco-editor/react';
import examples from './coding-examples.component';
import { useEffect, useState } from 'react';
import { Button, Input, Select, VICon, VTextArea } from '@components/atoms';
import { apiService } from '@services/api.service';
import { useMutation } from 'react-query';
import { CodeEvaluateRequestDTO, CodeEvaluateResponseDTO } from '@dto/request';
import toast from 'react-hot-toast';
import { CategoryResponseDTO } from '@dto/response';
import { DifficultyLevel, QuestionType } from '@utils/enums';
import { VTypography } from '@components/molecules/typography/v-typography.mol';
import { Card } from '@components/molecules/advance-card/card.mol';
import { FiPlay, FiChevronLeft, FiChevronRight, FiMaximize2, FiMinimize2 } from 'react-icons/fi';
import { ProblemStatementComponent } from './problem-statement.component';

function CodingQuestion({ question, currentQuestionId }: QuestionProps) {
  const [selectedLanguageId, setSelectedLanguageId] = useState<number>(19);
  const [monacoTheme, setMonacoTheme] = useState(config.defaultThemes.at(0));
  const [languageName, setLanguageName] = useState<string>('javascript');
  const [writtenCode, setWrittenCode] = useState('');
  const [codeOutput, setCodeOutput] = useState('');
  const [codeError, setCodeError] = useState('');
  const [sampleInput, setSampleInput] = useState('');
  const [isConsoleCollapsed, setIsConsoleCollapsed] = useState(false);
  const [isProblemCollapsed, setIsProblemCollapsed] = useState(false);
  const [problemWidth, setProblemWidth] = useState('50%');

  const codingLanguageOptions = config.supportedLanguages.map(({ name, id }) => ({
    label: name,
    value: id.toString(),
  }));

  useEffect(() => {
    console.log('Question data' + question.questionText);
  }, []);

  function handleLanguageChange(value: string, ev?: React.ChangeEvent<HTMLSelectElement>) {
    const newSelectedLanguageId = parseInt(value, 10);
    setSelectedLanguageId(newSelectedLanguageId);
    const selectedLanguage = config.supportedLanguages.find(({ id }) => id === newSelectedLanguageId)?.name || '';
    setLanguageName(selectedLanguage);
  }

  function handleChangeCodeEditor(value: any, ev: any) {
    setWrittenCode(value);
  }

  function handleThemeChange(value: string, ev?: React.ChangeEvent<HTMLSelectElement>) {
    const theme = value;
    setMonacoTheme(theme);
  }

  const { mutate, isLoading } = useMutation<CodeEvaluateResponseDTO, Error, CodeEvaluateRequestDTO>(
    async (data) => await apiService.post<CodeEvaluateResponseDTO>('code/evaluate', data),
    {
      onSuccess: (data) => {
        setCodeOutput('');
        setCodeError('');
        toast.success(data.status);
        if (data.status == 'success') {
          setCodeOutput(data.stdout);
          if (data?.stderr != null) {
            setCodeError(data.stderr);
          }
        }
      },
    }
  );

  const runCode = async (): Promise<void> => {
    try {
      const codeData = {
        language: languageName,
        stdin: ' ',
        files: [
          {
            name: 'index.js',
            content: writtenCode,
          },
        ],
      };
      mutate(codeData);
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleSampleInput = (value: string) => {
    setSampleInput(value);
  };

  const runJavaScriptCode = () => {
    let consoleOutput = '';

    const customConsoleLog = (...args: any[]) => {
      consoleOutput += args.join(' ') + '\n';
    };

    try {
      const func = new Function('console', writtenCode);
      func({ log: customConsoleLog });
      setCodeOutput(String(consoleOutput || 'No Output'));
    } catch (err) {
      setCodeOutput(String(err));
    }
  };

  function handleEditorWillMount(monaco: any) {
    monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
      target: monaco.languages.typescript.ScriptTarget.Latest,
      module: monaco.languages.typescript.ModuleKind.ES2015,
      allowNonTsExtensions: true,
      lib: ['es2018'],
    });
  }

  const toggleConsole = () => {
    setIsConsoleCollapsed(!isConsoleCollapsed);
  };

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

  return (
    <div className="flex flex-col m-4 h-[calc(100vh-20px)]" id={currentQuestionId}>
      <div className={`flex-1 flex flex-col border rounded-lg ${isConsoleCollapsed ? 'h-full' : 'h-auto'}`}>
        <Card className='flex-1 !p-0'>
          <div className="flex h-full flex-row rounded-lg">
            {/* Problem Statement Panel with Resize Handle */}
            {!isProblemCollapsed && (
              <div 
                className="problem-panel h-full overflow-auto relative"
                style={{ width: problemWidth }}
              >
                <div 
                  className="absolute top-0 right-0 w-2 h-full bg-gray-200 hover:bg-blue-200 cursor-ew-resize z-10"
                  onMouseDown={handleResizeStart}
                />
                <ProblemStatementComponent
                  questionText={question?.questionText}
                  subject={question?.subject}
                  topic={question?.topic}
                  difficulty={DifficultyLevel.Easy}
                  type={QuestionType.SingleChoice}
                  timeLimit={0}
                  marks={0}
                  answerOptions={question?.answerOptions}
                  id={question?.id} 
                  subjectId={question.subjectId}         
                />
              </div>
            )}

            {/* Editor Section */}
            <div 
              className="h-full flex flex-col"
              style={{ width: isProblemCollapsed ? '100%' : `calc(100% - ${problemWidth})` }}
            >
              <div className="flex p-2 gap-5 justify-between border-b-2">
                <div className="flex justify-between items-center mb-2 gap-4">
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={toggleProblemStatement}
                      className="p-1 text-gray-500 hover:text-gray-700"
                      aria-label={isProblemCollapsed ? "Show problem" : "Hide problem"}
                    >
                      <VICon icon={isProblemCollapsed ? FiChevronRight : FiChevronLeft} size={20} />
                    </button>
                    <Button onClick={runCode} disabled={isLoading} className='flex align-baseline gap-2'>
                      {isLoading ? 'Compiling' : 'Run Code'}
                      <VICon icon={FiPlay} size={20} />
                    </Button>
                  </div>
                  <span className="text-sm text-gray-500">{languageName}</span>
                </div>
                <div className='flex gap-4'>
                  <div>
                    <Select
                      name={'coding_language'}
                      value={selectedLanguageId.toString()}
                      options={codingLanguageOptions}
                      onChange={handleLanguageChange}
                    />
                  </div>
                  <div>
                    <Select
                      name={'coding_theme'}
                      value={monacoTheme?.toString()}
                      options={[
                        { value: 'light', label: 'light' },
                        { value: 'vs-dark', label: 'vs-dark' },
                      ]}
                      onChange={handleThemeChange}
                    />
                  </div>
                </div>
              </div>
              <div className="flex-1 p-2">
                <MonacoEditor
                  theme={monacoTheme}
                  onChange={handleChangeCodeEditor}
                  height={isConsoleCollapsed ? "calc(100vh - 120px)" : `calc(100vh - 120px - ${isConsoleCollapsed ? 0 : 200}px)`}
                  path={languageName?.toString()}
                  defaultValue={examples[selectedLanguageId.toString() as keyof typeof examples] || ''}
                  defaultLanguage={languageName?.toString()}
                  options={config.options}
                  beforeMount={handleEditorWillMount}
                />
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Console Section - only rendered when not collapsed */}
      {!isConsoleCollapsed && (
        <Card className="!p-0 bg-white rounded-lg border shadow my-2">
          <div>
            <div className="flex justify-between items-center !border-b-2">
              <VTypography as='span' className="text-sm font-medium text-blue-600 border-b-2 border-blue-600 p-2">
                Console
              </VTypography>
              <button
                onClick={toggleConsole}
                className="text-gray-500 hover:text-gray-700 focus:outline-none pr-2"
                aria-label="Collapse console"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>

            <div className='flex-1 overflow-y-auto'>
              <div className="grid grid-cols-2 gap-1 px-1 bg-gray-100 border-b-2">
                <div>
                  <VTypography as='p'>Input:</VTypography>
                  <VTextArea
                    className="w-full h-32 p-1 border rounded-sm resize-none bg-white text-sm text-gray-800"
                    value={sampleInput || 'nums = [2,7,11,15], target = 9'}
                    onChange={handleSampleInput}
                    name={''}
                  />
                </div>
                <div>
                  <VTypography as='p'>Output:</VTypography>
                  <div className="w-full h-32 p-1 bg-gray-900 text-white text-sm overflow-auto">
                    <pre>{codeOutput || '[0, 1]'}</pre>
                    {codeError && <pre className="text-red-400">{codeError}</pre>}
                  </div>
                </div>
              </div>
              <div className='p-2'>
                <VTypography as='span'>{codeOutput ? 'Execution Completed Successfully in 0.023s' : 'Execution Completed Successfully in 0.023s'}</VTypography>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Floating button to show console when collapsed */}
      {isConsoleCollapsed && (
        <div className="fixed bottom-4 right-6">
          <button
            onClick={toggleConsole}
            className="p-2 text-theme-default rounded-full shadow-lg bg-theme-primary focus:outline-none"
            aria-label="Expand console"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}

export { CodingQuestion };