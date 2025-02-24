import axiosInstance from "@/lib/axiosInstance";
import { CollegeData } from "../types";
import { endpoints } from "@/lib/endpoint";
import { handleAxiosError } from "@/lib/handleAxiosError";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const updateCollege = async ({data, id}: {data: CollegeData, id: string}) => {
  try {
    const response = await axiosInstance.post(endpoints.updateCollege + id, data);

    return response.data;
  } catch (error) {
    const apiError = handleAxiosError(error);
    throw apiError;
  }
};

export const useUdpateCollege = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: updateCollege,
    onSuccess: () => {
      toast.success("College updated successfully");
      queryClient.invalidateQueries({ queryKey: ["colleges"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return mutation;
};
