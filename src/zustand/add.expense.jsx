import create from "zustand";

const useExpenseStore = create((set, get) => ({
  selectedDate: "",
  selectedPaymentMethod: "",
  selectedAmount: 0,
  selectedDescription: "",
  errors: {},
  setSelectedDate: (date) =>
    set({ selectedDate: date, errors: { ...get().errors, date: "" } }),
  setSelectedPaymentMethod: (method) =>
    set({
      selectedPaymentMethod: method,
      errors: { ...get().errors, paymentMethod: "" },
    }),
  setSelectedAmount: (amount) =>
    set({ selectedAmount: amount, errors: { ...get().errors, amount: "" } }),
  setSelectedDescription: (description) =>
    set({
      selectedDescription: description,
      errors: { ...get().errors, description: "" },
    }),
  resetInputs: () =>
    set({
      selectedDate: "",
      selectedPaymentMethod: "",
      selectedAmount: 0,
      selectedDescription: "",
      errors: {},
    }),
  validateInputs: () => {
    const { selectedDate, selectedPaymentMethod, selectedAmount } = get();
    const errors = {};
    if (!selectedDate) errors.date = "La fecha es obligatoria";
    if (!selectedPaymentMethod)
      errors.paymentMethod = "El método de pago es obligatorio";
    if (!selectedAmount || selectedAmount < 0)
      errors.amount = "El total no puede ser menor que cero";

    set({ errors });

    return Object.keys(errors).length === 0;
  },
}));

export default useExpenseStore;
