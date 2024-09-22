import { defineStore } from "pinia";

interface IAuthenticatedUser {
  user: IUser;
  token: ISession;
}
interface IUser {
  id: string;
  email: string;
  role: string;
}
interface ISession {
  access_token: string;
  expires_at: number;
  token_type: string;
}
const userSchema: IUser = {
  email: "",
  id: "",
  role: "",
};

const sessionSchema: ISession = {
  access_token: "",
  expires_at: 0,
  token_type: "",
};

export const useAuthStore = defineStore("auth", {
  state: (): IAuthenticatedUser => ({
    user: userSchema,
    token: sessionSchema,
  }),
  actions: {
    register(data: { user: IUser; session: ISession }) {
      this.user = data.user;
      this.token = data.session;
      if (this.user.email && this.token.access_token) {
        return navigateTo("/");
      }
    },

    reset() {
      this.user = userSchema;
      this.token = sessionSchema;
      if (this.user.email == "" && this.token.access_token == "") {
        return navigateTo("/login");
      }
    },
  },
  persist: true,
});
