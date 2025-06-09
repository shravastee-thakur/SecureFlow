import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./Context/AuthProvider";

import Navbar from "./Components/Navbar";
import Home from "./Pages/Home"; // your login page
import SignUp from "./Pages/SignUp";
import ForgetPassword from "./Pages/ForgetPassword";
import ChangePassword from "./Pages/ChangePassword";
import Otp from "./Pages/Otp";
import Welcome from "./Pages/Welcome";
import Admin from "./Pages/Admin";
import Unauthorised from "./Pages/Unauthorised";
import ResetPassword from "./Pages/ResetPassword";

const App = () => {
  const { accessToken, data } = useContext(AuthContext);

  return (
    <div className="bg-slate-300 h-screen">
      <BrowserRouter>
        <Navbar />
        <Routes>
          {/* Unauthenticated routes */}
          {!accessToken && (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/otp" element={<Otp />} />
              <Route path="/forget-password" element={<ForgetPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/change-password" element={<ChangePassword />} />
              <Route path="*" element={<Navigate to="/" />} />
            </>
          )}

          {/* Authenticated routes */}
          {accessToken && (
            <>
              <Route path="/welcome" element={<Welcome />} />

              {/* Admin-only route */}
              {data?.role === "admin" ? (
                <Route path="/admin" element={<Admin />} />
              ) : (
                <Route
                  path="/admin"
                  element={<Navigate to="/unauthorised" />}
                />
              )}

              {/* Fallback route for authenticated users */}
              <Route path="*" element={<Navigate to="/welcome" />} />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
