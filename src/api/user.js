import { axiosInstance, baseURL } from "./axiosConfig";

export const getUserInfo = async () => {
  try {
    const res = await axiosInstance.get(`${baseURL}/user/info`)

    return res.data.data
  } catch (error) {
    console.error("[Get User Info Failed]:", error);
    return error;
  }
}


export const getUserTarget = async () => {
  try {
    const res = await axiosInstance.get(`${baseURL}/user/target`)

    return res.data.data
  } catch (error) {
    console.error("[Get User Target Failed]:", error);
    return error;
  }
}
