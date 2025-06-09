import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthProvider";
import { useNavigate, useSearchParams } from "react-router-dom";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const { resetPassword } = useContext(AuthContext);
  const [searchParams] = useSearchParams();
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const token = searchParams.get("token");
    const userId = searchParams.get("id");

    console.log("Token:", token);
    console.log("UserID:", userId);

    if (token && userId) {
      setToken(token);
      setUserId(userId);
    }
  }, [searchParams]);

  const handleReset = async (e) => {
    e.preventDefault();

    const success = await resetPassword(userId, token, password);
    if (success) {
      alert("Password reset successful");
      setPassword("");
      navigate("/");
    }
  };
  return (
    <div className="flex items-center justify-center mt-40">
      <form
        onSubmit={handleReset}
        className="bg-white p-6 rounded-xl shadow-md w-80"
      >
        <h2 className="text-xl font-semibold mb-4 text-center">
          Password Reset
        </h2>
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
          placeholder="Enter new password"
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

export default ResetPassword;
