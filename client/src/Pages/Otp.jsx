import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthProvider";

const Otp = () => {
  const { otpVerify } = useContext(AuthContext);
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    const success = await otpVerify(otp);
    if (success) {
      alert("Logged in successfully");
      setOtp("");
      navigate("/welcome");
    }
  };
  return (
    <div className="flex items-center justify-center mt-40">
      <form
        onSubmit={handleOtpSubmit}
        className="bg-white p-6 rounded-xl shadow-md w-80"
      >
        <h2 className="text-xl font-semibold mb-4 text-center">
          Enter OTP to Login
        </h2>
        <input
          type="text"
          maxLength={6}
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter OTP"
          className="w-full p-2 border focus:outline-none focus:ring-2 focus:ring-sky-400 rounded mb-4"
          required
        />
        <button
          type="submit"
          className="w-full bg-[#27667B] text-white font-bold p-2 rounded-lg"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Otp;
