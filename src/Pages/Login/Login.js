import React, { useState, useEffect } from "react";
import style from "./Login.module.css";
import { useSelector, useDispatch } from "react-redux";
import { login, resetLoggedUser } from "../../Redux/features/auth/AuthSlice";
import { useNavigate } from "react-router-dom";
import { MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import Swal from "sweetalert2";
import LoadingSpinner from "../../Components/LoadingSpinner/LoadingSpinner";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      Swal.fire({
        icon: "error",
        text: message,
      });
    }

    if (isSuccess || user) {
      navigate("/");
    }

    dispatch(resetLoggedUser());
  }, [user, isError, isSuccess, navigate, message, dispatch]);

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email,
      password,
    };
    dispatch(login(userData));
  };

  return (
    <>
      <div
        className={`row justify-content-center d-flex align-items-center ${style.loginWrapper}`}
      >
        <div className="card" style={{ width: "30rem" }}>
          <div className="card-body">
            <div className="row text-center">
              <h3>Login</h3>
            </div>
            <div className="row">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">
                    <MdOutlineEmail className="mb-1" size={20} /> Email :
                  </label>
                  <input
                    type="email"
                    className="form-control rounded-pill"
                    id="email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">
                    <RiLockPasswordLine className="mb-1" size={20} /> Password :
                  </label>
                  <input
                    type="password"
                    className="form-control rounded-pill"
                    id="password"
                    name="password"
                    value={password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <hr />
                <div className="mb-3 text-center d-grid">
                  <button
                    className="btn btn-primary rounded-pill"
                    disabled={isLoading}
                  >
                    {isLoading ? <LoadingSpinner /> : "Submit"}
                  </button>
                </div>
              </form>
              <div className="text-center">
                <p className="text-secondary">
                  Don't have account yet?{" "}
                  <span
                    className={`text-primary ${style.link}`}
                    onClick={() => navigate("/register")}
                  >
                    register here!
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
