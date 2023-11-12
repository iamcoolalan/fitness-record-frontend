import { useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import { useEffect } from "react"

const useCheckAuthenticated = () => {
  const { isAuthenticated  } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/')
    }
  }, [isAuthenticated, navigate])
}

export default useCheckAuthenticated