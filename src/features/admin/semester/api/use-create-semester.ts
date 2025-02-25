import axiosInstance from "@/lib/axiosInstance";
import {  SemesterData } from "../types";
import { endpoints } from "@/lib/endpoint";
import { handleAxiosError } from "@/lib/handleAxiosError";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const createSemester = async (data: SemesterData) => {
  try {
    const response = await axiosInstance.post(endpoints.createSemester, data);

    return response.data;
  } catch (error) {
    const apiError = handleAxiosError(error);
    throw apiError;
  }
};

export const useCreateSemester = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createSemester,
    onSuccess: () => {
      toast.success("Semester created successfully");
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      queryClient.invalidateQueries({ queryKey: ["semesters"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return mutation;
};
