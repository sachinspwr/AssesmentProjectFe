/* eslint-disable @typescript-eslint/no-explicit-any */
import { SearchCriteria } from '@dto/request';
import { UserResponseDTO } from '@dto/response';
import { FormField } from '@types';
import { MatchOn, Operator } from '@utils/enums';
import { currentUserPermissionNames } from 'store/slices/account.slice';
import { useAppSelector } from 'store/store';

function tryParseJson<T>(jsonString: string): T | null {
  try {
    return JSON.parse(jsonString) as T;
  } catch {
    // If parsing fails, return null
    return null;
  }
}

// Utility function to convert enum to array of objects with a default option
const getOptionsFromEnum = <T extends Record<string, string>>(enumObj: T): { label: string; value: string }[] => {
  const entries = Object.entries(enumObj);

  return [
    ...entries.map(([, value]) => ({
      label: value as string, // Capitalize the key
      value: value as string, // Ensure value is treated as string
    })),
  ];
};

function throttle<T extends (...args: any[]) => void>(func: T, limit: number): T {
  let lastFunc: NodeJS.Timeout | null = null;
  let lastRan: number | null = null;

  return function (this: any, ...args: Parameters<T>): void {
    const context = this;
    if (lastRan == null) {
      func.apply(context, args);
      lastRan = Date.now();
    } else {
      if (lastFunc) {
        clearTimeout(lastFunc);
      }
      lastFunc = setTimeout(
        () => {
          if (Date.now() - lastRan! >= limit) {
            func.apply(context, args);
            lastRan = Date.now();
          }
        },
        limit - (Date.now() - lastRan!)
      );
    }
  } as T;
}

function buildSearchCriteria<TREQ>(
  formData: Record<string, any>, // Adjust to match formData structure
  formConfig: FormField[]
): SearchCriteria<TREQ>[] {
  return formConfig
    .filter((field) => formData[field.name] !== undefined && formData[field.name] !== '')
    .map((field) => {
      const value: string | number | undefined = formData[field.name];

      // Convert boolean and Date values to strings if needed

      // Ensure value is of type string or number, not undefined
      if (value === undefined || value === '') {
        return null; // or use a default value if necessary
      }

      return {
        field: field.name as keyof TREQ,
        operator: Operator.OR,
        matchOn: MatchOn.LIKE,
        value: value as string | number, // Type assertion
      };
    })
    .filter((criteria): criteria is SearchCriteria<TREQ> => criteria !== null); // Remove null entries
}

function getInitials(fullName: string): string {
  // Split the full name into parts
  const nameParts = fullName.trim().split(/\s+/);

  // Extract the first letter of each part and convert to uppercase
  const initials = nameParts.map((part) => part.charAt(0).toUpperCase()).join('');

  return initials;
}

function getFullName(user?: UserResponseDTO): string {
  if(!user) {
    return '';
  }
  return `${user.lastName}, ${user.firstName}`;
}

function splitAndCapitalize(input: string): string {
  return input
    .replace(/([A-Z])/g, ' $1') // Insert space before uppercase letters
    .trim() // Remove leading space
    .split(' ') // Split into words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize each word
    .join(' '); // Join back into a sentence
}

function extractPlaceholders(input: string, regex:RegExp = /\{([^}]+)\}/g): string[] {
  
  if(!input) {
    return [];
  }

  const matches = [...input.matchAll(regex)];
  
  return matches.map(match => match[1]); // Extract only the names inside {}
}

function hasPermission(
  requiredPermission: string
): boolean {
   const userPermissions=useAppSelector(currentUserPermissionNames) ?? [];
  return userPermissions.includes(requiredPermission);
}

export {
  getOptionsFromEnum,
  throttle,
  buildSearchCriteria,
  getInitials,
  getFullName,
  splitAndCapitalize,
  tryParseJson,
  extractPlaceholders,
  hasPermission
};
