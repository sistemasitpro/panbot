import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import jsPDF from 'jspdf';

const ViewExpenses = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    const { data, error } = await supabase.from('expenses').select('*');
    if (error) {
      console.error('Error fetching expenses:', error);
    } else {
      setExpenses(data);
    }
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    expenses.forEach((expense, index) => {
      doc.text(`Gasto: ${expense.type} - Nota: ${expense.note}`, 10, 10 + (index * 10));
    });
    doc.save('gastos.pdf');
  };

  return (
    <div>
      <ul>
        {expenses.map(expense => (
          <li key={expense.id}>
            {expense.type}: {expense.note}
          </li>
        ))}
      </ul>
      <button onClick={handleExportPDF}>Exportar a PDF</button>
    </div>
  );
};

export default ViewExpenses;
