import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import axiosInstance from "@/lib/axiosInstance";
import { endpoints } from "@/lib/endpoint";
import { handleAxiosError } from "@/lib/handleAxiosError";

const deleteCourse = async (id: string) => {
  try {
    const response = await axiosInstance.delete(endpoints.deleteCourse + id);

    return response.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
};

export const useDeleteCourse = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteCourse,
    onSuccess: () => {
      toast.success("Course deleted");
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return mutation;
};
