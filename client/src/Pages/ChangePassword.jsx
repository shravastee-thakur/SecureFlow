import React from "react";

const ChangePassword = () => {
  return (
    <section className="mt-8 lg:mt-20 flex justify-center items-center">
      <div className="relative w-10/12 sm:w-3/4 md:w-2/5 lg:w-1/4 border-2 rounded-xl p-4 md:p-6 bg-white bg-opacity-60">
        <h1 className="text-center mt-3 text-2xl font-bold">Change Password</h1>

        <form className="p-4">
          <div className="flex flex-col gap-1 mt-2 relative">
            <label className="text-sm font-semibold">Password</label>
            <input
              //   onChange={handleChange}
              className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400"
              //   type={showPassword ? "text" : "password"}
              placeholder="Enter current password"
              name="password"
              //   value={user.password}
            />
            {/* <div className="absolute top-9 right-3">
              {!showPassword ? (
                <VisibilityOffIcon
                  
                  fontSize="small"
                />
              ) : (
                <VisibilityIcon
                 
                  fontSize="small"
                />
              )}
            </div> */}
          </div>
          <div className="flex flex-col gap-1 mt-2 relative">
            <label className="text-sm font-semibold">Password</label>
            <input
              //   onChange={handleChange}
              className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400"
              //   type={showPassword ? "text" : "password"}
              placeholder="Enter new password"
              name="password"
              //   value={user.password}
            />
            {/* <div className="absolute top-9 right-3">
              {!showPassword ? (
                <VisibilityOffIcon
                  
                  fontSize="small"
                />
              ) : (
                <VisibilityIcon
                 
                  fontSize="small"
                />
              )}
            </div> */}
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
