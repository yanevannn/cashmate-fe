import { apiPublicClient } from "./axios";

export type LoginCredentials = {
  email: string;
  password: string;
};

export type RegisterCredentials = {
  username: string;
  email: string;
  password: string;
};

const doLogin = async (credentials: LoginCredentials) => {
  const response = await apiPublicClient.post("/auth/login", credentials);
  return response;
};

const doRegister = async (credentials: RegisterCredentials) => {
  const response = await apiPublicClient.post("/auth/register", credentials);
  return response;
};

const doActivate = async (email: string, code: string) => {
  const response = await apiPublicClient.post("/auth/activate", {
    email,
    code,
  });
  return response;
};

const doResendActivationCode = async (email: string) => {
  const response = await apiPublicClient.post("/auth/resend-activation", {
    email,
  });
  return response;
};

export { doLogin, doRegister, doActivate, doResendActivationCode };
