import axiosInstance from "@/lib/axiosInstance";
import { CourseData } from "../types";
import { endpoints } from "@/lib/endpoint";
import { handleAxiosError } from "@/lib/handleAxiosError";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const updateCourse = async ({data, id}: {data: CourseData, id: string}) => {
  try {
    const response = await axiosInstance.post(endpoints.updateCourse + id, data);

    return response.data;
  } catch (error) {
    const apiError = handleAxiosError(error);
    throw apiError;
  }
};

export const useUdpateCourse = (id?: string) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: updateCourse,
    onSuccess: () => {
      toast.success("Course updated successfully");
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      if (id) {
        queryClient.invalidateQueries({ queryKey: ["course", id] });
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return mutation;
};
