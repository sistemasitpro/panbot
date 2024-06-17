import useLoginStore from "../zustand/login";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../supabase/auth";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { supabase } from "../supabaseClient";

const Login = () => {
  const navigate = useNavigate();

  /* useEffect(() => {
    if (supabase.auth.getUser()) {
      navigate("/view-expenses");
    }
  }, [navigate]); */

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
      resetInputs();
      toast.success("Has iniciado sesión correctamente!");
      toHome();
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center  px-6 py-12 lg:py-32 lg:px-[40rem] mx-auto">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-gray-300">
          Control de Gastos MD
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleLogin} noValidate>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-300"
            >
              Correo electrónico
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email-new"
                placeholder="Ingresar el correo electrónico"
                onChange={handleEmail}
                className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                  errors.email
                    ? "ring-red-500 border-red-500 dark:border-red-500 dark:focus:border-red-500 dark:ring-red-500"
                    : "ring-gray-300"
                } `}
              />
              {errors.email && (
                <p className="mt-2 text-sm text-red-600">{errors.email}</p>
              )}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-300"
              >
                Contraseña
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                placeholder="Ingresar la contraseña"
                type="password"
                autoComplete="current-password"
                onChange={handlePassword}
                className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                  errors.password
                    ? "ring-red-500 border-red-500 dark:border-red-500 dark:focus:border-red-500 dark:ring-red-500"
                    : "ring-gray-300"
                }`}
              />
              {errors.password && (
                <p className="mt-2 text-sm text-red-600">{errors.password}</p>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Iniciar Sesión
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500 dark:text-gray-400">
          Acceso solo a personas autorizadas
        </p>
      </div>
    </div>
  );
};

export default Login;
