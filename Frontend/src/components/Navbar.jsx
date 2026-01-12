import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logoutUser } from "../api/user.api";
import { Link } from "@tanstack/react-router";
import { logout } from "../store/slice/authSlice";
import { useNavigate } from "@tanstack/react-router";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);

  const onLogout = () => {
    logoutUser();
    dispatch(logout());
    navigate({ to: "/auth" });
  };

  return (
    <nav className="bg-white border border-b-black fixed top-0 left-0 right-0 z-50">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Left side - App Name */}
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-gray-800">
              URL Shortener
            </Link>
          </div>

          {/* Right side - Auth buttons */}
          <div className="flex items-center">
            {isLoggedIn ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-700">
                  Welcome, {user?.name || "User"}
                </span>
                {user?.avatar && (
                  <img className="w-10 h-10 rounded-full" src={user?.avatar} alt="" />
                )}
                <button
                  onClick={onLogout}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/auth"
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Get Started
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
