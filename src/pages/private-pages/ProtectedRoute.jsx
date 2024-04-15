import React, { useEffect } from 'react'
import { UseAuthContext } from '../../contexts/AuthContext'
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom'
const isLoginPage = location.pathname.startsWith('/login');
// console.log(isLoginPage)

const ProtectedRoute = () => {

    const { token, user, setWarningMessage } = UseAuthContext()
    const location = useLocation()
    const navigate = useNavigate()
   


    return (
        token ? <Outlet /> : navigate("/login")
    )






}

export default ProtectedRoute