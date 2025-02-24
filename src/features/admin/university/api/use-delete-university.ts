import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import axiosInstance from "@/lib/axiosInstance";
import { endpoints } from "@/lib/endpoint";
import { handleAxiosError } from "@/lib/handleAxiosError";

const deleteUniversity = async (id: string) => {
  try {
    const response = await axiosInstance.delete(endpoints.deleteUniversity + id);

    return response.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
};

export const useDeleteUniversity = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteUniversity,
    onSuccess: () => {
      toast.success("University deleted");
      queryClient.invalidateQueries({ queryKey: ["universities"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return mutation;
};
