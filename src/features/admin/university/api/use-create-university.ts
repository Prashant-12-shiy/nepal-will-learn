import axiosInstance from "@/lib/axiosInstance";
import { UniversityData } from "../types";
import { endpoints } from "@/lib/endpoint";
import { handleAxiosError } from "@/lib/handleAxiosError";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const createUniversity = async (data: UniversityData) => {
  try {
    const response = await axiosInstance.post(endpoints.createUniversity, data);

    return response.data;
  } catch (error) {
    const apiError = handleAxiosError(error);
    throw apiError;
  }
};

export const useCreateUniversity = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createUniversity,
    onSuccess: () => {
      toast.success("University created successfully");
      queryClient.invalidateQueries({ queryKey: ["universitys"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return mutation;
};
