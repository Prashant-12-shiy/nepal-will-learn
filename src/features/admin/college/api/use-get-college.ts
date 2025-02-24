import axiosInstance from "@/lib/axiosInstance";
import { endpoints } from "@/lib/endpoint";
import { handleAxiosError } from "@/lib/handleAxiosError"
import { useQuery } from "@tanstack/react-query";

const getCollegeById = async(id: string) => {
    try {
        const response = await axiosInstance.get(endpoints.getCollegeById + id);
        console.log(id);
        

        return response.data;
    } catch (error) {
        const apiError = handleAxiosError(error);
        throw apiError;
    }
}

export const useGetCollegeById = (id: string) => {
    return useQuery({
        queryKey: ["colleges", id],
        queryFn: () => getCollegeById(id),
        retry: 1,
        staleTime: 1000 * 60 * 5 // 5 minutes,
    })
}