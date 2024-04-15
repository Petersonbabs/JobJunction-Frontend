import React, { useEffect, useState } from 'react'
import { UseAuthContext } from '../../contexts/AuthContext'
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom'

// const isDashboardPage = location.pathname.startsWith("/dashboard")

const IsCompany = () => {
  const { user, setErrorMessage } = UseAuthContext()
  const [redirect, setRedirect] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const isDashboardPage = location.pathname.startsWith("/dashboard")

  useEffect(() => {
    const isCompany = user.role === "company"

    if (!isCompany) {
      setRedirect(true)
    }

  }, [user])

  useEffect(() => {
    if (redirect) {
      navigate("/dashboard")
    }
  }, [redirect, navigate])

  useEffect(() => {
    if (redirect) {
      setErrorMessage("You have to be a company to access the page.")
    }
  }, [redirect, setErrorMessage, isDashboardPage])

  return <Outlet />
}

export default IsCompany
