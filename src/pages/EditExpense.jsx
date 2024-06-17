import { supabase } from "../supabaseClient";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useExpenseStore from "../zustand/add.expense";

// Componente para agregar gastos
const EditExpense = () => {
  const navigate = useNavigate();

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
    navigate("/view-expenses");
  }

  const date = new Date();
  const hoy = date.toISOString().split("T")[0];

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
    };

    const { error } = await supabase.from("expenses").insert([data]);

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
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:py-32 lg:px-[40rem] ">
      <form
        onSubmit={handleAddExpense}
        className="flex flex-col justify-center items-center w-full border border-gray-300 rounded-md py-8"
      >
        <div className="space-y-12 px-4 lg:px-16">
          <div className="">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Editar gasto
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Formulario para guardar gasto mensual.
            </p>
          </div>

          <div className="pb-8">
            <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="date"
                  className="block text-sm font-medium leading-6 text-gray-900"
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
                    className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${
                      errors.date
                        ? "ring-red-500 border-red-500"
                        : "ring-gray-300"
                    } placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                  />
                  {errors.date && (
                    <p className="mt-2 text-sm text-red-600">{errors.date}</p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="payment"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Metodo de pago
                </label>
                <div className="mt-2">
                  <select
                    id="payment"
                    name="payment"
                    autoComplete="payment-method"
                    className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${
                      errors.paymentMethod
                        ? "ring-red-500 border-red-500"
                        : "ring-gray-300"
                    } placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
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
                  className="block text-sm font-medium leading-6 text-gray-900"
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
                    className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${
                      errors.amount
                        ? "ring-red-500 border-red-500"
                        : "ring-gray-300"
                    } placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                  />
                  {errors.amount && (
                    <p className="mt-2 text-sm text-red-600">{errors.amount}</p>
                  )}
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium leading-6 text-gray-900"
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
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 resize-none"
                    defaultValue={""}
                  />
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-600">
                  Escribe algunas frases para la descripción.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-x-6">
          <button
            type="button"
            className="rounded-md bg-transparent border border-gray-500 text-gray-900 px-3 py-2 text-sm font-semibold hover:text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
            onClick={toHome}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Editar gasto
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditExpense;
