import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../lib/axios";
import { authApi } from "../lib/constants/api";

const getUser = async () => {
  const response = await axiosInstance.get(authApi.PROFILE);
  return response.data;
};

export const useGetUser = () => {
  return useMutation({
    mutationFn: getUser,
  });
};
