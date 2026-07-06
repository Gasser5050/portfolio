import axios from "axios";
import type { ActionFunctionArgs } from "react-router-dom";
export type Email = { name: string; email: string; message: string };

export async function contactFormAction({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  const name = formData.get("name");
  if (!name || name === "" || typeof name !== "string") {
    return "A Name is required";
  }

  const email = formData.get("email");
  if (!email || email === "" || typeof email !== "string") {
    return "An Email is required";
  }

  const message = formData.get("message");
  if (!message || message === "" || typeof message !== "string") {
    return "A Message is required";
  }

  const body: Email = {
    name,
    email,
    message
  };

  try {
    const response = await axios.post("/api/post-email", body, {
      signal: request.signal
    });

    return { success: true, data: response.data };
  } catch (error) {
    if (axios.isCancel(error)) {
      console.log("Submission safely canceled mid-flight.");
      return;
    }
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.error || "Could not connect to server.";
      const errorStatus = error.response?.status || 500;
      console.error(errorMessage);

      return { error: errorMessage, status: errorStatus };
    }
    console.error("An unexpected application error occurred.");
    return { error: "An unexpected application error occurred.", status: 500 };
  }
}

// useActionData will return one of three things:
// 1 - Frontend Validation Error: A raw string.
// 2 - Axios/Server Error: { error: "", status: 400 }).
// 3 - Success: { success: true, data: ... }).
