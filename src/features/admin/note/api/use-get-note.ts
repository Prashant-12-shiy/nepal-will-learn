import axiosInstance from "@/lib/axiosInstance";
import { endpoints } from "@/lib/endpoint";
import { handleAxiosError } from "@/lib/handleAxiosError"
import { useQuery } from "@tanstack/react-query";


const getNote = async (id: string) => {
    try {
        const response = await axiosInstance.get(endpoints.getNotes + id);

        return response.data;
    } catch (error) {
        const apiError = handleAxiosError(error);
        return apiError
    }
}

export const useGetNote = (id: string) => {
    return useQuery({
        queryKey: ['note', id],
        queryFn: () => getNote(id),
        retry: 1,
    })
}