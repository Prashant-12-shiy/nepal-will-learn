import axiosInstance from "@/lib/axiosInstance";
import { endpoints } from "@/lib/endpoint";
import { handleAxiosError } from "@/lib/handleAxiosError"
import { useQuery } from "@tanstack/react-query";

const getCourseBySlug = async (slug: string) => {
    try {
        const response = await axiosInstance.get(endpoints.getCourseBySlug + slug);

        return response.data;
    } catch (error) {
        const apiError = handleAxiosError(error);
        throw apiError;
    }
}

export const useGetCourseBySlug = (slug: string) => {
    return useQuery({
        queryKey: ["course", slug],
        queryFn: () => getCourseBySlug(slug),
        retry: 1,
        staleTime: 1000 * 60 * 5 // 5 minutes,
    })
};