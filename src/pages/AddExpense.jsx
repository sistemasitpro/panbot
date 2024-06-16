import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from 'date-fns/locale/es';

// Componente para agregar gastos
const AddExpense = () => {
  // Estado para la fecha seleccionada
  const [selectedDate, setSelectedDate] = useState(new Date());
  // Estado para el método de pago
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');

  // Función para manejar el cambio de fecha
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  // Función para manejar el cambio de método de pago
  const handlePaymentMethodChange = (e) => {
    setSelectedPaymentMethod(e.target.value);
  };

  // Función para agregar el gasto al servidor
  const handleAddExpense = async (e) => {
    e.preventDefault();
    const formatedDate = selectedDate.toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' });
    const { error } = await supabase.from('expenses').insert([{ date: formatedDate, payment_method: selectedPaymentMethod }]);
    if (error) {
      console.error('Error adding expense:', error);
    } else {
      setSelectedDate(new Date());
      setSelectedPaymentMethod('');
    }
  };

  // Renderizado del formulario para agregar gastos
  return (
    <form onSubmit={handleAddExpense}>
      <DatePicker selected={selectedDate} onChange={handleDateChange} showCalendarIcon={true} autoFocus={true} locale={es} dateFormat="dd/MM/yyyy" />
      <select value={selectedPaymentMethod} onChange={handlePaymentMethodChange}>
        <option value="">Selecciona un método de pago</option>
        <option value="Efectivo">Efectivo</option>
        <option value="Bizum">Bizum</option>
      </select>
      <button type="submit">Añadir Gasto</button>
    </form>
  );
};

export default AddExpense;


