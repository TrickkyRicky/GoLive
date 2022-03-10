import React from "react";
import Header from "../pages/core/Header";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="main-layout">
      <Header/>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
