import axios from "axios";
import { BASE_URL, endpoints } from "@/lib/endpoint";
import { forgotPasswordData } from "../types";
import { handleAxiosError } from "@/lib/handleAxiosError";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const forgotPassword = async (data: forgotPasswordData) => {
  try {
    const response = await axios.post(BASE_URL + endpoints.forgotPassword, data);

    return response.data;
  } catch (error) {
    const apiError = handleAxiosError(error);
    throw apiError;
  }
};

export const useForgotPassword = () => {
  const mutation = useMutation({
    mutationFn: forgotPassword,
    onSuccess: () => {
      toast.success("Reset link has been send to your email address");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return mutation;
};
