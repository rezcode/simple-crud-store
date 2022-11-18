import React, { useEffect, useState } from "react";
import style from "./Register.module.css";
import { useSelector, useDispatch } from "react-redux";
import { register, resetLoggedUser } from "../../Redux/features/auth/AuthSlice";
import { useNavigate } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";
import { MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import Swal from "sweetalert2";
import LoadingSpinner from "../../Components/LoadingSpinner/LoadingSpinner";

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const { fullName, email, password } = formData;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      Swal.fire({
        icon: "error",
        text: message,
      });
    }

    if (isSuccess) {
      navigate("/login");
    }

    dispatch(resetLoggedUser());
  }, [user, isSuccess, isError, message, dispatch, navigate]);

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = {
      fullName,
      email,
      password,
    };
    dispatch(register(userData));
  };

  return (
    <>
      <div
        className={`row justify-content-center d-flex align-items-center ${style.registerWrapper}`}
      >
        <div className="card" style={{ width: "30rem" }}>
          <div className="card-body">
            <div className="row text-center">
              <h3>Register</h3>
            </div>
            <div className="row">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">
                    <AiOutlineUser className="mb-1" size={20} /> Username :
                  </label>
                  <input
                    type="text"
                    className="form-control rounded-pill"
                    id="fullName"
                    name="fullName"
                    value={fullName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">
                    <MdOutlineEmail className="mb-1" size={20} /> Email :
                  </label>
                  <input
                    type="email"
                    className="form-control rounded-pill"
                    id="fullName"
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
                    id="fullName"
                    name="password"
                    value={password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <hr />
                <div className="mb-3 text-center d-grid">
                  <button
                    type="submit"
                    className="btn btn-primary rounded-pill"
                    disabled={isLoading}
                  >
                    {isLoading ? <LoadingSpinner /> : "Submit"}
                  </button>
                </div>
              </form>
              <div className="text-center">
                <p className="text-secondary">
                  already have an account?{" "}
                  <span
                    className={`text-primary ${style.link}`}
                    onClick={() => navigate("/login")}
                  >
                    please login here!
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

export default Register;
