import { createBrowserRouter } from "react-router-dom";
import { contactFormAction } from "./actions/contactFormAction";
import AppLayout from "./layouts/AppLayout";
import Home from "./pages/Home";
import Error from "./pages/Error";
import ErrorPage from "./pages/ErrorPage";
import Minesweeper from "./components/minesweeper/Minesweeper";
import Projects from "./pages/Projects";
import Certificates from "./pages/Certificates";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <Home /> , action: contactFormAction},
          { path: "minesweeper", element: <Minesweeper /> },
          { path: "projects", element: <Projects /> },
          { path: "certificates", element: <Certificates /> },

          { path: "*", element: <Error /> }
        ]
      }
    ],
    HydrateFallback: () => {}
  }
]);
