import axios from "axios";
import { BASE_URL, endpoints } from "./auth-endpoint";
import { VerifyEmailData } from "../types";
import { handleAxiosError } from "@/lib/handleAxiosError";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const verifyEmail = async (data: VerifyEmailData) => {
  try {
    const response = await axios.post(BASE_URL + endpoints.verifyEmail, data);

    return response.data;
  } catch (error) {
    const apiError = handleAxiosError(error);
    throw apiError;
  }
};

export const useVerifyEmail = () => {
  const mutation = useMutation({
    mutationFn: verifyEmail,
    onSuccess: () => {
      toast.success("Email Verified");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return mutation;
};
