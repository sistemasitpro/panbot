import create from "zustand";

const useUpdateUserStore = create((set, get) => ({
  selectedNombre: "",
  selectedApellido: "",
  selectedEmail: "",
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
  setSelectedEmail: (email) =>
    set({
      selectedEmail: email,
      errors: { ...get().errors, email: "" },
    }),
  resetInputs: () =>
    set({
      selectedNombre: "",
      selectedApellido: "",
      selectedEmail: "",
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
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!selectedNombre) {
      errors.nombre = "El nombre es obligatorio";
    }

    if (!selectedApellido) {
      errors.apellido = "El apellido es obligatorio";
    }

    if (!selectedEmail) {
      errors.email = "El correo electrónico es obligatorio";
    } else if (!emailRegex.test(selectedEmail)) {
      errors.email = "Formato de correo electrónico no válido";
    }

    set({ errors });

    return Object.keys(errors).length === 0;
  },
}));

export default useUpdateUserStore;
