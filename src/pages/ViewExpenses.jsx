import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import { PencilIcon, TrashIcon } from "@heroicons/react/20/solid";
import Modal from "./Modal";
import toast from "react-hot-toast";
import { deleteExpense, getAllExpenses } from "../supabase/expenses";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

const ViewExpenses = () => {
  const navigate = useNavigate();

  const [expenses, setExpenses] = useState([]);
  const [modalExpenseId, setModalExpenseId] = useState(null);

  const handleOpenModal = (expenseId) => {
    setModalExpenseId(expenseId);
  };

  const handleCloseModal = () => {
    setModalExpenseId(null);
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  useEffect(() => {
    if (!supabase.auth.getUser()) {
      navigate("/");
    }
  }, [navigate]);

  const fetchExpenses = async () => {
    const { data, error } = await getAllExpenses();
    if (error) {
      console.error("Error fetching expenses:", error);
    } else {
      setExpenses(data);
    }
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    expenses.forEach((expense, index) => {
      doc.text(
        `Gasto: ${expense.amount} - Nota: ${expense.description}`,
        10,
        10 + index * 10
      );
    });
    doc.save("gastos.pdf");
  };

  function convertirFecha(fechaString) {
    const partesFecha = fechaString.split("-");
    return `${partesFecha[2]}/${partesFecha[1]}/${partesFecha[0]}`;
  }

  function formatearPrecio(precio) {
    return precio.toLocaleString("es-ES", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  const handleDeleteExpense = async (id) => {
    const { error } = await deleteExpense(id);

    if (error) {
      toast.error("Upps... hubo un error, intente dentro un rato.");
      console.error("Error adding expense:", error);
    } else {
      toast.success("Gasto eliminado correctamente!");
      handleCloseModal();
      fetchExpenses();
    }
  };

  return (
    <section className="flex flex-col gap-3 px-6 py-12">
      <div className="max-w-xl mx-auto text-center xl:max-w-2xl">
        <h2 className="text-3xl font-bold leading-tight text-gray-800 dark:text-gray-200 sm:text-4xl xl:text-5xl mb-6">
          Consultar gastos
        </h2>
        <p className="mb-4 text-gray-600 dark:text-gray-400">
          Aplicacion de gestión de gastos, creado por Fabri Ferroni
        </p>
      </div>
      <ul
        role="list"
        className="grid grid-cols-1  gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {expenses.map((expense) => (
          <li
            key={expense.id}
            className="col-span-1 divide-y border border-gray-300 divide-gray-300 dark:border-gray-800 dark:divide-gray-800 rounded-lg bg-white dark:bg-gray-900 shadow"
          >
            <div className="flex w-full items-center justify-between space-x-6 p-6">
              <div className="flex-1 truncate">
                <div className="flex items-center space-x-3">
                  <h3 className="truncate text-sm font-medium text-gray-900 dark:text-gray-200">
                    ${formatearPrecio(expense.amount)} -{" "}
                    {convertirFecha(expense.date)}
                  </h3>
                  <span
                    className={`inline-flex flex-shrink-0 items-center rounded-full  px-1.5 py-0.5 text-xs font-medium   ${
                      expense.payment_method === "Efectivo"
                        ? "ring-1 ring-inset bg-green-50 text-green-700 ring-green-600/20"
                        : "ring-1 ring-inset bg-[#e5f7f7] text-[#5EDADF] ring-[rgb(94,218,223, 0.2)]"
                    }`}
                  >
                    {expense.payment_method}
                  </span>
                </div>
                <p className="mt-1 truncate text-sm text-gray-500 dark:text-gray-400">
                  {expense.description}
                </p>
              </div>
              <img
                className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-300"
                src="/logo-gastos.png"
                alt=""
              />
            </div>
            <div>
              <div className="-mt-px flex divide-x divide-gray-300 dark:divide-gray-800">
                <div className="flex w-0 flex-1">
                  <Link
                    to={`/edit-expense/${expense.id}`}
                    className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900 dark:text-gray-300 hover:bg-blue-500 hover:text-white group"
                  >
                    <PencilIcon
                      className="h-5 w-5 text-gray-400 group-hover:text-white"
                      aria-hidden="true"
                    />
                    Editar
                  </Link>
                </div>
                <div className="-ml-px flex w-0 flex-1">
                  <a
                    onClick={() => handleOpenModal(expense.id)}
                    className="relative cursor-pointer inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900 dark:text-gray-300 hover:bg-red-500 hover:text-white group"
                  >
                    <TrashIcon
                      className="h-5 w-5 text-gray-400 group-hover:text-white"
                      aria-hidden="true"
                    />
                    Eliminar
                  </a>

                  {modalExpenseId === expense.id && (
                    <Modal
                      onClose={handleCloseModal}
                      expenseId={expense.id}
                      onDelete={handleDeleteExpense}
                    />
                  )}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className="flex items-center justify-center mt-5">
        <button
          onClick={handleExportPDF}
          type="button"
          className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Exportar PDF
        </button>
      </div>
    </section>
  );
};

export default ViewExpenses;
