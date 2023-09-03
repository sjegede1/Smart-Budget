import React, { useState } from "react";
import { Outlet } from "react-router-dom";

function ProtectedRoutes() {
    // TODO: Import uid from context auth
    const [uid, setUid] = useState(1)

  //If token saved in cookies redirect to protected route
  return uid ? (
    <Outlet />
  ) : (
    <h1>You are not authorized to see this page!!</h1>
  );
}

export default ProtectedRoutes;