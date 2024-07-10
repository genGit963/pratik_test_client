export interface User {
  id: string;
  Name: string;
  Email: string;
  Since: string;
}

export interface UserAuthResponseInterface {
  success: boolean;
  token: string;
  message: string;
  user: User;
}

export interface LoginInterface {
  Email: string;
  Password: string;
}

export interface SignUpInterface {
  Name: string;
  Email: string;
  Password: string;
}
export interface ForgetPasswordInterface {
  Email: string;
}

export interface NewPasswordInterface {
  OTP: string;
  newPassword: string;
}
