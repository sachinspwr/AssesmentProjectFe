import React, { useState } from 'react';

export type FileInputProps = DefaultProps & {
  name: string;
  required?: boolean;
  disabled?: boolean;
  onChangeFile: (file: File, originalEvent?: React.ChangeEvent<HTMLInputElement>) => void;
  accept?: string;
  showPreview?: boolean; // property for preview
};

export function FileInput({
  name,
  required = false,
  disabled = false,
  onChangeFile,
  accept = '',
  showPreview = true // Default value set to true
}: FileInputProps) {
  const [filePreview, setFilePreview] = useState<string | null>(null); // State to hold the file preview URL

  // Handle file input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    if (onChangeFile && file) {
      onChangeFile(file, e); // Pass both file and event as arguments
      if (showPreview) {
        const previewUrl = URL.createObjectURL(file); // Create a preview URL for the file
        setFilePreview(previewUrl); // Set the preview URL in state
      }
    }
  };

  // Clean up the preview URL when the component unmounts
  React.useEffect(() => {
    return () => {
      if (filePreview) {
        URL.revokeObjectURL(filePreview); // Free up memory
      }
    };
  }, [filePreview]);

  return (
    <div>
      <input
        name={name}
        type="file"
        className="border rounded-lg p-2 text-sm text-rose-950
                      file:py-2 file:px-4
                      file:rounded-full file:border-0
                      file:text-sm file:font-semibold
                      file:bg-rose-100 file:text-black
                      hover:file:bg-rose-200
                      focus:outline-none focus:ring-2 focus:ring-blue-500"
        required={required}
        disabled={disabled}
        onChange={handleFileChange}
        accept={accept}
      />
    </div>
  );
}