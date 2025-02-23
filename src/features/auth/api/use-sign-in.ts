import axios from "axios";
import { BASE_URL } from "./auth-endpoint";

import { endpoints } from "./auth-endpoint";
import { LoginData } from "../types";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const login = async (data: LoginData) => {
  try {
    const response = await axios.post(BASE_URL + endpoints.login, data, {
      withCredentials: true, 
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.message || "Login failed";
      const statusCode = error.response?.status;

      console.error("Login error:", errorMessage, statusCode);

      throw {
        message: errorMessage,
        statusCode,
      };
    } else {
      // Handle non-Axios errors (e.g., network errors)
      console.error("Unexpected error during login:", error);
      throw { message: "An unexpected error occurred" };
    }
  }
};

export const useLogin = () => {
  const mutation = useMutation({
    mutationFn: login,
    onSuccess: () => {
      toast.success("Logged In");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return mutation;
};



const AdminLogin = async (data: LoginData) => {
  try {
    const response = await axios.post(BASE_URL + endpoints.loginAdmin, data, {
      withCredentials: true, 
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.message || "Login failed";
      const statusCode = error.response?.status;

      console.error("Login error:", errorMessage, statusCode);

      throw {
        message: errorMessage,
        statusCode,
      };
    } else {
      // Handle non-Axios errors (e.g., network errors)
      console.error("Unexpected error during login:", error);
      throw { message: "An unexpected error occurred" };
    }
  }
};

export const useAdminLogin = () => {
  const mutation = useMutation({
    mutationFn: AdminLogin,
    onSuccess: () => {
      toast.success("Logged In");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return mutation;
};
