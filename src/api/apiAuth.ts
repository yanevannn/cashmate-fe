import apiClient from "./axios";

type LoginCredentials = {
    email: string;
    password: string;
}

type RegisterCredentials = {
    username: string;
    email: string;
    password: string;
}

const doLogin = async (credentials : LoginCredentials) => {
    const response = await apiClient.post("/auth/login", credentials);
    return response;
}

const doRegister = async (credentials : RegisterCredentials) => {
    const response = await apiClient.post("/auth/register", credentials);
    return response;
}

export { doLogin, doRegister };
