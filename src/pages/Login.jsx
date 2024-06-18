import useLoginStore from "../zustand/login";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../supabase/auth";
import toast from "react-hot-toast";
import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid";
import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  tippy("#btn_showpassword", {
    content: `${showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}`,
    placement: "top-end",
    arrows: true,
    theme: "translucent",
  });

  const {
    selectedEmail,
    selectedPassword,
    errors,
    setSelectedEmail,
    setSelectedPassword,
    resetInputs,
    validateInputs,
  } = useLoginStore();

  function toHome() {
    resetInputs();
    navigate("/view-expenses", { replace: true });
  }

  // Función para manejar el cambio de fecha
  const handleEmail = ({ target }) => {
    setSelectedEmail(target.value);
  };

  // Función para manejar el cambio de método de pago
  const handlePassword = ({ target }) => {
    setSelectedPassword(target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleRememberMe = () => {
    setRememberMe(!rememberMe);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateInputs()) {
      return;
    }

    const data = {
      email: selectedEmail,
      password: selectedPassword,
    };

    const { error } = await loginUser(data);

    if (error) {
      toast.error("Los datos ingresados son incorrectos, intente con otros.");
      console.error("Error adding expense:", error);
    } else {
      if (rememberMe) {
        sessionStorage.setItem("rememberMe", "true");
      }
      resetInputs();
      toast.success("Has iniciado sesión correctamente!");
      toHome();
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 max-w-sm w-full">
        <div className="flex flex-col items-center">
          <img src="/logo.png" alt="Logo" className="w-20 h-20 logo-bounce" />
          <h2 className="mt-6 text-center text-2xl font-bold text-gray-900 dark:text-gray-100">
            Control de Gastos MD
          </h2>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleLogin} noValidate>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Correo electrónico
            </label>
            <div className="mt-1">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Ingresar el correo electrónico"
                onChange={handleEmail}
                className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500  ${
                  errors.email
                    ? "ring-red-500 border-red-500 dark:border-red-500 dark:focus:border-red-500 dark:ring-red-500"
                    : "ring-gray-300"
                }`}
              />
              {errors.email && (
                <p className="mt-2 text-sm text-red-600">{errors.email}</p>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Contraseña
            </label>
            <div className="mt-1 relative  flex items-center flex-col justify-center aling-center">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="Ingresar la contraseña"
                onChange={handlePassword}
                className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500  ${
                  errors.password
                    ? "ring-red-500 border-red-500 dark:border-red-500 dark:focus:border-red-500 dark:ring-red-500"
                    : "ring-gray-300"
                }`}
              />
              <button
                type="button"
                id="btn_showpassword"
                onClick={togglePasswordVisibility}
                className="absolute right-3 flex items-center text-sm leading-5"
              >
                {showPassword ? (
                  <EyeSlashIcon className="h-5 w-5 text-gray-500 dark:text-gray-300" />
                ) : (
                  <EyeIcon className="h-5 w-5 text-gray-500 dark:text-gray-300" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="mt-2 text-sm text-red-600">{errors.password}</p>
            )}
          </div>

          <div className="flex items-center">
            <input
              id="rememberMe"
              name="rememberMe"
              type="checkbox"
              checked={rememberMe}
              onChange={toggleRememberMe}
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 cursor-pointer"
            />
            <label
              htmlFor="rememberMe"
              className="ml-2 block text-sm text-gray-900 dark:text-gray-100 cursor-pointer"
            >
              Recordarme
            </label>
          </div>

          <div>
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 w-full"
            >
              Iniciar Sesión
            </button>
          </div>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
          Acceso solo a personas autorizadas
        </p>
      </div>
    </div>
  );
};

export default Login;
