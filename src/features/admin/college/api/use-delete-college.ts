import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import axiosInstance from "@/lib/axiosInstance";
import { endpoints } from "@/lib/endpoint";
import { handleAxiosError } from "@/lib/handleAxiosError";

const deleteCollege = async (id: string) => {
  try {
    const response = await axiosInstance.delete(endpoints.deleteCollege + id);

    return response.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
};

export const useDeleteCollege = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteCollege,
    onSuccess: () => {
      toast.success("College deleted");
      queryClient.invalidateQueries({ queryKey: ["colleges"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return mutation;
};
