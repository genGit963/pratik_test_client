import React from "react";
import { Outlet } from "react-router-dom";
import "./auth_layout.scss";

const AuthLayout: React.FC = () => {
  return (
    <div>
      <div className="auth_container">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
