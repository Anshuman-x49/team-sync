import axios from "axios"

export const axiosInstance = axios.create({
    baseURL: 'https://team-sync-backend-n78w.onrender.com/api',
    withCredentials: true,
})

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                await axiosInstance.get("/auth/get-accessToken");
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                window.location.href = "/auth/login";
                return Promise.reject(refreshError);
            }
        }
    }
)