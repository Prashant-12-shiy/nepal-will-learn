import axiosInstance from "@/lib/axiosInstance";
import { endpoints } from "@/lib/endpoint";
import { handleAxiosError } from "@/lib/handleAxiosError"
import { useQuery } from "@tanstack/react-query";

const getColleges = async() => {
    try {
        const response = await axiosInstance.get(endpoints.getColleges);

        return response.data;
    } catch (error) {
        const apiError = handleAxiosError(error);
        throw apiError;
    }
}

export const useGetColleges = () => {
    return useQuery({
        queryKey: ["colleges"],
        queryFn: getColleges,
        retry: 1,
        staleTime: 1000 * 60 * 5 // 5 minutes
    })
}