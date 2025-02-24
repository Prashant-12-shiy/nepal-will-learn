import axios from "axios";
import { BASE_URL } from  "@/lib/endpoint";

import { endpoints } from  "@/lib/endpoint";
import { RegisterData } from "../types";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const register = async (data: RegisterData) => {
  try {
    const response = await axios.post(BASE_URL + endpoints.register, data);

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.message || "Registration failed";
      const statusCode = error.response?.status;

      console.error("Registration error:", errorMessage, statusCode);

      throw {
        message: errorMessage,
        statusCode,
      };
    } else {
      // Handle non-Axios errors (e.g., network errors)
      console.error("Unexpected error during registration:", error);
      throw { message: "An unexpected error occurred" };
    }
  }
};

export const useRegister = () => {
  const mutation = useMutation({
    mutationFn: register,
    onSuccess: () => {
      toast.success("Verification Token has been send to your email");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return mutation;
};


