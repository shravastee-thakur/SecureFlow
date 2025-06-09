import React from "react";

const Unauthorised = () => {
  return (
    <div className="flex flex-col items-center justify-center overflow-hidden">
      <main className="grid place-items-center w-full h-full px-6 py-12 sm:py-20 lg:px-8">
        <div className="text-center">
          <p className="text-6xl font-semibold text-indigo-600">404</p>
          <h1 className="mt-4 text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">
            Page not found
          </h1>
          <p className="mt-6 text-lg font-medium text-white sm:text-xl">
            Sorry, we couldn’t find the page you’re looking for.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="/"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-indigo-600"
            >
              Go back home
            </a>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Unauthorised;
