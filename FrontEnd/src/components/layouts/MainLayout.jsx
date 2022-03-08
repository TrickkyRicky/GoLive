import React from "react";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="main-layout">
      <div className="content">
        <h1>HELOO LAyut</h1>
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
