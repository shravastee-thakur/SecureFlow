import { useContext } from "react";
import { AuthContext } from "../Context/AuthProvider";
import { useNavigate } from "react-router-dom";
const Admin = () => {
  const navigate = useNavigate();
  const { data, logout } = useContext(AuthContext);

  const handleLogout = (e) => {
    e.preventDefault();
    const success = logout();
    if (success) {
      alert("Logged out successfully");
      navigate("/");
    }
  };
  return (
    <div className="flex flex-col items-center justify-center mt-44">
      <h1 className="text-4xl font-bold">Welcome Admin</h1>

      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 mt-5 text-white cursor-pointer rounded-xl px-3 py-2"
      >
        Logout
      </button>
    </div>
  );
};

export default Admin;
