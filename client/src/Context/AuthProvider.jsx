import { createContext, useEffect, useState } from "react";

import axios from "axios";

export const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [data, setData] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    const getaccessToken = async () => {
      try {
        const res = await axios.post(
          "http://localhost:5000/api/v1/user/refresh",
          {},
          {
            withCredentials: true,
          }
        );

        if (res.data.success) {
          setAccessToken(res.data.accessToken);
          setData(res.data.user);
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          // Do nothing, user not logged in
        } else {
          console.error("Error during refresh token check:", error);
        }
      }
    };

    getaccessToken();
  }, []);

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
      console.log(res.data);

      if (res.data.success) {
        setAccessToken(res.data.accessToken);
        setData(res.data.user);
        return true;
      }
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  // const forgetPassword = async (email) => {
  //   try {
  //     const res = await axios.post(
  //       "http://localhost:5000/api/v1/user/forgotPassword",
  //       { email },
  //       {
  //         withCredentials: true,
  //       }
  //     );
  //     if (res.data.success) {
  //       return true;
  //     }
  //   } catch (error) {
  //     console.error(
  //       "Forget Password Error:",
  //       error.response?.data || error.message
  //     );
  //     return false;
  //   }
  // };

  const forgotPassword = async (email) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/user/forgotPassword",
        { email },
        {
          withCredentials: true, // optional
        }
      );
      if (res.data.success) {
        return true;
      }
    } catch (error) {
      console.error(
        "Forget Password Error:",
        error.response?.data || error.message
      );
      return false;
    }
  };

  const resetPassword = async (userId, token, newPassword) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/user/resetPassword",
        {
          userId,
          token,
          newPassword,
        },
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        return true;
      }
    } catch (error) {
      console.error("Reset Password Error:", error);
    }
  };

  const logout = async () => {
    if (!accessToken) return;
    try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/user/logout",
        {},
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        setUserId(null);
        setAccessToken(null);
        setData(null);
      }
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <>
      <AuthContext.Provider
        value={{
          userId,
          login,
          accessToken,
          otpVerify,
          data,
          logout,
          forgotPassword,
          resetPassword,
        }}
      >
        {children}
      </AuthContext.Provider>
    </>
  );
};

export default AuthProvider;
