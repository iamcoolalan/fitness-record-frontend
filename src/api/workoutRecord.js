import axios from "axios";

const baseURL = "http://localhost:3001/api";

const axiosInstance = axios.create({ baseURL });

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    console.error("[Request Failed]:", error);
  }
);

export const getWorkoutRecords = async (
  limit,
  selectedPage,
  endDate,
  startDate
) => {
  try {
    const res = await axiosInstance.get(`${baseURL}/workout-record`, {
      params: {
        startDate,
        endDate,
        limit,
        page: selectedPage,
      },
    });

    return res;
  } catch (error) {
    console.error("[Get Workout Records Failed]:", error);
    return error;
  }
};

export const getWorkoutRecord = async (recordId) => {
  try {
    const res = await axiosInstance.get(
      `${baseURL}/workout-record/${recordId}`
    );

    return res;
  } catch (error) {
    console.error("[Get Workout Record Failed]:", error);
    return error;
  }
};

export const getWorkoutCategories = async () => {
  try {
    const res = await axiosInstance.get(`${baseURL}/workout-record/category`)

    return res.data.data
  } catch (error) {
    console.error("[Get Workout Record Categories Failed]:", error);
    return error;
  }
}

export const createWorkoutRecord = async (recordName, date, workoutTime) => {
  try {
    const res = await axiosInstance.post(`${baseURL}/workout-record`, {
      name: recordName,
      date,
      workoutTime
    })

    return res
  } catch (error) {
    console.error("[Create Workout Record Failed]:", error);
    return error;
  }
}

export const createWorkoutRecordDetail = async (workoutRecordId, detailList) => {
  try {
    const res = await axiosInstance.post(`${baseURL}/workout-record/${workoutRecordId}/details`, detailList)

    return res
  } catch (error) {
    console.error("[Create Workout Record Detail Failed]:", error);
    return error;
  }
}

export const updateWorkoutRecord = async (workoutRecordId, updateData) => {
  try {
    const res = await axiosInstance.patch(`${baseURL}/workout-record/${workoutRecordId}`, {
      name: updateData.recordName,
      date: updateData.date,
      workoutTime: updateData.workoutTime
    })

    return res
  } catch (error) {
    console.error("[Update Workout Record Failed]:", error);
    return error;
  }
}

export const updateWorkoutDetail = async (workoutRecordId, updateDetails) => {
  try {
    const res = await axiosInstance.patch(`${baseURL}/workout-record/${workoutRecordId}/details`, updateDetails)

    return res
  } catch (error) {
    console.error("[Update Workout Record Detail Failed]:", error);
    return error;
  }
} 