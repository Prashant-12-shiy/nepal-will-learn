import axiosInstance from "@/lib/axiosInstance";
import { endpoints } from "@/lib/endpoint";
import { handleAxiosError } from "@/lib/handleAxiosError"
import { useQuery } from "@tanstack/react-query";

const getCourses = async() => {
    try {
        const response = await axiosInstance.get(endpoints.getCourses);

        return response.data;
    } catch (error) {
        const apiError = handleAxiosError(error);
        throw apiError;
    }
}

export const useGetCourses = () => {
    return useQuery({
        queryKey: ["courses"],
        queryFn: getCourses,
        retry: 1,
        staleTime: 1000 * 60 * 5 // 5 minutes
    })
}