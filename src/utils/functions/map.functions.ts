import { VFormFields } from "@types";
import { RegistrationField } from "test-runner/types";

 export const mapApiFieldsToFormFields = (fieldsFromApi: RegistrationField[] = []): VFormFields[] => {
    const maxCols = 12;
    const colSpan = 5;
    const gap = 1;

    let currentRow = 1;
    let currentCol = 1;

    const formFields: VFormFields[] = [];

    // Map normal form fields with dynamic positioning
    for (const field of fieldsFromApi) {
      let startCol = currentCol;
      let endCol = startCol + colSpan - 1;

      // Wrap to next row if exceeds
      if (endCol > maxCols) {
        currentRow++;
        startCol = 1;
        endCol = startCol + colSpan - 1;
      }

      const position = `${currentRow} ${startCol} ${colSpan}`;
      currentCol = endCol + gap;
      // 🔁 Convert string options into array of objects
      let options: { label: string; value: string }[] | undefined = undefined;

      if (typeof field?.options === 'string') {
        options = field.options?.split(',').map((opt) => ({
          label: opt.trim(),
          value: opt.trim(),
        }));
      } else if (Array.isArray(field?.options)) {
        // Already in correct format
        options = field.options;
      }
      formFields.push({
        name: field.name as string,
        label: field.label,
        type: field.type,
        required: true,
        placeholder: field.placeholder ?? '',
        position,
        options,
        validate:
          field.name === 'email'
            ? (value) => {
                const stringValue = value as string;
                const regex = /^[a-z]+[0-9]?[.]?[a-z0-9]+[_]?[a-z0-9]+@[a-zA-Z]{3,}\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?$/;
                if (!regex.test(stringValue)) return 'Invalid email format';
              }
            : undefined,
      });
    }

    // Add action buttons at fixed position on a new row
    currentRow++;

    return formFields;
  };