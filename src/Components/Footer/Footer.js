import React from "react";
import style from "./Footer.module.css";

const Footer = () => {
  return (
    <>
      <div
        className={`d-flex align-items-center justify-content-center bg-primary ${style.footerWrapper}`}
      >
        <span>Store management React JS frontend test - Rezha Riansyah R.</span>
      </div>
    </>
  );
};

export default Footer;
