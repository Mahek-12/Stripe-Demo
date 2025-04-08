import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../lib/axios";
import { authApi } from "../lib/constants/api";

export const useUploadProfilePicture = (onSuccessCallback?: () => void) => {
  const mutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const res = await axiosInstance.post(authApi.UPLOADIMAGE, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      return res.data;
    },
    onSuccess: () => {
      if (onSuccessCallback) onSuccessCallback();
    },
  });

  return {
    uploadProfilePicture: mutation.mutate,
    isUploading: mutation.isPending,
  };
};
