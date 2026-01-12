import { getCurrentUser } from "../api/user.api";
import { login, logout } from "../store/slice/authSlice";
import { redirect } from "@tanstack/react-router";

export const checkAuth = async ({ context }) => {
  try {
    const { queryClient, store } = context;

    // Use fetchQuery with staleTime: 0 to always check with the server
    const user = await queryClient.fetchQuery({
      queryKey: ["currentUser"],
      queryFn: getCurrentUser,
      staleTime: 0, // Always fetch fresh data
    });

    if (!user) {
      store.dispatch(logout());
      throw redirect({ to: "/auth" });
    }

    store.dispatch(login(user));
    return true;
  } catch (error) {
    const { store } = context;
    store.dispatch(logout());
    console.log(error);
    throw redirect({ to: "/auth" });
  }
};
