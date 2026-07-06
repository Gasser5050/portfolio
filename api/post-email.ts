import axios from "axios";
export type Email = { name: string; email: string; message: string };

export async function POST(request: Request) {
  console.log("🟢 Backend triggered! URL is:", request.url);

  try {
    const body: Email = await request.json();

    if (
      !body.name ||
      body.name.trim() === "" ||
      !body.email ||
      body.email.trim() === "" ||
      !body.message ||
      body.message.trim() === ""
    ) {
      return new Response(
        JSON.stringify({ error: "All fields are required." }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
    }

    if (body.name.length < 3) {
      return new Response(
        JSON.stringify({ error: "name must include more than 3 characters." }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
    }

    if (body.email.length < 12) {
      return new Response(
        JSON.stringify({
          error: "email must include more than 12 characters."
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
    }

    if (body.message.length < 20) {
      return new Response(
        JSON.stringify({
          error: "message must include more than 20 characters."
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
    }

    const response = await axios.post(process.env.FORMSPREE_URL || "", body, {
      timeout: 5000,
      headers: {
        Accept: "application/json"
      }
    });

    return new Response(JSON.stringify(response.data), {
      status: 200,
      headers: {
        "Content-type": "application/json"
      }
    });
  } catch (error) {
    let errorStatus = 500;
    let errorMessage = "Internal Server Error";

    if (axios.isAxiosError(error)) {
      errorStatus = error.response?.status || 500;
      errorMessage = error.response?.data?.message || error.message;
      console.error(`❌ Backend Axios Error (${errorStatus}):`, errorMessage);
    } else if (error instanceof Error) {
      console.error(`Secure Server Log: ${error.message}`);
      errorMessage = "Invalid JSON payload sent to server.";
      errorStatus = 400;
    } else {
      console.error("Secure Server Log: An unknown error type was caught.");
    }

    return new Response(JSON.stringify({ error: errorMessage }), {
      status: errorStatus,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
}
