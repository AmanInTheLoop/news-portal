import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const DashboardLayout = ({ children }) => {
  const { user } = useSelector((state) => state.auth);

  const navLinkClass = ({ isActive }) =>
    `block rounded-lg px-4 py-3 text-sm font-medium transition ${
      isActive
        ? "bg-blue-600 text-white"
        : "text-gray-700 hover:bg-blue-50 hover:text-blue-700"
    }`;

  return (
    <section className="bg-gray-50">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:flex-row lg:px-8">
        <aside className="w-full shrink-0 rounded-xl bg-white p-4 shadow-sm lg:w-64">
          <div className="mb-5 border-b border-gray-100 px-4 pb-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
              Dashboard
            </p>
            <p className="mt-1 truncate font-semibold text-gray-800">
              {user?.name || "Your account"}
            </p>
          </div>

          <nav className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
            <NavLink to="/dashboard" end className={navLinkClass}>
              Overview
            </NavLink>
            <NavLink to="/dashboard/my-news" className={navLinkClass}>
              My News
            </NavLink>
            <NavLink to="/dashboard/create-news" className={navLinkClass}>
              Create News
            </NavLink>
            <NavLink to="/dashboard/profile" className={navLinkClass}>
              Profile
            </NavLink>
          </nav>

          <Link
            to="/"
            className="mt-5 block border-t border-gray-100 px-4 pt-5 text-sm font-medium text-gray-500 hover:text-blue-600">
            Back to website
          </Link>
        </aside>

        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </section>
  );
};

export default DashboardLayout;
