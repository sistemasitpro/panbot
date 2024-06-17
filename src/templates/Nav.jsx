import { useEffect, useState } from "react";
import {
  SunIcon,
  MoonIcon,
  UserCircleIcon,
  ArrowLeftStartOnRectangleIcon,
} from "@heroicons/react/20/solid";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { getCurrentUser, signOutUser } from "../supabase/auth";
import toast from "react-hot-toast";

export default function Nav() {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(
    () =>
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
  );
  const location = useLocation();
  const [activePath, setActivePath] = useState(location.pathname);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
    }
  }, [darkMode]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  useEffect(() => {
    setActivePath(location.pathname);
  }, [location]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const singOut = async () => {
    const { error } = await signOutUser();

    if (error) {
      toast.error("Upps... hubo un error, intente dentro un rato.");
      console.error("Error adding expense:", error);
    } else {
      toast.success("Has cerrado sesión correctamente!");
      navigate("/", { replace: true });
    }
  };

  const [isUserMenuOpen, setUserMenuOpen] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleUserMenu = () => {
    setUserMenuOpen(!isUserMenuOpen);
  };

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const closeMenuUser = () => {
    setUserMenuOpen(false);
  };

  useEffect(() => {
    const getUser = async () => {
      const user = await getCurrentUser();
      setUser(user);
    };

    getUser();
  }, []);

  return (
    <>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link
            to="/view-expenses"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img src="/logo.png" className="h-8" alt="PanBot Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Pan Bot
            </span>
          </Link>
          <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <Link
              to={"/edit-user"}
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            >
              <UserCircleIcon className="w-5 h-5" />
            </Link>

            <button
              onClick={toggleDarkMode}
              className="inline-flex items-center p-2 w-10 h-10 md:ml-4 justify-center text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            >
              <span className="sr-only">Toggle theme</span>
              {darkMode ? (
                <SunIcon className="w-5 h-5" />
              ) : (
                <MoonIcon className="w-5 h-5" />
              )}
            </button>

            <button
              onClick={singOut}
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            >
              <ArrowLeftStartOnRectangleIcon className="w-5 h-5" />
            </button>
            <button
              data-collapse-toggle="navbar-user"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-user"
              aria-expanded="false"
              onClick={toggleMenu}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path stroke="currentColor" d="M1 1h15M1 7h15M1 13h15" />
              </svg>
            </button>
          </div>
          <div
            className={`items-center justify-between ${
              isMenuOpen ? "block md:inline-block" : "hidden"
            } w-full md:flex md:w-auto md:order-1`}
            id="navbar-user"
          >
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <Link
                  to="/add-expense"
                  onClick={closeMenu}
                  className={`block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-gray-300 md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent ${
                    activePath === "/add-expense"
                      ? "bg-blue-700 text-white md:bg-transparent md:text-blue-700 md:dark:text-blue-500"
                      : "text-gray-900"
                  }`}
                >
                  Agregar gasto
                </Link>
              </li>
              <li>
                <Link
                  to="/view-expenses"
                  onClick={closeMenu}
                  className={`block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-gray-300 md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent ${
                    activePath === "/view-expenses"
                      ? "bg-blue-700 text-white md:bg-transparent md:text-blue-700 md:dark:text-blue-500"
                      : "text-gray-900"
                  }`}
                >
                  Ver gastos
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
}
