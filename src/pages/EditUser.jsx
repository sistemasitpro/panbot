import { useNavigate } from "react-router-dom";
import useUpdateUserStore from "../zustand/edit.user";
import { useCallback, useEffect } from "react";
import { getCurrentUser, updateUser } from "../supabase/auth";
import { supabase } from "../supabaseClient";
import toast from "react-hot-toast";

const EditUser = () => {
  const navigate = useNavigate();

  const {
    selectedNombre,
    selectedApellido,
    selectedEmail,
    errors,
    setSelectedNombre,
    setSelectedApellido,
    setSelectedEmail,
    resetInputs,
    validateInputs,
  } = useUpdateUserStore();

  const toHome = useCallback(() => {
    resetInputs();
    navigate("/view-expenses");
  }, [navigate, resetInputs]);

  useEffect(() => {
    if (!supabase.auth.getUser()) {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    const getUser = async () => {
      const user = await getCurrentUser();
      setSelectedNombre(user?.user_metadata?.nombre);
      setSelectedApellido(user?.user_metadata?.apellido);
      setSelectedEmail(user?.email);
    };

    getUser();
  }, [setSelectedNombre, setSelectedApellido, setSelectedEmail]);

  const handleNombreChange = ({ target }) => {
    setSelectedNombre(target.value);
  };

  const handleApellidoChange = ({ target }) => {
    setSelectedApellido(target.value);
  };

  const handleEmailChange = ({ target }) => {
    setSelectedEmail(target.value);
  };

  const handleEditUser = async (e) => {
    e.preventDefault();

    if (!validateInputs()) {
      return;
    }

    const data = {
      nombre: selectedNombre,
      apellido: selectedApellido,
    };

    const { error } = await updateUser(selectedEmail, data);

    if (error) {
      toast.error("Upps... hubo un error, intente dentro un rato.");
      console.error("Error adding expense:", error);
    } else {
      resetInputs();
      toast.success("Se ha editado correctamente el gasto!");
      toHome();
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:py-32 lg:px-[40rem] ">
      <form
        onSubmit={handleEditUser}
        className="flex flex-col justify-center items-center w-full border border-gray-300 dark:border-gray-700 rounded-md py-8"
      >
        <div className="space-y-12 px-4 lg:px-16">
          <div className="">
            <h2 className="text-base font-semibold leading-7 text-gray-900  dark:text-gray-200">
              Editar Usuario
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-400">
              Formulario para editar perfil de usuario.
            </p>
          </div>

          <div className="pb-8">
            <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="nombre"
                  className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200"
                >
                  Nombre
                </label>
                <div className="mt-2 w-full">
                  <input
                    placeholder="Ingrese el nombre del usuario"
                    type="text"
                    value={selectedNombre}
                    onChange={handleNombreChange}
                    name="nombre"
                    id="nombre"
                    autoComplete="nombre-price"
                    className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500  ${
                      errors.nombre
                        ? "ring-red-500 border-red-500 dark:border-red-500 dark:focus:border-red-500 dark:ring-red-500"
                        : "ring-gray-300"
                    }`}
                  />
                  {errors.nombre && (
                    <p className="mt-2 text-sm text-red-600">{errors.nombre}</p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="apellido"
                  className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200"
                >
                  Apellido
                </label>
                <div className="mt-2">
                  <input
                    placeholder="Ingrese el apellido del usuario"
                    type="text"
                    value={selectedApellido}
                    onChange={handleApellidoChange}
                    name="apellido"
                    id="apellido"
                    autoComplete="apellido-price"
                    className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500  ${
                      errors.apellido
                        ? "ring-red-500 border-red-500 dark:border-red-500 dark:focus:border-red-500 dark:ring-red-500"
                        : "ring-gray-300"
                    }`}
                  />
                  {errors.apellido && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.apellido}
                    </p>
                  )}
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200"
                >
                  Correo Electrónico
                </label>
                <div className="mt-2">
                  <input
                    type="email"
                    placeholder="Ingrese el correo electrónico"
                    onChange={handleEmailChange}
                    value={selectedEmail}
                    name="email"
                    id="email"
                    autoComplete="email-price"
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
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-x-6">
          <button
            type="button"
            className="rounded-md bg-transparent border border-gray-500 text-gray-900 dark:text-gray-300 px-3 py-2 text-sm font-semibold hover:text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
            onClick={toHome}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Editar usuario
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditUser;
