import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";

export const MainLayout: React.FC = () => {
  return (
    <div className="main-layout-container">
      <Header />
      <main className="page-container">
        <Outlet />
      </main>
    </div>
  );
};
