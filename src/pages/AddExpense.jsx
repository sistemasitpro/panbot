import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useExpenseStore from "../zustand/add.expense";
import { createNewExpense } from "../supabase/expenses";
import { supabase } from "../supabaseClient";
import { useEffect, useState } from "react";
import { getCurrentUser } from "../supabase/auth";

// Componente para agregar gastos
const AddExpense = () => {
  const navigate = useNavigate();

  const [userId, setUserId] = useState("");

  const {
    selectedDate,
    selectedPaymentMethod,
    selectedAmount,
    selectedDescription,
    errors,
    setSelectedDate,
    setSelectedPaymentMethod,
    setSelectedAmount,
    setSelectedDescription,
    resetInputs,
    validateInputs,
  } = useExpenseStore();

  function toHome() {
    resetInputs();
    navigate("/view-expenses", { replace: true });
  }

  useEffect(() => {
    if (!supabase.auth.getUser()) {
      navigate("/");
    }
  }, [navigate]);

  const date = new Date();
  const hoy = date.toISOString().split("T")[0];

  useEffect(() => {
    const getUser = async () => {
      const user = await getCurrentUser();
      setUserId(user.id);
    };

    getUser();
  }, []);

  // Función para manejar el cambio de fecha
  const handleDateChange = ({ target }) => {
    setSelectedDate(target.value);
  };

  // Función para manejar el cambio de método de pago
  const handlePaymentMethodChange = ({ target }) => {
    setSelectedPaymentMethod(target.value);
  };

  // Función para manejar el cambio del total
  const handleAmountChange = ({ target }) => {
    setSelectedAmount(target.value);
  };

  // Función para manejar la descripción
  const handleDescriptionChange = ({ target }) => {
    setSelectedDescription(target.value);
  };

  // Función para agregar el gasto al servidor
  const handleAddExpense = async (e) => {
    e.preventDefault();

    if (!validateInputs()) {
      return;
    }

    const data = {
      date: selectedDate,
      payment_method: selectedPaymentMethod,
      amount: selectedAmount,
      description: selectedDescription,
      usuario_id: userId,
    };

    const { error } = await createNewExpense(data);

    if (error) {
      toast.error("Upps... hubo un error, intente dentro un rato.");
      console.error("Error adding expense:", error);
    } else {
      resetInputs();
      toast.success("Gasto añadido correctamente!");
      toHome();
    }
  };

  // Renderizado del formulario para agregar gastos
  //flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:py-32 lg:px-[40rem]
  {
    /* flex flex-col justify-center items-center w-full border border-gray-300 dark:border-gray-700 rounded-md py-8 form */
  }
  return (
    <div className="flex-grow flex justify-center items-center  ">
      <form
        onSubmit={handleAddExpense}
        className="flex flex-col justify-center items-center "
      >
        <div className="border border-gray-50 dark:border-gray-800 rounded-md py-8 px-4 bg-gray-50 dark:bg-gray-800 shadow-lg">
          <div className="px-4">
            <div className="mb-8">
              <h2 className="text-base font-semibold leading-7 text-gray-900 dark:text-gray-200">
                Agregar gastos
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-400">
                Formulario para guardar gasto mensual.
              </p>
            </div>

            <div className="pb-8">
              <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="date"
                    className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200"
                  >
                    Fecha
                  </label>
                  <div className="mt-2 w-full">
                    <input
                      placeholder="dd/mm/yyyy"
                      type="date"
                      min={hoy}
                      onChange={handleDateChange}
                      name="date"
                      id="date"
                      autoComplete="date-price"
                      className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500  ${
                        errors.date
                          ? "ring-red-500 border-red-500 dark:border-red-500 dark:focus:border-red-500 dark:ring-red-500"
                          : "ring-gray-300"
                      }`}
                    />
                    {errors.date && (
                      <p className="mt-2 text-sm text-red-600">{errors.date}</p>
                    )}
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="payment"
                    className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200"
                  >
                    Metodo de pago
                  </label>
                  <div className="mt-2">
                    <select
                      id="payment"
                      name="payment"
                      autoComplete="payment-method"
                      className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500  ${
                        errors.paymentMethod
                          ? "ring-red-500 border-red-500 dark:border-red-500 dark:focus:border-red-500 dark:ring-red-500"
                          : "ring-gray-300"
                      }`}
                      value={selectedPaymentMethod}
                      onChange={handlePaymentMethodChange}
                    >
                      <option value="">Selecciona un método de pago</option>
                      <option value="Efectivo">Efectivo</option>
                      <option value="Bizum">Bizum</option>
                    </select>
                    {errors.paymentMethod && (
                      <p className="mt-2 text-sm text-red-600">
                        {errors.paymentMethod}
                      </p>
                    )}
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="amount"
                    className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200"
                  >
                    Total
                  </label>
                  <div className="mt-2">
                    <input
                      type="number"
                      placeholder="0"
                      min={0}
                      step={1}
                      onChange={handleAmountChange}
                      name="amount"
                      id="amount"
                      autoComplete="amount-price"
                      className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500  ${
                        errors.amount
                          ? "ring-red-500 border-red-500 dark:border-red-500 dark:focus:border-red-500 dark:ring-red-500"
                          : "ring-gray-300"
                      }`}
                    />

                    {errors.amount && (
                      <p className="mt-2 text-sm text-red-600">
                        {errors.amount}
                      </p>
                    )}
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200"
                  >
                    Descripción
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="description"
                      name="description"
                      rows={3}
                      onChange={handleDescriptionChange}
                      placeholder="Ingrese una descripción"
                      className={`bg-gray-50 border resize-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500  `}
                      defaultValue={""}
                    />
                  </div>
                  <p className="mt-3 text-sm leading-6 text-gray-600 dark:text-gray-400">
                    Escribe algunas frases para la descripción.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between px-4">
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
              Agregar gasto
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddExpense;
