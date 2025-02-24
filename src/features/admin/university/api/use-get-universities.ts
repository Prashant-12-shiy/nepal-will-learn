import axiosInstance from "@/lib/axiosInstance";
import { endpoints } from "@/lib/endpoint";
import { handleAxiosError } from "@/lib/handleAxiosError"
import { useQuery } from "@tanstack/react-query";

const getUniversities = async() => {
    try {
        const response = await axiosInstance.get(endpoints.getUniversities);

        return response.data;
    } catch (error) {
        const apiError = handleAxiosError(error);
        throw apiError;
    }
}

export const useGetUniversities = () => {
    return useQuery({
        queryKey: ["universities"],
        queryFn: getUniversities,
        retry: 1,
        staleTime: 1000 * 60 * 5 // 5 minutes
    })
}