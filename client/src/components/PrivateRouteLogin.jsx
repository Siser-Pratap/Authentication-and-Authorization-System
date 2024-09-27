import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom';

const PrivateRouteLogin = () => {

    const currentUser = useSelector((state)=>state.user.currentUser);

  return (
    currentUser? <Navigate to="/profile"/>:<Outlet />
  )
}

export default PrivateRouteLogin