import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import RegistePage from "./pages/RegistePage/RegistePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import HomePage from "./pages/HomePage/HomePage";
import Settings from "./pages/Settings/Settings";
import ProductDetails from "./pages/DetailsPage/ProductDetails";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Listing from "./pages/Listing/Listing";
import MyAds from "./pages/MyAds/MyAds";
import ContactUs from "./pages/ContactUs/ContactUs";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
// import ChatScreen from "./components/ChatScreen/ChatScreen";
import BusinessDashboard from "./components/BusinessDashboard";
import SellingListings from "./components/SellingListings";
import Messages from "./pages/Messages/Messages";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      {/* <ChatScreen /> */}
      <Footer />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/details",
        element: <ProductDetails />,
      },
      {
        path: "/listing",
        element: <Listing />,
      },
      {
        path: "/my-ads",
        element: <MyAds />,
      },
      {
        path: "/contact",
        element: <ContactUs />,
      },
      {
        path: "/settings",
        element: <Settings />,
      },
      {
        path: "/messages",
        element: <Messages />,
      },
      {
        path: "/dashboard",
        element: <BusinessDashboard />,
      },
      {
        path: "/account-sellings",
        element: <SellingListings />,
      },
    ],
  },
  {
    path: "/register",
    element: <RegistePage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
