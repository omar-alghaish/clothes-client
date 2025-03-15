import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useGetMeQuery } from "@/redux/features/auth/authApi";

export const useIsUser = () => {
  const { data } = useGetMeQuery();

  if (data?.status === "success") {
    return data?.data?.user;
  }

  return false;
};
