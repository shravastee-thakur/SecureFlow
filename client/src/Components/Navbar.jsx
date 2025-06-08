const Navbar = () => {
  return (
    <div className="bg-[#27667B] text-white p-4 lg:p-6 flex justify-between items-center">
      <h1 className="text-2xl lg:text-4xl font-semibold md:px-10">
        SecureFlow
      </h1>
      <div className="md:px-10">
        <button
          //   onClick={handleLogin}
          className="bg-[#45b8df] text-white md:font-bold font-semibold px-2 md:py-1 rounded-lg"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Navbar;
