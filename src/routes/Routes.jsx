import { createBrowserRouter, Navigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import NotFound from "../pages/NotFound/NotFound";
import Home from "../pages/Home/Home";
import Auth from "../components/Auth/Auth";
import Admin from "../pages/Admin/Admin";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: (
          // is login user
          <Auth>
            <Home />
          </Auth>
        ),
      },
      {
        path: "/admin",
        element: (
          //! is user match his role
          <Auth roles={["admin"]}>
            <Admin />
          </Auth>
        ),
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  {
    path: "*",
    element: <NotFound />,
  },
]);
