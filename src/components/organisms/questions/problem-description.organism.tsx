import { VFormFieldData } from "@types";
import MarkdownEditorWithPreview from "../markdown/v-markdown-editor.organism";

interface ProblemDescriptionEditorProps {
  name: string;
  label?: string;
  value: string;
  onChange: (value: string, additionalUpdates?: Partial<VFormFieldData>) => void;
  disabled?: boolean;
}

export function ProblemDescriptionEditor({
//   label = 'Problem Description',
  value = '',
  onChange,
}: ProblemDescriptionEditorProps) {
  const handleChange = (newValue: string) => {
    onChange(newValue, {});
  };

  return (
    <div className="flex flex-col gap-4 pb-4 border-b-2">
      
      <div className="relative w-full">
        <MarkdownEditorWithPreview 
          initialValue={value}
          onChange={handleChange}
          height="300px"
        />
      </div>
    </div>
  );
}