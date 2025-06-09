import { NavLink, useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthProvider";

const Home = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const { login, forgetPassword } = useContext(AuthContext);

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
    console.log(user);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(user);
    if (success) {
      alert("Otp sent on your email");
      setUser({ email: "", password: "" });
      navigate("/otp");
    }
  };

  return (
    <section className="mt-8 lg:mt-20 flex justify-center items-center">
      <div className="relative w-10/12 sm:w-3/4 md:w-2/5 lg:w-1/4 border-2 rounded-xl p-4 md:p-6 bg-white bg-opacity-60">
        <h1 className="text-center mt-3 text-2xl font-bold">Login</h1>

        <form onSubmit={handleSubmit} className="p-4">
          <div className="flex flex-col gap-1 mt-2">
            <label className="text-sm font-semibold"> Email</label>
            <input
              onChange={handleChange}
              className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400"
              type="email"
              placeholder="Enter your email"
              name="email"
              value={user.email}
            />
          </div>

          <div className="flex flex-col gap-1 mt-2 relative">
            <label className="text-sm font-semibold">Password</label>
            <input
              onChange={handleChange}
              className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              name="password"
              value={user.password}
            />

            <div className="absolute top-9 right-3 cursor-pointer">
              {!showPassword ? (
                <VisibilityOffIcon
                  onClick={() => setShowPassword(!showPassword)}
                  fontSize="small"
                />
              ) : (
                <VisibilityIcon
                  onClick={() => setShowPassword(!showPassword)}
                  fontSize="small"
                />
              )}
            </div>
          </div>

          <p className="text-right text-sm font-semibold text-indigo-600">
            <NavLink to={"/forget-password"}>Forget password?</NavLink>
          </p>

          <div className="flex flex-col gap-1 mt-4 ">
            <button
              type="submit"
              className="bg-[#27667B] text-white font-bold p-2 rounded-lg"
            >
              Login
            </button>
            <p>
              Don't have an account?
              <NavLink
                className={"text-indigo-600 font-semibold"}
                to={"/signup"}
              >
                Signup
              </NavLink>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Home;
