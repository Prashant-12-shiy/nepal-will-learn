import axiosInstance from "@/lib/axiosInstance";
import { endpoints } from "@/lib/endpoint";
import { handleAxiosError } from "@/lib/handleAxiosError"
import { useQuery } from "@tanstack/react-query";

const getUniversityById = async(id: string) => {
    try {
        const response = await axiosInstance.get(endpoints.getUniversityById + id);
        

        return response.data;
    } catch (error) {
        const apiError = handleAxiosError(error);
        throw apiError;
    }
}

export const useGetUniversityById = (id: string) => {
    return useQuery({
        queryKey: ["university", id],
        queryFn: () => getUniversityById(id),
        retry: 1,
        staleTime: 1000 * 60 * 5 // 5 minutes,
    })
}