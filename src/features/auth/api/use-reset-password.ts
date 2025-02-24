import axios from "axios";
import { BASE_URL, endpoints } from  "@/lib/endpoint";
import { ResetPasswordData } from "../types";
import { handleAxiosError } from "@/lib/handleAxiosError";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const resetPassword = async ({data, id}: {data: ResetPasswordData, id: string}) => {
  try {
    const response = await axios.post(BASE_URL + endpoints.resetPassword + id, data);

    return response.data;
  } catch (error) {
    const apiError = handleAxiosError(error);
    throw apiError;
  }
};

export const useResetPassword = () => {
  const mutation = useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      toast.success("Password reset");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return mutation;
};
