import { axiosInstance, baseURL } from "./axiosConfig";

export const getBodydataRecords = async (
  limit,
  selectedPage,
  endDate,
  startDate
) => {
  try {
    const res = await axiosInstance.get(`${baseURL}/bodydata-record`, {
      params: {
        startDate,
        endDate,
        limit,
        page: selectedPage,
      },
    });

    return res.data
  } catch (error) {
    console.error("[Get Bodydata Records Failed]:", error);
    return error;
  }
};

export const getBodydataRecord = async (bodyRecordId) => {
  try {
    const res = await axiosInstance.get(`${baseURL}/bodydata-record/${bodyRecordId}`)

    return res.data
  } catch (error) {
    console.error("[Get Bodydata Record Failed]:", error);
    return error;
  }
}