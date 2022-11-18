import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import style from "./Navbar.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout, resetLoggedUser } from "../../Redux/features/auth/AuthSlice";
import Swal from "sweetalert2";

const Navibar = () => {
  const navigate = useNavigate();
  const userLogged = {
    user: JSON.parse(localStorage.getItem("user")),
    token: JSON.parse(localStorage.getItem("userToken")),
  };
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    dispatch(resetLoggedUser());
    Swal.fire({
      text: "You have successfully logged out!",
      icon: "success",
    });
    navigate("/");
  };

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
            {userLogged.token ? (
              <>
                <Navbar.Text>
                  <span className={style.linkDisable}>
                    {userLogged.user.fullname}
                  </span>
                </Navbar.Text>
                <div className={style.verticalLine}></div>
                <Navbar.Text className={style.link}>
                  <span className={style.authBtn} onClick={handleLogout}>
                    Logout
                  </span>
                </Navbar.Text>
              </>
            ) : (
              <>
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
              </>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Navibar;
