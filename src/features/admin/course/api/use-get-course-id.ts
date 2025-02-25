import axiosInstance from "@/lib/axiosInstance";
import { endpoints } from "@/lib/endpoint";
import { handleAxiosError } from "@/lib/handleAxiosError"
import { useQuery } from "@tanstack/react-query";

const getCourseById = async (id: string) => {
    try {
        const response = await axiosInstance.get(endpoints.getCourseById + id);

        return response.data;
    } catch (error) {
        const apiError = handleAxiosError(error);
        throw apiError;
    }
}

export const useGetCourseById = (id: string) => {
    return useQuery({
        queryKey: ["course", id],
        queryFn: () => getCourseById(id),
        retry: 1,
        staleTime: 1000 * 60 * 5 // 5 minutes,
    })
};