import React from "react";
import { Outlet } from "react-router-dom";


const Login = (props) => {
  return (
  <div className="auth">
    This is the Login page
    <Outlet />
  </div>
  );
};

export default Login;
