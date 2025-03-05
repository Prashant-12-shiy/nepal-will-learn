import axiosInstance from "@/lib/axiosInstance";
import { UniversityData } from "../types";
import { endpoints } from "@/lib/endpoint";
import { handleAxiosError } from "@/lib/handleAxiosError";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const updateUniversity = async ({
  data,
  id,
}: {
  data: UniversityData;
  id: string;
}) => {
  try {
    const response = await axiosInstance.post(
      endpoints.updateUniversity + id,
      data
    );

    return response.data;
  } catch (error) {
    const apiError = handleAxiosError(error);
    throw apiError;
  }
};

export const useUdpateUniversity = (id?: string) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: updateUniversity,
    onSuccess: () => {
      toast.success("University updated successfully");
      queryClient.invalidateQueries({ queryKey: ["universities"] });
      if (id) {
        queryClient.invalidateQueries({ queryKey: ["university", id] });
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return mutation;
};
