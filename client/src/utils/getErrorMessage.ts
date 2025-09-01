import axios from 'axios';

export function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const responseData = error.response?.data;

    if (typeof responseData === 'string') {
      return responseData;
    }

    if (typeof responseData?.message === 'string') {
      return responseData.message;
    }

    if (typeof responseData?.error === 'string') {
      return responseData.error;
    }

    if (typeof responseData?.errors?.email === 'string') {
      return responseData.errors.email;
    }

    return error.message || 'Something went wrong';
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'Unexpected error';
}
