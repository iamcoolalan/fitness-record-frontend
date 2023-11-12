import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const withProtectedRoute = (WrappedComponent) => {
  return (props) => {
    const { isAuthenticated  } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
      if (!isAuthenticated) {
        navigate('/login');
      }
    }, [isAuthenticated, navigate]);

    if (!isAuthenticated) {
      return null
    }

    return <WrappedComponent {...props}/>
  }
}

export default withProtectedRoute