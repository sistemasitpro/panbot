import create from "zustand";

const useLoginStore = create((set, get) => ({
  selectedEmail: "",
  selectedPassword: "",
  errors: {},
  setSelectedEmail: (email) =>
    set({
      selectedEmail: email,
      errors: { ...get().errors, email: "" },
    }),
  setSelectedPassword: (password) =>
    set({
      selectedPassword: password,
      errors: { ...get().errors, password: "" },
    }),
  resetInputs: () =>
    set({
      selectedEmail: "",
      selectedPassword: "",
      errors: {},
    }),
  validateInputs: () => {
    const { selectedEmail, selectedPassword } = get();
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!selectedEmail) {
      errors.email = "El correo electrónico es obligatorio";
    } else if (!emailRegex.test(selectedEmail)) {
      errors.email = "Formato de correo electrónico no válido";
    }

    if (!selectedPassword) {
      errors.password = "La contraseña es obligatoria";
    }

    set({ errors });

    return Object.keys(errors).length === 0;
  },
}));

export default useLoginStore;
