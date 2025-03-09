import axiosInstance from "@/lib/axiosInstance";
import { endpoints } from "@/lib/endpoint";
import { handleAxiosError } from "@/lib/handleAxiosError"
import { useQuery } from "@tanstack/react-query";


const getSubject = async (slug: string) => {
    try {
        const response = await axiosInstance.get(endpoints.getSubject + slug);

        return response.data;
    } catch (error) {
        const apiError = handleAxiosError(error);
        return apiError
    }
}

export const useGetSubject = (slug: string) => {
    return useQuery({
        queryKey: ['subject', slug],
        queryFn: () => getSubject(slug),
        retry: 1,
    })
}