import axios from "axios";

const register = async (userData) => {
  const response = await axios.post(
    `${process.env.REACT_APP_API_URL}/auth/register`,
    userData
  );

  return response.data;
};

const login = async (userData) => {
  const response = await axios.post(
    `${process.env.REACT_APP_API_URL}/auth/login`,
    userData
  );

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data.data));
    localStorage.setItem("userToken", JSON.stringify(response.data.token));
  }
  return response.data;
};

const logout = () => {
  localStorage.clear();
};

const authService = {
  register,
  login,
  logout,
};

export default authService;
