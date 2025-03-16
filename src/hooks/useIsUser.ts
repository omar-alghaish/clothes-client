import { useGetMeQuery } from "@/redux/features/auth/authApi";

export const useIsUser = () => {
  const { data } = useGetMeQuery({});

  if (data?.status === "success") {
    return data?.data?.user;
  }

  return false;
};
