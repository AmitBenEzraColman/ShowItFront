import { CodeResponse } from "@react-oauth/google";
import apiClient from "./api-client";

export interface User {
    fullName?: string;
    email: string;
    password?: string;
    imgUrl?: string;
    _id?: string;
}

export const register = (user: User) => {
    return new Promise<void>((resolve, reject) => {
        apiClient
            .post("/auth/register", user)
            .then(() => {
                resolve();
            })
            .catch((error) => {
                console.log(error);
                reject(error);
            });
    });
};

export const update = (user: User) => {
    return new Promise<void>((resolve, reject) => {
        apiClient
            .put(`/users/`, user)
            .then(() => {
                resolve();
            })
            .catch((error) => {
                console.log(error);
                reject(error);
            });
    });
};

export const login = (user: User) => {
    return new Promise<void>((resolve, reject) => {
        apiClient
            .post("/auth/login", user)
            .then(() => {
                resolve();
            })
            .catch((error) => {
                console.log(error);
                reject(error);
            });
    });
};

export const logout = () => {
    return new Promise<void>((resolve, reject) => {
        apiClient
            .get("/auth/logout")
            .then(() => {
                resolve();
            })
            .catch((error) => {
                console.log(error);
                reject(error);
            });
    });
};

export const googleSignin = (credentialResponse: CodeResponse) => {
    return new Promise<void>((resolve, reject) => {
        apiClient
            .post("/auth/google", credentialResponse)
            .then(() => {
                resolve();
            })
            .catch((error) => {
                reject(error);
            });
    });
};

export const getMyUserData = () => {
    return new Promise<User>((resolve, reject) => {
        apiClient
            .get("/users/connected")
            .then((response) => {
                resolve(response.data as User);
            })
            .catch((error) => {
                reject(error);
            });
    });
};