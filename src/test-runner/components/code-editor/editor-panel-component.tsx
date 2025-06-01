/* eslint-disable @typescript-eslint/no-explicit-any */
import { VTypography } from '@components/molecules/typography/v-typography.mol';
import MonacoEditor from '@monaco-editor/react';
import config from './coding-cofig.component';
import { EditorControls } from './editor-controls-component';
import { FaCode } from 'react-icons/fa6';

interface EditorPanelProps {
    width: string;
    isConsoleCollapsed: boolean;
    isProblemCollapsed: boolean;
    onToggleProblem: () => void;
    onRunCode: () => void;
    isLoading: boolean;
    languageName: string;
    selectedLanguageId: number;
    onLanguageChange: (value: string) => void;
    monacoTheme: string;
    onThemeChange: (value: string) => void;
    codingLanguageOptions: { label: string; value: string }[];
    onChangeCodeEditor: (value: any) => void;
    onEditorWillMount: (monaco: any) => void;
    defaultValue: string;
    onSubmit: () => void;
    onToggleFullscreen: () => void;
    isFullScreen: boolean;
}

export function EditorPanel({
    width,
    isConsoleCollapsed,
    isProblemCollapsed,
    onToggleProblem,
    onRunCode,
    isLoading,
    languageName,
    selectedLanguageId,
    onLanguageChange,
    monacoTheme,
    onThemeChange,
    codingLanguageOptions,
    onChangeCodeEditor,
    onEditorWillMount,
    defaultValue,
    onSubmit,
    onToggleFullscreen,
    isFullScreen
}: EditorPanelProps) {
    return (
        <div className="h-full flex flex-col gap-3" style={{ width }}>
            <div className='border rounded-lg'>
                <EditorControls
                    isProblemCollapsed={isProblemCollapsed}
                    onToggleProblem={onToggleProblem}
                    onRunCode={onRunCode}
                    isLoading={isLoading}
                    languageName={languageName}
                    selectedLanguageId={selectedLanguageId}
                    onLanguageChange={onLanguageChange}
                    monacoTheme={monacoTheme}
                    onThemeChange={onThemeChange}
                    codingLanguageOptions={codingLanguageOptions}
                    onToggleFullScreen={onToggleFullscreen}
                    isFullScreen={isFullScreen}
                    onSubmit={onSubmit}
                />
            </div>
            <div className="flex-1 border rounded-lg">
                <div className="flex justify-between items-center border-b py-1 px-4">
                    <div className="flex space-x-2">
                        <FaCode className="h-5 w-5 pt-1" />
                        <VTypography as='p' className='font-medium text-theme-default'>Code</VTypography>
                    </div>
                </div>
                <MonacoEditor
                    theme={monacoTheme}
                    onChange={onChangeCodeEditor}
                    height={isConsoleCollapsed ? "calc(100vh - 210px)" : `calc(100vh - 150px - ${isConsoleCollapsed ? 0 : 200}px)`}
                    path={languageName?.toString()}
                    defaultValue={defaultValue}
                    defaultLanguage={languageName?.toString()}
                    options={{
                        ...config.options,
                        scrollbar: {
                            verticalScrollbarSize: 4,
                            horizontalScrollbarSize: 4,
                            arrowSize: 4,
                            useShadows: false,
                        },
                        padding: { top: 20 },
                    }}
                    beforeMount={onEditorWillMount}
                />
            </div>
        </div>
    );
}