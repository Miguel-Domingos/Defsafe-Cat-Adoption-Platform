import { useAuthStore } from "@/store";
export default defineNuxtRouteMiddleware((to, from) => {
  const { user, token } = useAuthStore();

  if (user.id && token.access_token && to.name == "auth-login") {
    return navigateTo("/");
  } else if (
    (user.id == "" || token.access_token == "") &&
    to.name == "index"
  ) {
    return navigateTo("/login");
  }
});
