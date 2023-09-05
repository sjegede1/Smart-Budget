import React, { useContext, useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { AuthContext } from "../../contexts/auth_context";

function ProtectedRoutes() {
    const {uid, verifyToken} = useContext(AuthContext)

    console.log('ProtectedRoutes.jsx',uid)

    useEffect(() => {
      verifyToken()
    })

    // TODO: Use user for pretected routes
  //If token saved in cookies redirect to protected route
  return uid ? (
    <Outlet />
  ) : (
    <div>
      <h1>You are not logged in</h1>
      <Link to='/auth'>Log In</Link>
    </div>
  );
}

export default ProtectedRoutes;