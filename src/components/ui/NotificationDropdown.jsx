import { Link } from "react-router-dom";
import NotificationIcon from "../../assets/icons/notification.png";
import { IoMdNotificationsOutline } from "react-icons/io";
import ProfileImage from "../../assets/images/profileImage.jpg";

const notifications = [
  {
    id: 1,
    name: "molyrose",
    message: "order was automatically marked as",
    highlight: "complete",
    time: "2d",
    avatar: null,
    unread: true,
  },
  {
    id: 2,
    name: "A client",
    message:
      "has invited you to their brief, so be sure to send them an offer.",
    time: "6d",
    avatar: null,
    unread: false,
  },
  {
    id: 3,
    name: "erianlewis",
    message: "order was automatically marked as",
    highlight: "complete",
    time: "1 week",
    avatar: ProfileImage,
    unread: true,
  },
  {
    id: 4,
    name: "john_doe",
    message: "has sent you a new message.",
    time: "1 hour",
    avatar: null,
    unread: true,
  },
  {
    id: 5,
    name: "jane_smith",
    message: "liked your recent post.",
    time: "3 hours",
    avatar: ProfileImage,
    unread: false,
  },
];

export default function NotificationDropdown() {
  return (
    <div className="relative group py-1">
      <button className="relative text-white text-2xl hover:text-[#FED700] transition">
        <img
          src={NotificationIcon}
          alt="Notification"
          className="w-6 h-6 inline-block align-middle"
        />
        <span className="absolute -top-1 -right-1 bg-red-500 text-xs rounded-full h-4 w-4 flex items-center justify-center">
          3
        </span>
      </button>

      <div className="absolute right-0 top-full w-60 lg:w-80 bg-white shadow-lg pb-2 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 rounded-xl border border-gray-300">
        <div className="px-4 py-2 border-b border-gray-300 flex items-center rounded-t-xl gap-2 sticky top-0 bg-white z-10">
          <IoMdNotificationsOutline className="text-gray-700 text-xl" />
          <span className="text-lg font-medium text-gray-700">
            Notifications
          </span>
        </div>

        <div className="max-h-[320px] overflow-y-auto scrollbar-hide scroll-smooth">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className="flex items-start gap-3 px-3 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-200 transform transition duration-300 ease-in-out opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0"
            >
              {notification.avatar ? (
                <img
                  src={notification.avatar}
                  alt={notification.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 text-base font-semibold uppercase">
                  {notification.name.charAt(0)}
                </div>
              )}

              <div className="flex-1 text-sm text-gray-700">
                <span className="font-semibold text-justify">
                  {notification.name}'s
                </span>{" "}
                {notification.message}{" "}
                {notification.highlight && (
                  <span className="font-semibold text-black">
                    {notification.highlight}
                  </span>
                )}
                <div className="text-xs text-gray-500 mt-2">
                  {notification.time}
                </div>
              </div>

              {notification.unread && (
                <div className="w-2 h-2 bg-gray-400 rounded-full mt-2"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
