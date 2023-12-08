import axios from "axios";

const baseURL = process.env.NODE_ENV === 'development' ? "http://localhost:3001/api" : "https://www.fitness-record.com/api"

const login = async ({ email, password }) => {
  try {
    const { data } = await axios.post(`${baseURL}/login`, {
      email,
      password
    })

    return data
  } catch (error) {
    console.error('[Login filed]:', error)
    
    return error.response.data
  }
}

const register = async ({ name, email, password, passwordCheck, birthday, gender }) => {
  try {
    const { data }  = await axios.post(`${baseURL}/signup`, {
      name,
      email,
      password,
      passwordCheck,
      birthday,
      gender
    })

    return data
  } catch (error) {
    console.error('[Register Failed]: ', error)

    return error.response.data
  }
}

const checkPermission = async (token) => {
  try {
    const { data } = await axios.get(`${baseURL}/check-token`, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })

    return data.status === 'success'
  } catch (error) {
    console.error('[Check Token Failed]: ', error)
    
    return error.response.data
  }
}

export { login, register, checkPermission }