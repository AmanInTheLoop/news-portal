import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { logout } from "../store/slices/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    setIsMenuOpen(false);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const navLinkClass = ({ isActive }) =>
    `transition ${
      isActive
        ? "font-semibold text-blue-600"
        : "text-gray-700 hover:text-blue-600"
    }`;

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}

          <Link to="/" onClick={closeMenu} className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-lg font-bold text-white">
              N
            </div>

            <div>
              <h1 className="text-xl font-bold text-gray-900">NewsPortal</h1>

              <p className="hidden text-[10px] text-gray-500 sm:block">
                Stay informed
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}

          <div className="hidden items-center gap-6 md:flex">
            <NavLink to="/" className={navLinkClass}>
              Home
            </NavLink>

            <NavLink to="/news" className={navLinkClass}>
              All News
            </NavLink>

            <NavLink to="/contact" className={navLinkClass}>
              Contact
            </NavLink>

            {isAuthenticated ? (
              <>
                <NavLink to="/dashboard" className={navLinkClass}>
                  Dashboard
                </NavLink>

                <div className="flex items-center gap-3 border-l border-gray-200 pl-5">
                  {user?.profileImage ? (
                    <img
                      src={user.profileImage}
                      alt={user.name}
                      className="h-9 w-9 rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-600">
                      {user?.name?.charAt(0).toUpperCase() || "U"}
                    </div>
                  )}

                  <span className="max-w-28 truncate font-medium text-gray-700">
                    {user?.name}
                  </span>

                  <button
                    onClick={handleLogout}
                    className="rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-600">
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-3 border-l border-gray-200 pl-5">
                <NavLink to="/login" className={navLinkClass}>
                  Login
                </NavLink>

                <Link
                  to="/register"
                  className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white transition hover:bg-blue-700">
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}

          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="rounded-lg p-2 text-gray-700 hover:bg-gray-100 md:hidden"
            aria-label="Toggle menu">
            {isMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Navigation */}

        {isMenuOpen && (
          <div className="border-t border-gray-100 py-4 md:hidden">
            <div className="flex flex-col gap-2">
              <NavLink
                to="/"
                onClick={closeMenu}
                className={({ isActive }) =>
                  `rounded-lg px-4 py-3 ${
                    isActive
                      ? "bg-blue-50 font-semibold text-blue-600"
                      : "text-gray-700 hover:bg-gray-50"
                  }`
                }>
                Home
              </NavLink>

              <NavLink
                to="/news"
                onClick={closeMenu}
                className={({ isActive }) =>
                  `rounded-lg px-4 py-3 ${
                    isActive
                      ? "bg-blue-50 font-semibold text-blue-600"
                      : "text-gray-700 hover:bg-gray-50"
                  }`
                }>
                All News
              </NavLink>

              <NavLink
                to="/contact"
                onClick={closeMenu}
                className={({ isActive }) =>
                  `rounded-lg px-4 py-3 ${
                    isActive
                      ? "bg-blue-50 font-semibold text-blue-600"
                      : "text-gray-700 hover:bg-gray-50"
                  }`
                }>
                Contact
              </NavLink>

              {isAuthenticated ? (
                <>
                  <NavLink
                    to="/dashboard"
                    onClick={closeMenu}
                    className={({ isActive }) =>
                      `rounded-lg px-4 py-3 ${
                        isActive
                          ? "bg-blue-50 font-semibold text-blue-600"
                          : "text-gray-700 hover:bg-gray-50"
                      }`
                    }>
                    Dashboard
                  </NavLink>

                  <div className="mt-2 flex items-center gap-3 border-t border-gray-100 px-4 pt-4">
                    {user?.profileImage ? (
                      <img
                        src={user.profileImage}
                        alt={user.name}
                        className="h-10 w-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-600">
                        {user?.name?.charAt(0).toUpperCase() || "U"}
                      </div>
                    )}

                    <div className="flex-1">
                      <p className="font-semibold text-gray-800">
                        {user?.name}
                      </p>

                      <p className="truncate text-sm text-gray-500">
                        {user?.email}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={handleLogout}
                    className="mt-2 rounded-lg bg-red-500 px-4 py-3 font-semibold text-white hover:bg-red-600">
                    Logout
                  </button>
                </>
              ) : (
                <div className="mt-2 flex gap-3 border-t border-gray-100 pt-4">
                  <Link
                    to="/login"
                    onClick={closeMenu}
                    className="flex-1 rounded-lg border border-gray-300 px-4 py-3 text-center font-semibold text-gray-700 hover:bg-gray-50">
                    Login
                  </Link>

                  <Link
                    to="/register"
                    onClick={closeMenu}
                    className="flex-1 rounded-lg bg-blue-600 px-4 py-3 text-center font-semibold text-white hover:bg-blue-700">
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
