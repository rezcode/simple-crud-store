import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../Components/Footer/Footer";
import Navbar from "../Components/Navbar/Navbar";
import style from "./Layout.module.css";

const Layout = () => {
  return (
    <>
      <Navbar />
      <div className={style.wrapper}>
        <div className="container mt-4">
          <Outlet />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Layout;
