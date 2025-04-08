import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../lib/axios";
import { useAlert } from "../providers/AlertProvider";
import { authApi } from "../lib/constants/api";
import { useAuth } from "@/context/AuthContext";

const login = async (data: { email: string; password: string }) => {
  const response = await axiosInstance.post(authApi.LOGIN, data);
  return response.data;
};

export const useLogin = () => {
  const { onErrorAlert, onSuccessAlert } = useAlert();
  const { login: loginContext } = useAuth();

  const { mutate: loginMutation, isPending } = useMutation({
    mutationFn: login,
    onSuccess: (response: { token: any; message: any }) => {
      loginContext(response.token);
      onSuccessAlert(response?.message);
    },
    onError: (err: any) => {
      onErrorAlert(err?.response?.data?.message);
    },
  });

  return { loginMutation, isPending };
};
