import toast from 'react-hot-toast';
import { AxiosBaseQueryError } from './base.query';

export const getApiError = (error: AxiosBaseQueryError): string => {
  const { data } = error;

  let errorMessage = 'An error occurred. Please try again.';

  if (data) {
    if (data.errors && Array.isArray(data.errors)) {
      if (data.errors.length > 0 && data.errors[0].constraints) {
        const firstError = Object.values(data.errors[0].constraints)[0] as string;
        errorMessage = firstError || errorMessage;
      }
    } else if (data.message) {
      errorMessage = data.message;
    }
  }

  return errorMessage;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const handleApiError = (err: any): string => {
  let errorMessage = 'An unexpected error occurred';
  if (err?.error?.message) {
    errorMessage = err?.error?.message;
  } else if (err as Error) {
    errorMessage = err.message;
  }
  return errorMessage;
};


export const handleQueryResponse= async <T>(
  _: T, // Ignored argument (query argument)
  { queryFulfilled }: { queryFulfilled: Promise<unknown> },
  successMessage?: string // Optional success message
) => {
  // eslint-disable-next-line no-useless-catch
  try {
    await queryFulfilled;
    if (successMessage) {
      toast.success(successMessage);
    }
  } catch (err) {
    // toast.error(handleApiError(err));
    throw err; // Ensures error propagates correctly
  }
};


