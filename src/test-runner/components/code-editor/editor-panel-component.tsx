import MonacoEditor from '@monaco-editor/react';
import config from './coding-cofig.component';
import { EditorControls } from './editor-controls-component';

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
    defaultValue
}: EditorPanelProps) {
    return (
        <div className="h-full flex flex-col" style={{ width }}>
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
            />
            <div className="flex-1 p-2">
                <MonacoEditor
                    theme={monacoTheme}
                    onChange={onChangeCodeEditor}
                    height={isConsoleCollapsed ? "calc(100vh - 120px)" : `calc(100vh - 120px - ${isConsoleCollapsed ? 0 : 200}px)`}
                    path={languageName?.toString()}
                    defaultValue={defaultValue}
                    defaultLanguage={languageName?.toString()}
                    options={config.options}
                    beforeMount={onEditorWillMount}
                />
            </div>
        </div>
    );
}