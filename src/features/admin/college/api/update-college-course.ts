import axiosInstance from "@/lib/axiosInstance";
import { endpoints } from "@/lib/endpoint";
import { handleAxiosError } from "@/lib/handleAxiosError";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const addCollegeCourse = async ({data, id}: {data: {courses: string[]}, id: string}) => {
  try {
    const response = await axiosInstance.post(endpoints.addCollegeCourse + id + "/course", data);

    return response.data;
  } catch (error) {
    const apiError = handleAxiosError(error);
    throw apiError;
  }
};

export const useAddCollegeCourse = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: addCollegeCourse,
    onSuccess: () => {
      toast.success("Course added successfully");
      queryClient.invalidateQueries({ queryKey: ["colleges"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return mutation;
};
