import { NavLink } from "react-router-dom";

function Error() {
  return (
    <>
      <p className="font-bold text-3xl lg:text-5xl mt-12 lg:mt-16 mb-6 lg:mb-10">
        404 - Page Not Found.
      </p>
      <NavLink
        className={
          "text-black text-xl lg:text-2xl border px-2 py-1 bg-white hover:bg-gray-200 rounded-lg hover:scale-105"
        }
        to={"/"}
      >
        Back to home
      </NavLink>
    </>
  );
}

export default Error;
