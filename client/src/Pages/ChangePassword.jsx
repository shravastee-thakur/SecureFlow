import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthProvider";

const ChangePassword = () => {
  const navigate = useNavigate();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const { changePassword } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const success = await changePassword(oldPassword, newPassword);
    if (success) {
      alert("Password changed successfully");
      setOldPassword("");
      setNewPassword("");
      navigate("/welcome");
    }
  };

  return (
    <section className="mt-8 lg:mt-20 flex justify-center items-center">
      <div className="relative w-10/12 sm:w-3/4 md:w-2/5 lg:w-1/4 border-2 rounded-xl p-4 md:p-6 bg-white bg-opacity-60">
        <h1 className="text-center mt-3 text-2xl font-bold">Change Password</h1>

        <form onSubmit={handleSubmit} className="p-4">
          <div className="flex flex-col gap-1 mt-2 relative">
            <label className="text-sm font-semibold">Current Password</label>
            <input
              type="password"
              onChange={(e) => setOldPassword(e.target.value)}
              className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400"
              placeholder="Enter current password"
              name="oldPassword"
              value={oldPassword}
            />
          </div>
          <div className="flex flex-col gap-1 mt-2 relative">
            <label className="text-sm font-semibold">New Password</label>
            <input
              type="password"
              onChange={(e) => setNewPassword(e.target.value)}
              className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400"
              placeholder="Enter new password"
              name="newPassword"
              value={newPassword}
            />
          </div>

          <div className="flex flex-col gap-1 mt-4 ">
            <button
              type="submit"
              className="bg-[#27667B] text-white font-bold p-2 rounded-lg"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ChangePassword;
