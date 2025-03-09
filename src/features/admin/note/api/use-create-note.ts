import axiosInstance from "@/lib/axiosInstance";
import { NoteData } from "../types";
import { endpoints } from "@/lib/endpoint";
import { handleAxiosError } from "@/lib/handleAxiosError";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { uploadToCloudinary } from "@/lib/uploadFile";

const createNote = async (data: NoteData) => {
  try {
    let contentUrl = "";

    if (data.content && data.content.length > 0) {
      const content = data.content[0];
      contentUrl = await uploadToCloudinary(content, "raw", "notes");
    }

    const payload = { ...data, content: contentUrl };
    const response = await axiosInstance.post(endpoints.createNote, payload);
    return response.data;
  } catch (error) {
    const ApiError = handleAxiosError(error);
    return ApiError;
  }
};

export const useCreateNote = (subjectSlug: string) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["subject"], subjectSlug})
      toast.success("Note Created");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return mutation;
};
