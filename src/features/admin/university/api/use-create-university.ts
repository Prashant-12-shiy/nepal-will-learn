import axiosInstance from "@/lib/axiosInstance";
import { CreateUniversityData } from "../types";
import { endpoints } from "@/lib/endpoint";
import { handleAxiosError } from "@/lib/handleAxiosError";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { uploadToCloudinary } from "@/lib/uploadFile";

const createUniversity = async (data: CreateUniversityData) => {
  try {

    let logoUrl = "";

    // Upload Logo if it exists
    if (data.logo && data.logo.length > 0) {
      const logo = data.logo[0];
      logoUrl = await uploadToCloudinary(logo, "image", "university-logos");
    }

    // Upload Images if they exist
    const imageUrls = data.images && data.images.length > 0
      ? await Promise.all(
          data.images.map((image) => uploadToCloudinary(image, "image", "university-images"))
        )
      : [];

    const payload = { ...data, logo: logoUrl, images: imageUrls };

    const response = await axiosInstance.post(endpoints.createUniversity, payload);

    return response.data;
  } catch (error) {
    const apiError = handleAxiosError(error);
    throw apiError;
  }
};

export const useCreateUniversity = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createUniversity,
    onSuccess: () => {
      toast.success("University created successfully");
      queryClient.invalidateQueries({ queryKey: ["universities"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return mutation;
};
