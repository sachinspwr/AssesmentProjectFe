import { VButton, VICon, VSwitch } from '@components/atoms';
import { VDropdown } from '@components/molecules/index';
import { FiChevronLeft, FiChevronRight, FiMaximize, FiMinimize, FiMoon, FiPlay, FiSun } from 'react-icons/fi';

interface EditorControlsProps {
  isProblemCollapsed: boolean;
  onToggleProblem: () => void;
  onRunCode: () => void;
  isLoading: boolean;
  languageName?: string;
  selectedLanguageId: number;
  onLanguageChange: (value: string) => void;
  monacoTheme: string;
  onThemeChange: (value: string) => void;
  codingLanguageOptions: { label: string; value: string }[];
  onToggleFullScreen: () => void;
  isFullScreen: boolean;
  onSubmit: () => void;
}

export function EditorControls({
  isProblemCollapsed,
  onToggleProblem,
  onRunCode,
  isLoading,
  selectedLanguageId,
  onLanguageChange,
  monacoTheme,
  onThemeChange,
  codingLanguageOptions,
  onToggleFullScreen,
  isFullScreen,
  onSubmit
}: EditorControlsProps) {
  const isDark = monacoTheme === 'vs-dark';
  return (
    <div className="flex p-2 gap-5 justify-between">
      <div className="flex justify-between items-center gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={onToggleProblem}
            className="p-1"
            aria-label={isProblemCollapsed ? "Show problem" : "Hide problem"}
          >
            <VICon icon={isProblemCollapsed ? FiChevronRight : FiChevronLeft} size={20} />
          </button>
          <VButton onClick={onRunCode} variant='secondary'>
            <VICon icon={FiPlay} size={20} />
            {isLoading ? 'Compiling' : 'Run Code'}
          </VButton>
          <div className='w-24'>
            <VButton onClick={onSubmit}>
              Submit
            </VButton>
          </div>
        </div>
      </div>
      <div className='flex gap-4  items-center'>
        <div className=''>
          <VDropdown
            options={codingLanguageOptions}
            name={'coding_language'}
            onChange={(value) => onLanguageChange(value as string)}
            value={selectedLanguageId.toString()}
            dropdownBtnClasses="border-0"
          />
        </div>
        <div className="w-1/2 flex items-center justify-end gap-3">
          <VICon
            icon={isDark ? FiMoon : FiSun}
            size={22}
            color={isDark ? '#facc15' : '#1e40af'}
            title={isDark ? 'Dark Mode' : 'Light Mode'}
          />
          <VSwitch
            checked={isDark}
            onChange={(value) => onThemeChange(value === 'true' ? 'vs-dark' : 'light')}
          />
        </div>
        <div className='pr-2'>
          <VICon onClick={onToggleFullScreen} icon={isFullScreen ? FiMinimize : FiMaximize} size={18} />
        </div>
      </div>
    </div>
  );
}