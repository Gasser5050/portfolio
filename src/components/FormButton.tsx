import { useEffect, useState } from "react";

function FormButton({
  state,
  isSuccess
}: {
  state: string;
  isSuccess: boolean;
}) {
  const [emailSent, setEmailSent] = useState(false);

  useEffect(() => {
    let resetTimer: number;

    const startTimer = setTimeout(() => {
      setEmailSent(isSuccess);

      if (isSuccess && state === "idle") {
        resetTimer = setTimeout(() => {
          setEmailSent(false);
        }, 2500);
      }
    }, 0);

    return () => {
      clearTimeout(startTimer);
      clearTimeout(resetTimer);
    };
  }, [state, isSuccess]);

  return (
    <button
      type="submit"
      disabled={state === "submitting"}
      className="font-medium min-w-30 px-4 py-2 text-white bg-[#00aee1fd] hover:ring-2 hover:ring-white dark:hover:ring-black focus:ring-2 focus:ring-white dark:focus:ring-black outline-0 transition duration-200 rounded-full cursor-pointer"
    >
      {state === "submitting" && (
        <div className="flex items-center justify-center gap-2">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>{" "}
          loading...
        </div>
      )}
      {emailSent && state === "idle" && (
        <div className="flex items-center justify-center gap-2">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2.5"
              stroke="currentColor"
              className="h-4 w-4 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
          </div>
          Email Sent
        </div>
      )}
      {!emailSent && state === "idle" && "Send Email"}
    </button>
  );
}

export default FormButton;
