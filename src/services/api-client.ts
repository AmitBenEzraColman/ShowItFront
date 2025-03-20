import axios, { CanceledError } from "axios";

export { CanceledError };

const baseURL = "https://node126.cs.colman.ac.il"

const refreshCacheApiClient = axios.create({
    baseURL: baseURL,
    withCredentials: true,
});

const apiClient = axios.create({
    baseURL: baseURL,
    withCredentials: true,
});

apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (
            error.response.status === 401 &&
            !originalRequest._retry &&
            !originalRequest.url.includes("/auth/login")
        ) {
            originalRequest._retry = true;

            try {
                await refreshCacheApiClient.get("/auth/refresh");
                return await axios(originalRequest);
            } catch (error) {
                window.location.href = "/login";
                console.log("Error: ", error);
            }
        }

        return Promise.reject(error);
    }
);

export default apiClient;