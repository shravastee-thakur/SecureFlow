

const ResetPassword = () => {
  return (
    <div className="flex items-center justify-center mt-40">
      <form className="bg-white p-6 rounded-xl shadow-md w-80">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Password Reset
        </h2>
        <input
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
