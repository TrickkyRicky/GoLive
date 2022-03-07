import React from 'react';
import {
    Outlet,
  } from "react-router-dom";

export default function Layout() {
  return (
    <div className='main-layout'>
      <div className="content">
        <Outlet />
      </div>
    </div>
  )
}
