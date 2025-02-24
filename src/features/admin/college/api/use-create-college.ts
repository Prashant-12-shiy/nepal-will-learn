import axiosInstance from "@/lib/axiosInstance";
import { CollegeData } from "../types";
import { endpoints } from "@/lib/endpoint";
import { handleAxiosError } from "@/lib/handleAxiosError";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const createCollege = async (data: CollegeData) => {
  try {
    const response = await axiosInstance.post(endpoints.createCollege, data);

    return response.data;
  } catch (error) {
    const apiError = handleAxiosError(error);
    throw apiError;
  }
};

export const useCreateCollege = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createCollege,
    onSuccess: () => {
      toast.success("College created successfully");
      queryClient.invalidateQueries({ queryKey: ["colleges"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return mutation;
};
