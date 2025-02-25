import axiosInstance from "@/lib/axiosInstance";
import {  CourseData } from "../types";
import { endpoints } from "@/lib/endpoint";
import { handleAxiosError } from "@/lib/handleAxiosError";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const createCourse = async (data: CourseData) => {
  try {
    const response = await axiosInstance.post(endpoints.createCourse, data);

    return response.data;
  } catch (error) {
    const apiError = handleAxiosError(error);
    throw apiError;
  }
};

export const useCreateCourse = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createCourse,
    onSuccess: () => {
      toast.success("Course created successfully");
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return mutation;
};
