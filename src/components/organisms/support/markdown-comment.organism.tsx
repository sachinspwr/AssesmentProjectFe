import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { VButton } from '@components/atoms';

interface VMarkdownCommentProps {
  value: string;
  onChange?: (value: string) => void;
  onSubmit?: () => void;
  height?: string;
  isLoading?: boolean;
  buttonLabel?: string;
}

export function VMarkdownComment({
  value,
  onChange,
  onSubmit,
  height = '200px',
  isLoading = false,
  buttonLabel = 'Post',
}: VMarkdownCommentProps) {
  const mdParser = new MarkdownIt();

  const handleEditorChange = ({ text }: { text: string }) => {
    onChange?.(text);
  };

  return (
    <div className="w-full mt-4 space-y-4">
      <div className="w-full">
        <MdEditor
          value={value}
          style={{ height }}
          renderHTML={(text) => mdParser.render(text)}
          onChange={handleEditorChange}
          placeholder="Write your markdown here..."
          view={{ menu: true, md: true, html: false }}
          config={{
            canView: {
              menu: true,
              md: true,
              html: false,
              fullScreen: false,
              both: false,
            },
          }}
        />
      </div>
      {onSubmit && (
        <div className="w-40">
          <VButton onClick={onSubmit} isLoading={isLoading}>
            {buttonLabel}
          </VButton>
        </div>
      )}
    </div>
  );
}
