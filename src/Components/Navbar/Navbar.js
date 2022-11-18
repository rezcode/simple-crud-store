import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import style from "./Navbar.module.css";
import { useNavigate } from "react-router-dom";

const Navibar = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="/">
            <span className={style.brand}>
              Store <i>Admin</i>
            </span>
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text
              onClick={() => navigate("/login")}
              className={style.link}
            >
              <span className={style.authBtn}>Login</span>
            </Navbar.Text>
            <div className={style.verticalLine}></div>
            <Navbar.Text
              onClick={() => navigate("/register")}
              className={style.link}
            >
              <span className={style.authBtn}>Register</span>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Navibar;
