import { fetchSignature } from "@/features/admin/signature-api"
import axios from "axios";

export const uploadToCloudinary = async (
    selectedFile: File,
    resourceType: string,
    folderPath = '',
) => {
    try { 
        const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET as string
        const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME as string;
        const {signature, timestamp} = await fetchSignature(
            uploadPreset, folderPath
    )

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("upload_preset", uploadPreset);
    formData.append("signature", signature);
    formData.append("timestamp", timestamp);
    formData.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY as string);

    if(folderPath) {
        formData.append("folder", folderPath);
    }

    const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`, formData
    )

    const secure_url = response.data.secure_url;

    return secure_url;
    } catch (error) {
        console.error("Error uploading file:", error);
        throw error; 
    }
}