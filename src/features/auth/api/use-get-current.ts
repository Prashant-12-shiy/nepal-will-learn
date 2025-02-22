import axiosInstance from "@/lib/axiosInstance";
import { endpoints } from "./auth-endpoint";
import { handleAxiosError } from "@/lib/handleAxiosError";
import { useQuery } from "@tanstack/react-query";

const getCurrent = async () => {
  try {
    const response = await axiosInstance.get(endpoints.getCurrent);

    return response.data;
  } catch (error) {
    const apiError = handleAxiosError(error);
    throw apiError;
  }
};

export const useGetCurrent = () => {
  return useQuery({
    queryKey: ["getCurrent"],
    queryFn: getCurrent,
    retry: 1,
  });
};
