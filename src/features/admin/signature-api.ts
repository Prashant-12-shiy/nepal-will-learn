import axiosInstance from "@/lib/axiosInstance";
import { endpoints } from "@/lib/endpoint";

export const fetchSignature = async (uploadPreset: string, folder: string) => {
    const timestamp = Math.floor(Date.now() / 1000);
    try {
        const response  = await axiosInstance.post(endpoints.generateSignature, {
            timestamp,
            upload_preset: uploadPreset,
            folder,
        });

        return response.data;
    } catch (error) {
        console.error("Error fetching signature");
        throw error;
    }
}