import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./ErrorPage.jsx";
import MainP from "./Routes/MainP.jsx"
import Map from "./Routes/Map.jsx";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainP />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/Map",
    element: <Map />,
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
