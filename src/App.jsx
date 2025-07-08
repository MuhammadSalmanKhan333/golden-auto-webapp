import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { LoadScript } from "@react-google-maps/api";
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
import PostAds from "./pages/PostAds/PostAds";
import FavoritePage from "./components/favorites";
import Orders from "./pages/Orders";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BuyProduct from "./pages/BuyProduct/BuyProduct";
import OrderDetails from "./pages/OrderDetailPage/OrderDetails";
import Billing from "./pages/Billing/Billing";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
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
        path: "/details/:id",
        element: <ProductDetails />,
      },
      {
        path: "/listing",
        element: <Listing />,
      },
      {
        path: "/favorites",
        element: <FavoritePage />,
      },
      {
        path: "/my-ads",
        element: <MyAds />,
      },
      {
        path: "/orders",
        element: <Orders />,
      },
      {
        path: "/orderdetails",
        element: <OrderDetails />,
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
        path: "/my-listings",
        element: <SellingListings />,
      },
      {
        path: "/buy-vehicle/:id",
        element: <BuyProduct />,
      },
      {
        path: "/post-ads",
        element: <PostAds />,
      },
      {
        path: "/edit-ad/:id",
        element: <PostAds editMode={true} />,
      },
      {
        path:"/billing",
        element:<Billing/>
      }
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
  return (
    <LoadScript
      googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
      libraries={["places"]}
    >
      <RouterProvider router={router} />
      <ToastContainer position="top-right" autoClose={3000} />
    </LoadScript>
  );
}

export default App;
