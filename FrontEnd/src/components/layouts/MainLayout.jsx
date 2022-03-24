import React from "react";
import Header from "../../pages/core/Header";
import Upload from "../../pages/Upload";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="main-layout">
      <Header />
      <Upload />
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
