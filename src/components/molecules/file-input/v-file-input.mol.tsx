import { VImage, VInput } from '@components/atoms';
import React, { ChangeEvent, useState } from 'react';
import toast from 'react-hot-toast';

export type VFileInputProps = DefaultProps & {
  name: string;
  required?: boolean;
  disabled?: boolean;
  onChangeFile: (file: File, originalEvent?: React.ChangeEvent<HTMLInputElement>) => void;
  accept?: string;
  showPreview?: boolean; // Whether to show the preview of the uploaded file
  previewClassName?: string; // Class name for image preview
  inputClassName?: string; // Class name for VInput (if any)
  label?: string; // Optional label
};

function VFileInput({
  name,
  required = false,
  disabled = false,
  accept,
  onChangeFile,
  showPreview = true,
  previewClassName = '',
  inputClassName = '',
  label = '',
}: VFileInputProps) {
  const [filePreview, setFilePreview] = useState<string | null>(null); // State to hold file preview URL
  const [fileName, setFileName] = useState<string>(''); // State to hold file name

  // Handle file input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    if (file) {
      const allowedExtensions = accept?.split(',').map((ext) => ext.trim().toLowerCase()) || [];
      const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();

      if (!allowedExtensions.includes(fileExtension)) {
        toast.error(`Only ${allowedExtensions.join(', ')} files are allowed.`);
        return;
      }

      setFileName(file.name); // Set the file name
      if (onChangeFile) onChangeFile(file, e); // Pass file to parent on change
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
        URL.revokeObjectURL(filePreview); // Free up memory when the component is unmounted
      }
    };
  }, [filePreview]);

  return (
    <div className="space-y-4">
      {label && <label className="font-medium">{label}</label>}
      <div className="flex flex-col gap-4">
        {/* File Input using VInput */}
        <VInput
          name={name}
          type="file"
          required={required}
          disabled={disabled}
          onChange={(v, e) => handleFileChange(e as ChangeEvent<HTMLInputElement>)}
          className={`!p-0 file:border file:border-theme-primary hover:file:bg-theme-primary-hover file:py-2.5 file:px-5  file:text-sm file:font-semibold file:bg-theme-primary file:text-theme-on-primary focus:outline-none focus:ring-1 focus:ring-theme-primary  ${inputClassName}`}
        />
        {filePreview && (
          <div className={`relative w-full h-48 ${previewClassName}`}>
            {/* Preview the selected image */}
            <VImage src={filePreview} alt={fileName} className="object-cover w-full h-full" />
          </div>
        )}
      </div>
    </div>
  );
}

export { VFileInput };
