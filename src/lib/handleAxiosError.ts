import axios from "axios";

// Define the error type
interface ApiError {
  message: string;
  statusCode?: number;
}

// Utility function to handle Axios errors
export const handleAxiosError = (error: unknown): ApiError => {
  if (axios.isAxiosError(error)) {
    // Handle Axios errors (e.g., 4xx or 5xx responses)
    const errorMessage =
      error.response?.data?.message ||
      error.response?.data?.error ||
      "Something went wrong";
    const statusCode = error.response?.status;

    console.error("Axios error:", errorMessage, statusCode);

    return {
      message: errorMessage,
      statusCode,
    };
  } else {
    // Handle non-Axios errors (e.g., network errors, runtime errors)
    console.error("Unexpected error:", error);
    return {
      message: "An unexpected error occurred",
    };
  }
};