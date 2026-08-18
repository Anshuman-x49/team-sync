import { axiosInstance } from "../../../../config/axiosInstance";

export const getAllEmployees = async (params?: { page?: number; limit?: number }) => {
    try {
        const res = await axiosInstance.get('/employee', { params });
        return res.data?.data ?? res.data;
    } catch (error) {
        console.log(error);
        return null;
    }
};
