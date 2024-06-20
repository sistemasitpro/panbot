import create from "zustand";

const useUpdateUserStore = create((set, get) => ({
  selectedNombre: "",
  selectedApellido: "",
  errors: {},
  setSelectedNombre: (nombre) => {
    set({
      selectedNombre: nombre,
      errors: { ...get().errors, nombre: "" },
    });
  },
  setSelectedApellido: (apellido) => {
    set({
      selectedApellido: apellido,
      errors: { ...get().errors, apellido: "" },
    });
  },
  resetInputs: () =>
    set({
      selectedNombre: "",
      selectedApellido: "",
      errors: {},
    }),
  validateInputs: () => {
    const {
      selectedNombre,
      selectedApellido,
      selectedEmail,
      selectedNewPassword,
      selectedRepitNewPassword,
    } = get();
    const errors = {};

    if (!selectedNombre) {
      errors.nombre = "El nombre es obligatorio";
    }

    if (!selectedApellido) {
      errors.apellido = "El apellido es obligatorio";
    }

    set({ errors });

    return Object.keys(errors).length === 0;
  },
}));

export default useUpdateUserStore;
