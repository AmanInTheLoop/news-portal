import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-950 text-white">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}

          <div className="lg:col-span-2">
            <Link to="/" className="inline-flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-600 text-xl font-bold">
                N
              </div>

              <span className="text-2xl font-bold">NewsPortal</span>
            </Link>

            <p className="mt-5 max-w-md leading-7 text-gray-400">
              Your trusted source for the latest news, stories and updates from
              around the world.
            </p>

            <p className="mt-5 text-sm text-gray-500">
              Stay informed. Stay connected.
            </p>
          </div>

          {/* Quick Links */}

          <div>
            <h3 className="text-lg font-semibold">Quick Links</h3>

            <div className="mt-5 flex flex-col gap-3">
              <Link
                to="/"
                className="text-gray-400 transition hover:text-white">
                Home
              </Link>

              <Link
                to="/news"
                className="text-gray-400 transition hover:text-white">
                All News
              </Link>

              <Link
                to="/contact"
                className="text-gray-400 transition hover:text-white">
                Contact Us
              </Link>

              <Link
                to="/register"
                className="text-gray-400 transition hover:text-white">
                Register
              </Link>
            </div>
          </div>

          {/* Categories */}

          <div>
            <h3 className="text-lg font-semibold">Categories</h3>

            <div className="mt-5 flex flex-col gap-3">
              <Link
                to="/news"
                className="text-gray-400 transition hover:text-white">
                Technology
              </Link>

              <Link
                to="/news"
                className="text-gray-400 transition hover:text-white">
                Business
              </Link>

              <Link
                to="/news"
                className="text-gray-400 transition hover:text-white">
                Sports
              </Link>

              <Link
                to="/news"
                className="text-gray-400 transition hover:text-white">
                Entertainment
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom */}

        <div className="mt-10 flex flex-col gap-4 border-t border-gray-800 pt-6 text-sm text-gray-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 NewsPortal. All rights reserved.</p>

          <div className="flex gap-5">
            <span>Privacy Policy</span>

            <span>Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
