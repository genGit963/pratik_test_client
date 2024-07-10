import React from "react";
import { Outlet } from "react-router-dom";
import "./app_layout.scss";
import Footer from "../components/footer";
import Header from "../components/header";

const AppLayout: React.FC = () => {
  return (
    <div>
      <Header />
      <div className="app_container">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default AppLayout;
