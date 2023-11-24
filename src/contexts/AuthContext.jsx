import { login, register, checkPermission } from "../api/loginSystem";
import { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const defaultAuthContext = {
  isAuthenticated: false,
  currentUser: null,
  login: null,
  register: null,
  logout: null
}

const AuthContext = createContext(defaultAuthContext)

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [payload, setPayload] = useState(null)

  const { pathname } = useLocation()

  useEffect(() => {
    const checkTokenIsValid = async () => {
      const token = localStorage.getItem('token')

      if (!token) {
        setIsAuthenticated(false)
        setPayload(null)
        return
      }

      const result = await checkPermission(token)

      if (result) {
        const temptPayload = jwtDecode(token)

        setIsAuthenticated(true)
        setPayload(temptPayload)
      } else {
        setIsAuthenticated(false)
        setPayload(null)
      }
    }

    checkTokenIsValid()
  }, [pathname])

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        currentUser: payload && {
          id: payload.id
        },

        register: async (data) => {
          const result = await register({
            name: data.name,
            email: data.email,
            password: data.password,
            passwordCheck: data.passwordCheck,
            birthday: data.birthday,
            gender: data.gender,
            isRegister: true
          })

          return result
        },

        login: async (data) => {
          const result = await login({
            email: data.email,
            password: data.password
          })

          const token = result.token ? result.token : null

          if (token) {
            const temptPayload = jwtDecode(token)

            setIsAuthenticated(true)
            setPayload(temptPayload)
            localStorage.setItem('token', token)
          } else {
            setIsAuthenticated(false)
            setPayload(null)
          }

          return result
        },

        logout: () => {
          localStorage.removeItem('token')
          setIsAuthenticated(false)
          setPayload(null)
        }
      }}
    >
      { children }
    </AuthContext.Provider>
  )
}