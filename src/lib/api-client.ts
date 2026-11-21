import axios from "axios";

const baseURL =
  process.env["NEXT_PUBLIC_API_BASE_URL"] || "http://localhost:5000/api";

export const apiClient = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Standardize error message extraction
    const responseData = error.response?.data;
    const errorMessage =
      responseData?.message ||
      (responseData?.errors && responseData.errors[0]?.message) ||
      error.message ||
      "An unexpected error occurred.";
    const errorCode = responseData?.code;

    const customError = new Error(errorMessage) as Error & {
      code?: string;
      status?: number;
      details?: unknown;
    };
    customError.code = errorCode;
    customError.status = error.response?.status;
    customError.details = responseData;

    return Promise.reject(customError);
  }
);
