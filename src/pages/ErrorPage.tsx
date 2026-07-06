import { isRouteErrorResponse, NavLink, useRouteError } from "react-router-dom";

function ErrorPage() {
  const error = useRouteError();
  let errorMessage = "";

  if (isRouteErrorResponse(error)) {
    errorMessage = `${error.status} ${error.statusText}: ${error.data || "Network Response Error"}`;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === "string") {
    errorMessage = error;
  }

  return (
    <>
      <h1 className="font-bold text-2xl text-center mb-4 md:mb-6 lg:mb-8">
        Something went wrong
      </h1>
      <p className="my-5">{errorMessage}</p>

      <NavLink
        className={
          "text-xl lg:text-2xl border px-2 py-1 bg-white hover:bg-gray-200 rounded-lg"
        }
        to={"/"}
      >
        Back to home
      </NavLink>
    </>
  );
}

export default ErrorPage;
