import React from "react";

const ForgetPassword = () => {
  return (
    <section className="mt-8 lg:mt-20 flex justify-center items-center">
      <div className="relative w-10/12 sm:w-3/4 md:w-2/5 lg:w-1/4 border-2 rounded-xl p-4 md:p-6 bg-white bg-opacity-60">
        <h1 className="text-center mt-3 text-2xl font-bold">
          Account Recovery
        </h1>

        <p className="mt-3 text-center text-sm font-semibold text-gray-500">
          A recovery link will be sent to your email
        </p>

        <form className="p-4">
          <div className="flex flex-col gap-1 mt-2">
            <input
              //   onChange={handleChange}
              className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400"
              type="email"
              placeholder="Enter your email"
              name="email"
              //   value={user.email}
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

export default ForgetPassword;
