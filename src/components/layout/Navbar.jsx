import { useState, useEffect } from "react";
import logo from "../../assets/images/logo.svg";
import logo1 from "../../assets/images/golden-auto.png";
import { Link, useNavigate } from "react-router-dom";
import MessageIcon from "../../assets/icons/message.png";
import FavouriteIcon from "../../assets/icons/favorite.png";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../features/authSlice";
import NotificationDropdown from "../ui/NotificationDropdown";
import UserDropdown from "../ui/UserDropdown";

const useMediaQuery = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();

    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return isMobile;
};

const Navbar = () => {
  const isMobile = useMediaQuery();
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentMode, setCurrentMode] = useState("buyer"); // default is buyer

  useEffect(() => {
    if (user?.account_type === "business") {
      setCurrentMode("seller");
    } else if (user?.account_type === "private") {
      setCurrentMode("buyer");
    }
  }, [user]);

  console.log("🚀 ~ Navbar ~ user:", user);
  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const handleSwitchMode = () => {
    if (currentMode === "buyer") {
      setCurrentMode("seller");
      navigate("/dashboard");
    } else {
      setCurrentMode("buyer");
      navigate("/");
    }
  };

  return (
    <div className="z-20 md:py-5 bg-gray-700">
      <nav className="header flex flex-col md:flex-row justify-between items-center max-w-[1200px] md:h-[44px] lg:mx-auto sm:pl-4 sm:pr-6 xl:px-0">
        <Link to="/">
          <img
            className={`${
              isMobile ? "w-24 my-3" : "size-28"
            } text-white hover:cursor-pointer`}
            src={isMobile ? logo1 : logo}
            alt="Image not loaded"
          />
        </Link>

        {/* Desktop Menu */}
        <ul className="flex gap-8 lg:gap-16 list-none font-normal text-base text-white hover:cursor-pointer items-center m-0 p-0">
          <li className="hover:text-[#FED700]">
            {currentMode === "buyer" ? (
              <Link to="/">Home</Link>
            ) : (
              <Link to="/dashboard">Dashboard</Link>
            )}
          </li>

          {currentMode === "seller" ? (
            <li className="relative group">
              <span className="hover:text-[#FED700]">My Business</span>
              <ul className="absolute top-full left-0 mt-2 w-48 bg-white text-sm font-medium text-gray-700 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <li className="border-b border-gray-100">
                  <Link
                    to="/orders"
                    className="block px-4 py-2 hover:bg-gray-100 rounded-t-xl"
                  >
                    Orders
                  </Link>
                </li>
                <li className="border-b border-gray-100">
                  <Link
                    to="/my-ads"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Ads
                  </Link>
                </li>
                <li>
                  <Link
                    to="/earnings"
                    className="block px-4 py-2 hover:bg-gray-100 rounded-b-xl"
                  >
                    Earnings
                  </Link>
                </li>
              </ul>
            </li>
          ) : (
            <li className="hover:text-[#FED700]">
              <Link to="/listing">Listing</Link>
            </li>
          )}

          <li className="hover:text-[#FED700]">
            <Link to="/contact">{isMobile ? "Contact" : "Contact Us"}</Link>
          </li>

          <li>
            <div className="md:hidden flex gap-3 md:gap-4 items-center">
              {user && <NotificationDropdown />}
              <UserDropdown user={user} handleLogout={handleLogout} />
            </div>
          </li>
        </ul>

        {/* Desktop Icons */}
        <div className="hidden md:flex gap-3 md:gap-4 items-center">
          {/* Desktop Notification Dropdown - Only show when logged in */}
          {user && (
            <>
              <NotificationDropdown />
              <div className="relative">
                <Link
                  className="text-white hover:text-[#FED700] transition"
                  to="/messages"
                >
                  <img
                    src={MessageIcon}
                    alt="Message"
                    className="w-6 h-6 inline-block align-middle"
                  />
                </Link>
              </div>
            </>
          )}
          {user && currentMode === "buyer" && (
            <div className="relative">
              <Link
                className="text-white hover:text-[#FED700] transition"
                to="/favorites"
              >
                <img
                  src={FavouriteIcon}
                  alt="Favourite"
                  className="w-6 h-6 inline-block align-middle"
                />
              </Link>
            </div>
          )}

          {user?.account_type === "private" && currentMode === "buyer" && (
            <>
              <Link
                to="/orders"
                className="text-white hover:text-[#FED700] transition font-medium"
              >
                Orders
              </Link>
              <button
                onClick={handleSwitchMode}
                className="text-white hover:text-[#FED700] transition font-medium cursor-pointer"
              >
                Switch to Selling
              </button>
            </>
          )}

          {user?.account_type === "private" && currentMode === "seller" && (
            <button
              onClick={handleSwitchMode}
              className="text-white hover:text-[#FED700] transition font-medium cursor-pointer"
            >
              Switch to Buying
            </button>
          )}

          {/* Desktop Account Dropdown */}
          <UserDropdown user={user} handleLogout={handleLogout} />
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
