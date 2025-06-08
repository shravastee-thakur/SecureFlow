import { createContext, useState } from "react";

import axios from "axios";

export const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  const login = async (userData) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/user/login",
        userData,
        { withCredentials: true }
      );
      console.log(res.data);

      if (res.data.success) {
        setUserId(res.data.userId);
        return true;
      }
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const otpVerify = async (otp) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/user/login/verify",
        { userId, otp },
        {
          withCredentials: true,
        }
      );
      console.log(res);

      if (res.data.success) {
        setAccessToken(res.data.accessToken);
        return true;
      }
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <>
      <AuthContext.Provider value={{ userId, login, accessToken, otpVerify }}>
        {children}
      </AuthContext.Provider>
    </>
  );
};

export default AuthProvider;
