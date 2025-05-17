import MarkdownIt from 'markdown-it';
import { useState } from 'react';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import VMarkdown from './v-markdown-render.organism';
import { VTypography } from '@components/molecules/typography/v-typography.mol';

interface MarkdownEditorWithPreviewProps {
  initialValue?: string;
  onChange?: (value: string) => void;
  height?: string;
  showPreview?: boolean;
}

function MarkdownEditorWithPreview({
  initialValue = '',
  onChange, 
  height = '800px',
  showPreview: initialShowPreview = true,
}: MarkdownEditorWithPreviewProps) {
  const [markdownText, setMarkdownText] = useState(initialValue);
  const [showPreview, setShowPreview] = useState(initialShowPreview);
  const mdParser = new MarkdownIt();

  const handleEditorChange = ({ text }: { text: string }) => {
    setMarkdownText(text);
    onChange?.(text);
  };

  return (
    <div className="flex border border-theme-default w-full">
      {/* Markdown Editor (full width if preview is hidden) */}
      <div className={showPreview ? 'w-1/2' : 'w-full'}>
        <MdEditor
          value={markdownText}
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

      {/* Preview Panel */}
      {showPreview ? (
        <div className="w-1/2 overflow-hidden border-l" style={{ height }}>
          <div className="flex flex-col h-full">
            {/* Toggle button inside preview */}
            <div className="flex justify-between items-center px-4 py-1.5 border-b" style={{backgroundColor:'#f5f5f5'}}>
              <VTypography as="span">Live Preview</VTypography>
              <button
                onClick={() => setShowPreview(false)}
                className="text-xs px-2 py-1 border rounded bg-white hover:bg-gray-100"
              >
                Hide Preview
              </button>
            </div>
            <div className="flex-1 overflow-auto p-4">
              <VMarkdown content={markdownText} />
            </div>
          </div>
        </div>
      ) : (
        <div className="absolute right-2 top-2 z-10">
          <button
            onClick={() => setShowPreview(true)}
            className="text-xs px-2 py-1 border rounded bg-white hover:bg-gray-100"
          >
            Show Preview
          </button>
        </div>
      )}
    </div>
  );
}

export default MarkdownEditorWithPreview;
