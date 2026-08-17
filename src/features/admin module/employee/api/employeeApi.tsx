import { axiosInstance } from "../../../../config/axiosInstance"

export const getAllEmployees = async () => {
    try {
        const res = await axiosInstance.get('/employee')
        return res.data.data;
    } catch (error) {
        console.log(error)
    }
}