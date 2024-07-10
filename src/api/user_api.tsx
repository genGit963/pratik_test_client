import {
  ForgetPasswordInterface,
  LoginInterface,
  NewPasswordInterface,
  SignUpInterface,
} from "../models/user";
import APP_API from "./config_axios";

const USER_APIs = {
  // login
  login: async (login_data: LoginInterface) => {
    // console.log(
    //   "login_portal: ",
    //   import.meta.env.VITE_BASE_API_URL,
    //   login_data
    // );
    return await APP_API.request({
      url: "/api/user/login",
      method: "POST",
      data: login_data,
      headers: {
        Accept: "application/json",
      },
    });
  },

  signup: async (signup_data: SignUpInterface) => {
    return await APP_API.request({
      url: "/api/user/signup",
      method: "POST",
      data: signup_data,
      headers: {
        Accept: "application/json",
      },
    });
  },

  forget_password: async (data: ForgetPasswordInterface) => {
    return await APP_API.request({
      url: "/api/user/forget_password",
      method: "POST",
      data: data,
      headers: {
        Accept: "application/json",
      },
    });
  },

  new_password: async (new_data: NewPasswordInterface) => {
    return await APP_API.request({
      url: "/api/user/new_password",
      method: "POST",
      data: new_data,
      headers: {
        Accept: "application/json",
      },
    });
  },

  get_user_detail: async (token: string) => {
    return await APP_API.request({
      url: "/api/user/me",
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
  },
};

export default USER_APIs;
