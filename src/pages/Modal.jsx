// eslint-disable-next-line react/prop-types
const Modal = ({ onClose, expenseId, onDelete }) => {
  const handleDelete = async () => {
    await onDelete(expenseId);
  };

  return (
    <div className="fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.55)] overflow-auto font-[sans-serif]">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 relative">
        <div className="my-8 text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-14 fill-red-500 inline"
            viewBox="0 0 24 24"
          >
            <path
              d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z"
              data-original="#000000"
            />
            <path
              d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Zm4 0v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z"
              data-original="#000000"
            />
          </svg>
          <h4 className="text-gray-800 dark:text-gray-200 text-lg font-semibold mt-4">
            ¿Estás seguro/a de que quieres eliminarlo?
          </h4>
        </div>

        <div className="flex flex-col space-y-2">
          <button
            type="button"
            onClick={handleDelete}
            className="px-4 py-2 rounded-lg text-white text-sm tracking-wide bg-red-500 hover:bg-red-600 active:bg-red-500"
          >
            Eliminar
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-gray-800 dark:text-gray-200 text-sm tracking-wide bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-700 active:bg-gray-200"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
