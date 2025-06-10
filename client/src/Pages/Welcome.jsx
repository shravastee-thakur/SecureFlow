import { useContext } from "react";
import { AuthContext } from "../Context/AuthProvider";
import { NavLink, useNavigate } from "react-router-dom";

const Welcome = () => {
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
      <h1 className="text-4xl font-bold">Welcome {data?.name}</h1>
      <div className="flex gap-4 mt-4">
        {data?.role === "admin" && (
          <button
            onClick={() => navigate("/admin")}
            className="bg-green-500 hover:bg-green-600 text-white cursor-pointer rounded-xl px-3 py-2"
          >
            Admin Page
          </button>
        )}

        <button className="bg-orange-500 hover:bg-orange-600 text-white cursor-pointer rounded-xl px-3 py-2">
          <NavLink to={"/change-password"}>Change Password</NavLink>
        </button>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white cursor-pointer rounded-xl px-3 py-2"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Welcome;
