import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import RegistePage from "./pages/RegistePage/RegistePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import HomePage from "./pages/HomePage/HomePage";
import Settings from "./pages/Settings/Settings";
import ProductDetails from "./pages/DetailsPage/ProductDetails";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Define your routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/details",
    element: <ProductDetails />,
  },
  {
    path: "/register",
    element: <RegistePage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/settings",
    element: <Settings />,
  },
]);

function App() {
  return (
    <RouterProvider router={router}>
      <Outlet />
    </RouterProvider>
  );
}

export default App;
