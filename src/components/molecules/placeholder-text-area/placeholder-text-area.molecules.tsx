import { VLabel, VTextArea } from "@components/atoms";
import React, { useState } from "react";

type PlaceholderTextAreaProps = {
  onValidInput?: (input: string) => void;
  label?: string;
  placeholder?: string;
  rows?: number;
  allowedChars?: RegExp;
  minPlaceholders?: number;
  sequentialPlaceholders?: boolean;
  required?: boolean;
  disabled?: boolean;
  labelClasses?: ClassName;
  helpText?: string;
  reflectErrors?:boolean;
  mode?: 'view' | 'edit';
  pageChildren?: React.ReactNode;
};

function PlaceholderTextArea({
  onValidInput,
  label = "Enter text with placeholders (use {0}, {1}, ...):",
  placeholder = "Example: The capital of {0} is {1}.",
  rows = 4,
  allowedChars = /^[A-Za-z0-9\s.,?!{}]+$/,
  minPlaceholders = 1,
  sequentialPlaceholders = true,
  required = true,
  disabled,
  labelClasses,
  helpText,
  reflectErrors = true,
  mode = 'edit',
  pageChildren
}: PlaceholderTextAreaProps) {
  const [text, setText] = useState("");
  const [error, setError] = useState<string | null>(null);

  function validateInput(input: string): string {
    const trimmed = input.trim();

    if (!allowedChars.test(trimmed)) {
      return "Only letters, numbers, spaces, punctuation, and placeholders like {0} are allowed.";
    }

    const placeholders = trimmed.match(/\{(\d+)\}/g) || [];
    if (placeholders.length < minPlaceholders) {
      return `You must include at least ${minPlaceholders} placeholder(s) like {0}.`;
    }

    if (sequentialPlaceholders) {
      const numbers = placeholders
        .map((ph) => parseInt(ph.replace(/[{}]/g, ""), 10))
        .sort((a, b) => a - b);

      for (let i = 0; i < numbers.length; i++) {
        if (numbers[i] !== i) {
          return "Placeholders must be sequential starting at {0}.";
        }
      }
    }

    return "";
  }

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const value = e.target.value;
    setText(value);

    const validationError = validateInput(value);
    setError(validationError);

    if (!validationError && onValidInput) {
      onValidInput(value);
    }
  }

  return (
    <div style={{ maxWidth: 600 }}>
      <VLabel htmlFor="placeholderTextArea" className={`mb-2 ${labelClasses}`}>
        {label}
      </VLabel>

      {mode === 'view' ? (
        <div
          className="bg-gray-100 text-gray-800 border border-gray-300 rounded p-2 min-h-[100px]"
          style={{ whiteSpace: "pre-wrap" }}
        >
          {text || <i className="text-gray-400">{placeholder}</i>}
        </div>
      ) : (
        <>
          <VTextArea
            name="placeholderTextArea"
            rows={rows}
            value={text}
            required={required}
            onChange={(v, e) => handleChange(e!)}
            placeholder={placeholder}
            disabled={disabled}
            aria-describedby={error ? "errorMsg" : undefined}
            helpText={helpText}
          />

          {pageChildren}

          {reflectErrors && error && (
            <div
              id="errorMsg"
              style={{ color: "red", marginTop: 6, fontWeight: "bold" }}
              role="alert"
              aria-live="assertive"
            >
              {error}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default PlaceholderTextArea;
