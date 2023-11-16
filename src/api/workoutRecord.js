import axios from "axios";

const baseURL = 'http://localhost:3001/api'

const axiosInstance = axios.create({ baseURL })

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    console.error('[Request Failed]:', error)
  }
)

export const getWorkoutRecords = async (endDate, startDate) => {
  try {
    const res = await axiosInstance.get(`${baseURL}/workout-record`, {
      params: {
        startDate,
        endDate
      }
    })

    return res
  } catch (error) {
    console.error('[Get Workout Records Failed]:', error)
    return error
  }
}

export const getWorkoutRecord = async (recordId) => {
  try {
    const res = await axiosInstance.get(`${baseURL}/workout-record/${recordId}`)

    return res
  } catch (error) {
     console.error('[Get Workout Record Failed]:', error)
    return error
  }
}