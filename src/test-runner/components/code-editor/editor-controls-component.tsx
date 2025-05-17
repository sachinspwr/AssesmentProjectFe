import { VButton, VICon } from '@components/atoms';
import { VDropdown } from '@components/molecules/index';
import { VTypography } from '@components/molecules/typography/v-typography.mol';
import { FiPlay, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

interface EditorControlsProps {
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
}

export function EditorControls({
  isProblemCollapsed,
  onToggleProblem,
  onRunCode,
  isLoading,
  languageName,
  selectedLanguageId,
  onLanguageChange,
  monacoTheme,
  onThemeChange,
  codingLanguageOptions
}: EditorControlsProps) {
  return (
    <div className="flex p-2 gap-5 justify-between border-b-2">
      <div className="flex justify-between items-center mb-2 gap-4">
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
        </div>
        <VTypography as='span'>{languageName}</VTypography>
      </div>
      <div className='flex gap-2 w-1/2'>
        <div className='w-1/2'>
          <VDropdown
            options={codingLanguageOptions}
            name={'coding_language'}
            onChange={(value) => onLanguageChange(value as string)}
            value={selectedLanguageId.toString()}
          />
        </div>
        <div className='w-1/2'>
          <VDropdown
            options={[
              { value: 'light', label: 'light' },
              { value: 'vs-dark', label: 'vs-dark' },
            ]}
            name={'coding_theme'}
            onChange={(value) => onThemeChange(value as string)}
            value={monacoTheme?.toString()}
          />
        </div>
      </div>
    </div>
  );
}